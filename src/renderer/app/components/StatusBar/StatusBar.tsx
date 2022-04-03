import { Sidebar } from '../../icons/sidebar';
import { Aperture } from '../../icons/aperture';
import { Flash } from '../../icons/flash';
import { Terminal } from '../../icons/terminal';
import style from './StatusBar.module.scss';
import { useContext } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';

export function StatusBar() {
  const dataManager = useContext(DataContext);

  return (
    <ul className={style.StatusBar}>
      <li
        onClick={() => {
          dataManager?.toggleSidebar();
          dataManager?.push();
        }}
      >
        <Sidebar
          className={
            style.Sidebar +
            ' ' +
            (!dataManager?.storage?.settings?.hideSidebar ? style.flip : '')
          }
        />
        Sidebar
      </li>
      <li>
        <Terminal />
        Terminal
      </li>
      <li>
        <Flash />
        Shortcuts
      </li>
      <li>
        <Aperture />
        Cookies
      </li>
    </ul>
  );
}
