import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Search, X, Lock } from 'lucide-react';
import { permissions } from '../../data/permissions';
import { PermissionAIDetails } from '../AI/PermissionAIDetails';
import type { Permission, SelectedPermission } from './PermissionType';

interface PermissionSelectProps {
  selectedPermissions: SelectedPermission[];
  onSelect: (permission: Permission) => void;
  existingApprovals?: Record<string, { status: string }>;
}

export function PermissionSelect({ 
  selectedPermissions, 
  onSelect,
  existingApprovals 
}: PermissionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedForDetails, setSelectedForDetails] = useState<string | null>(null);
  const [detailsPosition, setDetailsPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const permissionItemsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Close AI details if the permission is no longer selected
  useEffect(() => {
    if (selectedForDetails && !selectedPermissions.some(p => p.name === selectedForDetails)) {
      setSelectedForDetails(null);
      setDetailsPosition(null);
    }
  }, [selectedPermissions, selectedForDetails]);

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.permission.toLowerCase().includes(search.toLowerCase()) ||
      permission.description.toLowerCase().includes(search.toLowerCase())
  );

  // Sort permissions to show read permissions before write permissions
  const sortedPermissions = [...filteredPermissions].sort((a, b) => {
    const aIsWrite = a.permission.toLowerCase().includes('write');
    const bIsWrite = b.permission.toLowerCase().includes('write');
    if (aIsWrite && !bIsWrite) return 1;
    if (!aIsWrite && bIsWrite) return -1;
    return a.permission.localeCompare(b.permission);
  });

  const isSelected = (permission: { permission: string }) =>
    selectedPermissions.some((p) => p.name === permission.permission);

  const isPermissionLocked = (permissionName: string) => {
    if (!existingApprovals) return false;
    const status = existingApprovals[permissionName]?.status;
    return status === 'approved' || status === 'implemented' || status === 'pending';
  };

  const handleRemovePermission = (permissionName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (isPermissionLocked(permissionName)) return;

    const permission = permissions.find(p => p.permission === permissionName);
    if (permission) {
      if (selectedForDetails === permissionName) {
        setSelectedForDetails(null);
        setDetailsPosition(null);
      }
      onSelect({
        type: permission.type as 'Delegated' | 'Application',
        name: permission.permission,
        description: permission.description,
        glr: permission.glr,
        apiScan: permission.apiScan,
        asa: false
      });
    }
  };

  const handlePermissionSelect = (permission: { permission: string }, event: React.MouseEvent) => {
    const element = permissionItemsRef.current.get(permission.permission);
    if (element) {
      const rect = element.getBoundingClientRect();
      const dropdownRect = dropdownRef.current?.getBoundingClientRect();
      
      if (dropdownRect) {
        setDetailsPosition({
          top: rect.top - dropdownRect.top + dropdownRect.y,
          left: dropdownRect.x,
          width: dropdownRect.width
        });
      }
    }
    setSelectedForDetails(permission.permission);
  };

  const handlePermissionChange = (newPermission: string) => {
    const permission = permissions.find(p => p.permission === newPermission);
    if (permission) {
      onSelect({
        type: permission.type as 'Delegated' | 'Application',
        name: permission.permission,
        description: permission.description,
        glr: permission.glr,
        apiScan: permission.apiScan,
        asa: false
      });
      setSelectedForDetails(null);
      setDetailsPosition(null);
    }
  };

  const handleCloseDetails = () => {
    setSelectedForDetails(null);
    setDetailsPosition(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedPermissions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedPermissions.map((permission) => {
              const isLocked = isPermissionLocked(permission.name);
              const isWrite = permission.name.toLowerCase().includes('write');
              return (
                <span
                  key={permission.name}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isLocked ? 'bg-gray-100 text-gray-800' :
                    isWrite ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {permission.name}
                  {isLocked ? (
                    <Lock className="ml-1 h-3 w-3 text-gray-500" />
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleRemovePermission(permission.name, e)}
                      className="ml-1 inline-flex items-center p-0.5 hover:bg-blue-200 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              );
            })}
          </div>
        ) : (
          <span className="block truncate text-gray-500">Select permissions...</span>
        )}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown
            className={`h-5 w-5 text-gray-400 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </span>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-[32rem] rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <div className="sticky top-0 z-10 bg-white px-3 py-2">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search permissions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {sortedPermissions.map((permission) => {
              const isLocked = isPermissionLocked(permission.permission);
              const status = existingApprovals?.[permission.permission]?.status;
              const isCurrentlySelected = selectedForDetails === permission.permission;
              const isWrite = permission.permission.toLowerCase().includes('write');

              return (
                <div 
                  key={permission.permission}
                  ref={(el) => {
                    if (el) {
                      permissionItemsRef.current.set(permission.permission, el);
                    }
                  }}
                >
                  <div
                    className={`${
                      isSelected(permission) ? 'bg-blue-50' : 'hover:bg-gray-50'
                    } cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                      isLocked ? 'opacity-75' : ''
                    } ${isWrite ? 'border-l-4 border-yellow-400' : ''}`}
                    onClick={(e) => {
                      if (isSelected(permission)) {
                        handleRemovePermission(permission.permission, e);
                      } else {
                        handlePermissionSelect(permission, e);
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected(permission)}
                        disabled={isLocked}
                        onChange={() => !isLocked && onSelect({
                          type: permission.type as 'Delegated' | 'Application',
                          name: permission.permission,
                          description: permission.description,
                          glr: permission.glr,
                          apiScan: permission.apiScan,
                          asa: false
                        })}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                      />
                      <span className="ml-3 block truncate font-medium">
                        {permission.permission}
                      </span>
                      {isWrite && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          Write
                        </span>
                      )}
                      {status && (
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          status === 'approved' ? 'bg-green-100 text-green-800' :
                          status === 'denied' ? 'bg-red-100 text-red-800' :
                          status === 'implemented' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {status}
                        </span>
                      )}
                      {isLocked && (
                        <Lock className="ml-2 h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <span className="text-sm text-gray-500 ml-7">
                      {permission.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedForDetails && detailsPosition && (
        <PermissionAIDetails
          permission={selectedForDetails}
          onPermissionChange={handlePermissionChange}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}