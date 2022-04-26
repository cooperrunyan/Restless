import { getCurrentRequest } from '@/app/db/get/request';
import { getAllTabs } from '@/app/db/get/tab';
import { useOnRefresh } from '@/app/hooks/useOnRefresh';
import { useState } from 'react';
import { Tab } from './Tab/Tab';
import style from './Tabs.module.scss';

export const Tabs: React.FC = () => {
  const [tabs, setTabs] = useState<Awaited<ReturnType<typeof getAllTabs>>>();
  const [currentRequest, setCurrentRequest] = useState<Awaited<ReturnType<typeof getCurrentRequest>>>();

  useOnRefresh(() => void getAllTabs().then(setTabs));
  useOnRefresh(() => void getCurrentRequest().then(setCurrentRequest));

  if (!tabs?.at(0)) return <></>;

  return (
    <div className={style.Tabs}>
      {tabs.map(tab => (
        <Tab active={currentRequest?.id === tab.requestId} key={tab.id} tab={tab} />
      ))}
    </div>
  );
};
