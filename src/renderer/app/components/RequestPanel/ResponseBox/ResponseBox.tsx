import { useContext } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';
import style from './ResponseBox.module.scss';

export function ResponseBox() {
  const dataManager = useContext(DataContext);
  const request = dataManager?.getCurrentRequest();

  if (!request) return <div className={style.ResponseBox}></div>;

  return <div className={style.ResponseBox}>{JSON.stringify(request.response || '{}', null, 2)}</div>;
}
