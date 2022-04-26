import { useEffect } from 'react';
import { useRefreshDependencies } from './useRefreshDependencies';

export const useOnRefresh = (effect: () => any, dependencies: any[] = []) => {
  const refresherDependencies = useRefreshDependencies();
  useEffect(() => void effect(), [refresherDependencies, ...dependencies]);
};
