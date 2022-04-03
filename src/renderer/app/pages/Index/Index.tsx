import style from './Index.module.scss';
import { MenuBar } from '../../components/MenuBar/MenuBar';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { Main } from '../../components/Main/Main';
import { useContext } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';

export function Index() {
  const dataManager = useContext(DataContext);

  return (
    <div className={style.App}>
      <MenuBar />
      {Object.keys(dataManager?.getCurrentWorkspace() || {})[0] && (
        <div className={style.AppContents}>
          <Main />
          <StatusBar />
        </div>
      )}
    </div>
  );
}
