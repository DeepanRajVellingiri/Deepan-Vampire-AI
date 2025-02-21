import { useState, useEffect, useRef } from 'react';
import { Code, Copy, Check, ChevronDown, ChevronUp, AlertCircle, Loader, X } from 'lucide-react';
import { getPermissionInfo, isWritePermission, type PermissionInfo } from './GeminiClient';

interface PermissionAIDetailsProps {
  permission: string;
  onPermissionChange?: (newPermission: string) => void;
  onClose?: () => void;
  position?: { top: number; left: number; width: number };
}

export function PermissionAIDetails({ 
  permission, 
  onPermissionChange, 
  onClose,
  position 
}: PermissionAIDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<PermissionInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCodeSnippet, setShowCodeSnippet] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [showReadPermissionDialog, setShowReadPermissionDialog] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const maxRetries = 2;

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    async function fetchPermissionInfo() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPermissionInfo(permission);
        if (mounted) {
          setInfo(data);
          setRetryCount(0);
          
          if (isWritePermission(permission) && data.alternativePermission) {
            setShowReadPermissionDialog(true);
          }
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
          console.error('Error in PermissionAIDetails:', err);
          
          if (retryCount < maxRetries) {
            const delay = Math.pow(2, retryCount) * 1000;
            timeoutId = setTimeout(() => {
              setRetryCount(prev => prev + 1);
              fetchPermissionInfo();
            }, delay);
          } else {
            setError(`Failed to fetch permission information: ${errorMessage}`);
          }
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
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [permission, retryCount]);

  // Dynamic positioning logic
  useEffect(() => {
    if (!position || !popupRef.current) return;

    const popup = popupRef.current;
    const rect = popup.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const padding = 16;

    let { top, left } = position;
    const maxWidth = Math.min(640, viewportWidth - (padding * 2));
    const maxHeight = viewportHeight - (padding * 2);

    // Adjust vertical position
    if (top + rect.height > viewportHeight - padding) {
      // If popup would overflow bottom, try positioning above
      if (position.top - rect.height > padding) {
        top = position.top - rect.height - padding;
      } else {
        // If not enough space above, center vertically
        top = Math.max(padding, (viewportHeight - rect.height) / 2);
      }
    }

    // Adjust horizontal position
    if (left + maxWidth > viewportWidth - padding) {
      left = Math.max(padding, viewportWidth - maxWidth - padding);
    }

    popup.style.top = `${top}px`;
    popup.style.left = `${left}px`;
    popup.style.maxWidth = `${maxWidth}px`;
    popup.style.maxHeight = `${maxHeight}px`;
  }, [position, showReadPermissionDialog]);

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

  const handleReadPermissionSelect = () => {
    if (info?.alternativePermission) {
      onPermissionChange?.(info.alternativePermission.name);
      setShowReadPermissionDialog(false);
    }
  };

  const handleProceedWithWrite = () => {
    setShowReadPermissionDialog(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <div className="flex items-center">
            <Loader className="h-5 w-5 text-blue-500 animate-spin" />
            <span className="ml-2 text-sm text-gray-600">
              {retryCount > 0 ? `Retrying (${retryCount}/${maxRetries})...` : 'Analyzing permission...'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bg-white rounded-lg shadow-xl" ref={popupRef}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="ml-2 text-sm text-red-700">{error}</span>
            </div>
            <button
              onClick={() => setRetryCount(0)}
              className="ml-4 px-3 py-1 text-sm font-medium text-red-700 hover:text-red-800 bg-red-100 hover:bg-red-200 rounded-md"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!info) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      
      <div 
        ref={popupRef}
        className="fixed bg-white rounded-lg shadow-xl overflow-hidden"
        style={{ zIndex: 50 }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 truncate">{permission}</h3>
            <div className="flex items-center space-x-2">
              {/* Code Snippet Button */}
              <div className="relative">
                <button
                  onClick={() => setShowCodeSnippet(!showCodeSnippet)}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full"
                  title="View Code Snippet"
                >
                  <Code className="h-5 w-5" />
                </button>
                
                {showCodeSnippet && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-gray-900 rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="flex items-center justify-between px-3 py-2 bg-gray-800">
                      <span className="text-sm font-medium text-gray-200">Code Snippet</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleCopyCode}
                          className="p-1 text-gray-300 hover:text-white hover:bg-gray-700 rounded"
                          title={copied ? "Copied!" : "Copy to clipboard"}
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => setShowCodeSnippet(false)}
                          className="p-1 text-gray-300 hover:text-white hover:bg-gray-700 rounded"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <pre className="p-3 overflow-x-auto max-h-48">
                      <code className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                        {info.codeSnippet}
                      </code>
                    </pre>
                  </div>
                )}
              </div>
              
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto p-4 space-y-4">
          {/* Use Case */}
          <div>
            <p className="text-sm text-gray-600">{info.useCase}</p>
          </div>

          {/* Read Permission Dialog */}
          {showReadPermissionDialog && info.alternativePermission && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-yellow-900">
                    Recommended: Select Read Permission First
                  </h4>
                  <div className="mt-1 text-sm text-yellow-700">
                    <p>{info.alternativePermission.description}</p>
                    <p className="mt-2 font-medium">{info.alternativePermission.reason}</p>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={handleReadPermissionSelect}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                    >
                      Select {info.alternativePermission.name}
                    </button>
                    <button
                      onClick={handleProceedWithWrite}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Proceed with Write Permission
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Scope</h5>
              <p className="mt-1 text-sm text-gray-600">{info.details.scope}</p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-900">Impact</h5>
              <p className="mt-1 text-sm text-gray-600">{info.details.impact}</p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-900">Security Considerations</h5>
              <ul className="mt-1 space-y-1">
                {info.details.considerations.map((consideration, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{consideration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={() => onPermissionChange?.(permission)}
            className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Select
          </button>
        </div>
      </div>
    </>
  );
}