import { useEffect } from 'react';
import { useRefreshDependencies } from './useRefreshDependencies';

export const useOnRefresh = (effect: () => any, dependencies: any[] = []) => {
  const refresherDependencies = useRefreshDependencies();
  useEffect(() => effect(), [refresherDependencies, ...dependencies]);
};
