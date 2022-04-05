import { Setter } from 'renderer/app/types/State';
import style from './Tabs.module.scss';

export function Tabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: 'body' | 'headers' | 'query' | 'auth';
  setActiveTab: Setter<'body' | 'headers' | 'query' | 'auth'>;
}) {
  return (
    <div className={style.Tabs}>
      <ul>
        <li
          className={activeTab === 'body' ? style.active : ''}
          onClick={(e) => {
            setActiveTab('body');
          }}>
          Body
        </li>
        <li
          className={activeTab === 'headers' ? style.active : ''}
          onClick={(e) => {
            setActiveTab('headers');
          }}>
          Headers
        </li>
        <li
          className={activeTab === 'query' ? style.active : ''}
          onClick={(e) => {
            setActiveTab('query');
          }}>
          Query
        </li>
        {/* <li
          className={activeTab === 'auth' ? style.active : ''}
          onClick={(e) => {
            setActiveTab('auth');
          }}>
          Auth
        </li> */}
      </ul>
    </div>
  );
}
