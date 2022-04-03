import { ReactChild, useEffect } from 'react';
import { Data } from './lib/DataManager';

export function App({ children }: { children?: ReactChild | ReactChild[] }) {
  useEffect(() => {
    document.documentElement.onkeydown = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        return false;
      }
      return;
    };
  }, []);

  return (
    <Data>
      <div className="App">
        <div className="TitleBar"></div>
        <div className="App-Contents">{children}</div>
      </div>
    </Data>
  );
}
