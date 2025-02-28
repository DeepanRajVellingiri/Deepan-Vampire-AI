import { createContext, useContext, ReactNode, useState } from 'react';
import type { PermissionInfo } from './GeminiClient';

interface PermissionAIContextType {
  permissionCache: Record<string, PermissionInfo>;
  updateCache: (permission: string, info: PermissionInfo) => void;
  getFromCache: (permission: string) => PermissionInfo | undefined;
}

const PermissionAIContext = createContext<PermissionAIContextType | null>(null);

export function PermissionAIProvider({ children }: { children: ReactNode }) {
  const [permissionCache, setPermissionCache] = useState<Record<string, PermissionInfo>>({});

  const updateCache = (permission: string, info: PermissionInfo) => {
    setPermissionCache(prev => ({
      ...prev,
      [permission]: info
    }));
  };

  const getFromCache = (permission: string) => {
    return permissionCache[permission];
  };

  return (
    <PermissionAIContext.Provider value={{ permissionCache, updateCache, getFromCache }}>
      {children}
    </PermissionAIContext.Provider>
  );
}

export function usePermissionAI() {
  const context = useContext(PermissionAIContext);
  if (!context) {
    throw new Error('usePermissionAI must be used within a PermissionAIProvider');
  }
  return context;
}