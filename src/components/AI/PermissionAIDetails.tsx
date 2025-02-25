import { useState, useRef, useEffect } from 'react';
import { Copy, Check, X, AlertTriangle } from 'lucide-react';
import { getPermissionInfo, isWritePermission, type PermissionInfo } from './GeminiClient';

interface PermissionAIDetailsProps {
  permission: string;
  onPermissionChange?: (newPermission: string) => void;
  onClose?: () => void;
}

export function PermissionAIDetails({ 
  permission, 
  onPermissionChange,
  onClose
}: PermissionAIDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<PermissionInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const [showReadPermissionAlert, setShowReadPermissionAlert] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchPermissionInfo() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPermissionInfo(permission);
        if (mounted) {
          setInfo(data);
          // Check if it's a write permission and has an alternative read permission
          if (isWritePermission(permission) && data.alternativePermission) {
            setShowReadPermissionAlert(true);
          }
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
    if (info?.codeSnippet) {
      try {
        await navigator.clipboard.writeText(info.codeSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  const handleSelectReadPermission = () => {
    if (info?.alternativePermission?.name && onPermissionChange) {
      onPermissionChange(info.alternativePermission.name);
      setShowReadPermissionAlert(false);
    }
  };

  if (!permission) return null;

  return (
    <div 
      ref={popupRef}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-md z-50"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {permission}
        </h3>
        <div className="flex items-center space-x-2">
          {!loading && info && (
            <button
              onClick={handleCopyCode}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              title="Copy Code Example"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : info && (
          <>
            {/* Use Case */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Developer's Perspective</h4>
              <p className="text-sm text-gray-600">{info.useCase}</p>
            </div>

            {/* Write Permission Alert */}
            {showReadPermissionAlert && info.alternativePermission && (
              <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Consider using {info.alternativePermission.name} instead:
                    </p>
                    <p className="text-sm text-yellow-600 mt-1">
                      {info.alternativePermission.description}
                    </p>
                    <button
                      onClick={handleSelectReadPermission}
                      className="mt-2 text-sm font-medium text-yellow-700 hover:text-yellow-600"
                    >
                      Use {info.alternativePermission.name} instead
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Code Example */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-gray-800">
                <span className="text-sm font-medium text-gray-200">Code Example</span>
              </div>
              <pre className="p-3 overflow-x-auto max-h-48">
                <code className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                  {info.codeSnippet}
                </code>
              </pre>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onPermissionChange?.(permission)}
          className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          Select
        </button>
      </div>
    </div>
  );
}