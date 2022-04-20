import React, { useState, useEffect, useContext } from 'react';

export const RefresherContext = React.createContext<{ refresh: () => boolean; iteration: number }>({ refresh: () => false, iteration: 0 });

export const Refresher: React.FC = ({ children }) => {
  const [iteration, setIteration] = useState(0);

  const refresh = () => {
    setIteration(iteration + 1);
    return true;
  };

  return <RefresherContext.Provider value={{ refresh, iteration }}>{children}</RefresherContext.Provider>;
};

export const useRefresher = () => useContext(RefresherContext);
