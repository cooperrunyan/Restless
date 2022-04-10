import React, { ReactChild, useContext, useState } from 'react';
import { DataContext } from '../../../lib/DataManager';
import style from './RequestBox.module.scss';
import { Tabs } from './Tabs/Tabs';

import { Body } from './Tabs/Body/Body';
import { Headers } from './Tabs/Headers/Headers';
import { Query } from './Tabs/Query/Query';
import { Auth } from './Tabs/Auth/Auth';

export const RequestBox: React.FC = () => {
  const dataManager = useContext(DataContext);
  const [activeTab, setActiveTab] = useState<'body' | 'headers' | 'query' | 'auth'>('body');

  const request = dataManager?.getCurrentRequest();

  if (!request) return <div className={style.RequestBox}></div>;

  return (
    <div className={style.RequestBox}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <OverlapChildren>
        <Show when={activeTab === 'body'}>
          <Body />
        </Show>
        <Show when={activeTab === 'headers'}>
          <Headers />
        </Show>
        <Show when={activeTab === 'query'}>
          <Query />
        </Show>
        <Show when={activeTab === 'auth'}>
          <Auth />
        </Show>
      </OverlapChildren>
    </div>
  );
};

function Show({ when, children }: { when: boolean; children: ReactChild | ReactChild[] }) {
  return <div className={style.content + ' ' + (when ? style.active : '')}>{when && <>{children}</>}</div>;
}

function OverlapChildren({ children }: { children?: ReactChild | ReactChild[] }) {
  return <div className={style.overlapChildren}>{children}</div>;
}
