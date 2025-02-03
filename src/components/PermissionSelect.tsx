import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Permission } from '../types';

interface PermissionSelectProps {
  permissions: Permission[];
  selectedPermissions: Permission[];
  onPermissionChange: (permissions: Permission[]) => void;
}

export function PermissionSelect({
  permissions,
  selectedPermissions,
  onPermissionChange,
}: PermissionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
  const [showRelated, setShowRelated] = useState(false);
  const [relatedPermission, setRelatedPermission] = useState<Permission | null>(null);

  const filteredPermissions = permissions.filter(
    (p) =>
      p.permission.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  const togglePermission = (permission: Permission) => {
    const exists = selectedPermissions.find((p) => p.permission === permission.permission);
    if (exists) {
      onPermissionChange(
        selectedPermissions.filter((p) => p.permission !== permission.permission)
      );
    } else {
      setSelectedPermission(permission);
    }
  };

  const closeDialog = () => {
    setSelectedPermission(null);
    setRelatedPermission(null);
  };

  const selectPermission = () => {
    if (selectedPermission || relatedPermission) {
      onPermissionChange([...selectedPermissions, (selectedPermission || relatedPermission) as Permission]);
      setSelectedPermission(null);
      setRelatedPermission(null);
    }
  };

  const selectRelatedPermission = (permission: Permission) => {
    setRelatedPermission(permission);
    setSelectedPermission(null);
  };

  const getRelatedPermissions = (permission: Permission | null) => {
    if (!permission) return [];
    const isWritePermission = permission.permission.toLowerCase().includes('write');
    if (!isWritePermission) return [];

    const category = permission.permission.split('.')[0].toLowerCase();

    return permissions.filter(
      (p) =>
        p.permission !== permission.permission &&
        p.permission.toLowerCase().includes(category) &&
        !p.permission.toLowerCase().includes('write')
    );
  };

  return (
    <div className="relative">
      <div
        className="border rounded-lg p-2 min-h-[42px] cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-2">
          {selectedPermissions.map((permission) => (
            <span
              key={permission.permission}
              className="inline-flex items-center bg-blue-100 text-blue-800 rounded px-2 py-1 text-sm"
            >
              {permission.permission}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePermission(permission);
                }}
                className="ml-1"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
          {selectedPermissions.length === 0 && (
            <span className="text-gray-500">Select permissions...</span>
          )}
          <ChevronDown className="h-5 w-5 ml-auto text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search permissions..."
              className="w-full p-2 border rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredPermissions.map((permission) => (
              <label
                key={permission.permission}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPermissions.some(
                    (p) => p.permission === permission.permission
                  )}
                  onChange={() => togglePermission(permission)}
                  className="mr-2"
                />
                <div>
                  <div className="font-medium">{permission.permission}</div>
                  <div className="text-sm text-gray-600">{permission.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {(selectedPermission || relatedPermission) && (
        <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg p-4">
          <button className="absolute top-2 right-2" onClick={closeDialog}>
            <X className="h-6 w-6 text-gray-600" />
          </button>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {(relatedPermission || selectedPermission)?.permission}
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            {(relatedPermission || selectedPermission)?.description}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {(relatedPermission || selectedPermission)?.permissionUsageType}
          </p>
          {getRelatedPermissions(selectedPermission || relatedPermission).length > 0 && (
            <div className="mb-4">
              <h4
                className="text-md font-medium text-gray-900 cursor-pointer flex items-center"
                onClick={() => setShowRelated(!showRelated)}
              >
                {showRelated ? ' Related Permissions' : <span className="text-blue-500">+ Show Related Permissions</span>}
                {showRelated ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
              </h4>
              {showRelated && (
                <ul className="list-disc list-inside">
                  {getRelatedPermissions(selectedPermission || relatedPermission).map((relatedPermission) => (
                    <li key={relatedPermission.permission} className="text-sm text-gray-700 flex items-center">
                      <strong>{relatedPermission.permission}</strong> - {relatedPermission.description}
                      <button
                        className="ml-2 bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
                        onClick={() => selectRelatedPermission(relatedPermission)}
                      >
                        +
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={closeDialog}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={selectPermission}
            >
              Select
            </button>
          </div>
        </div>
      )}
    </div>
  );
}