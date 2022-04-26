import { useContext } from 'react';
import { RefresherContext } from '../Refresher';

export const useRefresher = () => useContext(RefresherContext).refresh;
