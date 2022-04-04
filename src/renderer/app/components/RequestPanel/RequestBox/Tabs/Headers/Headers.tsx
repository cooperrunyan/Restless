import { useContext } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';
import style from './Headers.module.scss';

export function Headers() {
  const dataManager = useContext(DataContext);
  const request = dataManager?.getCurrentRequest();

  if (!request || !Array.isArray(request?.headers)) return <div className={style.Headers}></div>;

  return (
    <div className={style.Headers}>
      {request.headers.map((header) => (
        <div key={header.id} className={style.header}></div>
      ))}
    </div>
  );
}
