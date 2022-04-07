import { useContext } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';
import style from './ResponseBox.module.scss';

export function ResponseBox() {
  const dataManager = useContext(DataContext);
  const request = dataManager?.getCurrentRequest();

  if (!request?.response) return <div className={style.ResponseBox}></div>;

  if ((request.response as any).error!) return <div className={style.ResponseBox}>{(request.response as any).error!}</div>;

  return (
    <div className={style.ResponseBox}>
      <div className={style.topBar}>
        <ul className={style.tabs}>
          <li>Body</li>
          <li>Headers</li>
        </ul>

        <ul className={style.data}>
          <li>
            Size: <span className={style.emph}>342B</span>
          </li>
          <Break />
          <li>
            Response Time: <span className={style.emph}>{request.response.time}ms</span>
          </li>
          <Break />
          <li className={style.status + ' ' + statusStyle(request.response.status)}>
            {request.response.status} - {formatStatus(request.response.status)}
          </li>
        </ul>
      </div>
    </div>
  );
}

function formatStatus(status: number) {
  return 'Status';
}

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
