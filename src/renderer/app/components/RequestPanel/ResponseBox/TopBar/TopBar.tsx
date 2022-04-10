import { useContext } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';
import { Setter } from 'renderer/app/types/State';
import style from './TopBar.module.scss';

interface Props {
  tab: 'body' | 'headers';
  setTab: Setter<'body' | 'headers'>;
}

export const TopBar: React.FC<Props> = ({ tab, setTab }: Props) => {
  const dataManager = useContext(DataContext);
  const request = dataManager?.getCurrentRequest();

  if (!request?.response) return <div className={style.TopBar}></div>;

  return (
    <div className={style.TopBar}>
      <ul className={style.tabs}>
        <li className={tab === 'body' ? style.active : ''} onClick={() => setTab('body')}>
          Body
        </li>
        <li className={tab === 'headers' ? style.active : ''} onClick={() => setTab('headers')}>
          Headers
        </li>
      </ul>

      <ul className={style.data}>
        <li>
          <span className={style.emph}>{request.response.time}ms</span>
        </li>
        <Break />
        <li>
          <a
            className={style.status + ' ' + statusStyle(request.response.status)}
            href={`https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${request.response.status}`}
            onClick={e => {
              if (window.electron.openLink) {
                window.electron.openLink(`https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${request.response!.status}`);
                e.preventDefault();
              }
            }}>
            {request.response.status} - {request.response.statusText}
          </a>
        </li>
      </ul>
    </div>
  );
};

export const Break: React.FC = () => <li className={style.break}>|</li>;

function statusStyle(status: number) {
  status = Math.round(status / 100);
  // prettier-ignore
  const color = (() => {
    switch (status) {
      case 1: return 'orange';
      case 2: return 'blue';
      case 3: return 'purple';
      default: return 'red';
    }
  })();

  return style[`status-${color}`];
}
