import { Sidebar } from '../../icons/sidebar';
import { Aperture } from '../../icons/aperture';
import { Flash } from '../../icons/flash';
import { Terminal } from '../../icons/terminal';
import style from './StatusBar.module.scss';
import { useContext } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';

export const StatusBar: React.FC = () => {
  const dataManager = useContext(DataContext);

  return (
    <ul className={style.StatusBar}>
      <li
        onClick={() => {
          dataManager?.toggleZen();
          dataManager?.push();
        }}>
        <Flash className={style.Sidebar + ' ' + (!dataManager?.storage?.settings?.zenmode ? style.flip : '')} />
        Zen Mode
      </li>
      {window?.electron?.store && (
        <li>
          <Terminal />
          Terminal
        </li>
      )}
      <li>
        <Aperture />
        Cookies
      </li>
    </ul>
  );
};
