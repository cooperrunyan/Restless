import { ReactChild } from 'react';
import { Data } from './lib/DataManager';

export function App({ children }: { children?: ReactChild | ReactChild[] }) {
  return (
    <Data>
      <div className="App">
        {window?.electron?.store && <div className="TitleBar"></div>}
        <div className="App-Contents">{children}</div>
      </div>
    </Data>
  );
}
