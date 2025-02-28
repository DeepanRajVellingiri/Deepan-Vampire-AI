import { useState, useRef, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  X, 
  AlertTriangle, 
  FileCode,
  Shield,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  Loader
} from 'lucide-react';
import { getPermissionInfo, isWritePermission, type PermissionInfo } from './GeminiClient';
import { AIFramework } from './AIFramework';

interface PermissionAIDetailsProps {
  permission: string;
  onPermissionChange: (newPermission: string) => void;
  onClose: () => void;
}

const FRAMEWORKS = [
  { id: 'typescript', name: 'TypeScript', language: 'typescript' },
  { id: 'csharp', name: 'C#', language: 'csharp' },
  { id: 'python', name: 'Python', language: 'python' },
  { id: 'php', name: 'PHP', language: 'php' },
  { id: 'java', name: 'Java', language: 'java' },
  { id: 'go', name: 'Go', language: 'go' }
];

export function PermissionAIDetails({ 
  permission, 
  onPermissionChange,
  onClose
}: PermissionAIDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<PermissionInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('typescript');
  const [showFrameworkDropdown, setShowFrameworkDropdown] = useState(false);
  const [isApplication, setIsApplication] = useState(false);
  const [isDelegated, setIsDelegated] = useState(false);
  const [showCodePopup, setShowCodePopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isWrite = isWritePermission(permission);

  useEffect(() => {
    let mounted = true;

    async function fetchPermissionInfo() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPermissionInfo(permission);
        if (mounted) {
          setInfo(data);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to fetch permission information');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (permission) {
      fetchPermissionInfo();
    }

    return () => {
      mounted = false;
    };
  }, [permission]);

  const handleCopyCode = async () => {
    const selectedSnippet = info?.codeSnippets.find(s => 
      s.language === selectedFramework
    );

    if (selectedSnippet?.code) {
      try {
        await navigator.clipboard.writeText(selectedSnippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  const handleSelectPermission = () => {
    onPermissionChange(permission);
    onClose();
  };

  const handleSelectAlternative = () => {
    if (info?.alternativePermission) {
      onPermissionChange(info.alternativePermission.name);
      onClose();
    }
  };

  return (
    <div 
      ref={popupRef}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-2xl z-50"
    >
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {permission}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCodePopup(true)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            title="View Framework Code"
          >
            <FileCode className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin text-blue-600 mb-4">
                <Loader className="h-8 w-8" />
              </div>
              <p className="text-sm text-gray-600 animate-pulse">Analyzing permission details...</p>
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          ) : info && (
            <>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Developer Overview</h4>
                <p className="text-sm text-gray-600">{info.useCase}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Permission Type</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    {isApplication ? (
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400" />
                    )}
                    <input
                      type="checkbox"
                      checked={isApplication}
                      onChange={(e) => setIsApplication(e.target.checked)}
                      className="sr-only"
                    />
                    <span className="text-sm text-gray-700">Application</span>
                    {info.permissionTypes.application && (
                      <span className="text-xs text-gray-500">
                        - {info.permissionTypes.application.description}
                      </span>
                    )}
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    {isDelegated ? (
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400" />
                    )}
                    <input
                      type="checkbox"
                      checked={isDelegated}
                      onChange={(e) => setIsDelegated(e.target.checked)}
                      className="sr-only"
                    />
                    <span className="text-sm text-gray-700">Delegated</span>
                    {info.permissionTypes.delegated && (
                      <span className="text-xs text-gray-500">
                        - {info.permissionTypes.delegated.description}
                      </span>
                    )}
                  </label>
                </div>
              </div>

              {isWrite && info.alternativePermission && (
                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">
                        Read Permission Available
                      </h4>
                      <p className="mt-1 text-sm text-blue-700">
                        Consider using {info.alternativePermission.name} if you only need read access.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={handleSelectAlternative}
                          className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                        >
                          Use {info.alternativePermission.name}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Select Permission
        </button>
      </div>

      {showCodePopup && (
        <AIFramework 
          permission={permission}
          onClose={() => setShowCodePopup(false)}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-lg h-3/4 z-50"
        />
      )}
    </div>
  );
}