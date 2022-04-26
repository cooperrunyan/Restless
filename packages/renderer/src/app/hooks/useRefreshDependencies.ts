import { useContext } from 'react';
import { RefresherContext } from '../Refresher';

export const useRefreshDependencies = () => [useContext(RefresherContext).iteration];
