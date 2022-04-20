import { ReactChild, useEffect } from 'react';
import React from 'react';
import { Refresher } from './Refresher';

interface Props {
  children?: ReactChild | ReactChild[];
}

export const App: React.FC<Props> = ({ children }: Props) => {
  return (
      <div className="App">
        <div className="TitleBar"></div>
        <div className="App-Contents">{children}</div>
      </div>
  );
};
