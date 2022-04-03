import { useContext } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';
import style from './ResponseBox.module.scss';

export function ResponseBox() {
  const dataManager = useContext(DataContext);

  return (
    <div className={style.ResponseBox}>
      res
      <br />
      res
      <br />
      res
      <br />
      res <br />
      res
    </div>
  );
}
