import React from 'react';
import { Setter } from 'renderer/app/types/State';
import style from './Tabs.module.scss';

interface Props {
  activeTab: 'body' | 'headers' | 'query' | 'auth';
  setActiveTab: Setter<'body' | 'headers' | 'query' | 'auth'>;
}

export const Tabs: React.FC<Props> = ({ activeTab, setActiveTab }: Props) => (
  <div className={style.Tabs}>
    <ul>
      <li
        className={activeTab === 'body' ? style.active : ''}
        onClick={e => {
          setActiveTab('body');
        }}>
        Body
      </li>
      <li
        className={activeTab === 'headers' ? style.active : ''}
        onClick={e => {
          setActiveTab('headers');
        }}>
        Headers
      </li>
      <li
        className={activeTab === 'query' ? style.active : ''}
        onClick={e => {
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
