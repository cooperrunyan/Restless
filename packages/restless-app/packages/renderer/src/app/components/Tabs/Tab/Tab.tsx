import { deleteTab } from '@/app/db/delete/tab';
import { getTab } from '@/app/db/get/tab';
import { setCurrentRequest } from '@/app/db/set/request';
import { useRefresher } from '@/app/hooks/useRefresher';
import { useState } from 'react';
import { CloseOutline } from 'react-ionicons';
import style from './Tab.module.scss';

interface Props {
  tab: Awaited<ReturnType<typeof getTab>>;
  active: boolean;
}

export const Tab: React.FC<Props> = ({ tab, active }) => {
  const refresh = useRefresher();
  const [hover, setHover] = useState(false);

  if (!tab) return <></>;

  return (
    <div
      className={style.Tab + ' ' + (active ? style.active : '')}
      onClick={e => setCurrentRequest(tab.requestId).then(refresh)}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}>
      <span>{tab.Request.method}</span> <p>{tab.Request.name}</p>{' '}
      <button
        className={hover ? style.active : ''}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          deleteTab(tab.id).then(() => {
            if (active) setCurrentRequest('').then(refresh);
            else refresh();
          });
        }}>
        <CloseOutline color="var(--5)" />
      </button>
    </div>
  );
};
