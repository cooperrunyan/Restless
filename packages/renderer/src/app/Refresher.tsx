import React, { useState, useContext } from 'react';

export const RefresherContext = React.createContext<{ refresh: () => boolean; iteration: number }>({ refresh: () => false, iteration: 0 });

export const Refresher: React.FC<{ children: React.ReactElement | React.ReactElement[] }> = ({ children }) => {
  const [iteration, setIteration] = useState(0);

  const refresh = () => {
    setIteration(iteration + 1);
    return true;
  };

  return <RefresherContext.Provider value={{ refresh, iteration }}>{children}</RefresherContext.Provider>;
};
