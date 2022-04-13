import React, { useContext } from 'react';
import { Back } from 'renderer/app/icons/back';
import { DataContext } from 'renderer/app/lib/DataManager';
import style from './Settings.module.scss';

interface Props {
  back: Function;
  id: string;
}

export const Settings: React.FC<Props> = ({ back, id }: Props) => {
  const dataManager = useContext(DataContext);
  if (!dataManager) return <div className={style.Settings}></div>;

  const collection = dataManager?.getCurrentCollection();
  if (!collection) return <div className={style.Settings}></div>;

  const request = dataManager?.getElementById(dataManager?.storage, id, collection)?.child;
  if (!request) return <div className={style.Settings}></div>;

  return (
    <div className={style.Settings}>
      <Back className={style.back} onClick={() => back()} />
      <input
        placeholder="Request name"
        className={style.h1}
        value={request.name}
        onChange={e => dataManager.modifyCurrentRequest({ name: e.target.value.replaceAll('\n', '') })}
      />
      <button
        className={style.delete}
        onClick={e => {
          e.preventDefault();
          dataManager.deleteRequest(request.id);
          dataManager.push();
          back();
        }}>
        Delete
      </button>
    </div>
  );
};
