import { useContext, useEffect, useState } from 'react';
import { getCurrentRequest } from '../../db/get/request';
import { getAllTabs } from '../../db/get/tab';
import { RefresherContext } from '../../Refresher';
import { Tab } from './Tab/Tab';
import style from './Tabs.module.scss';

export const Tabs: React.FC = () => {
  const { refresh, iteration } = useContext(RefresherContext);
  const [tabs, setTabs] = useState<Awaited<ReturnType<typeof getAllTabs>>>();
  const [currentRequest, setCurrentRequest] = useState<Awaited<ReturnType<typeof getCurrentRequest>>>();

  useEffect(() => void getAllTabs().then(setTabs), [iteration]);
  useEffect(() => void getCurrentRequest().then(setCurrentRequest), [iteration]);

  if (!tabs?.at(0)) return <></>;

  return (
    <div className={style.Tabs}>
      {tabs.map(tab => (
        <Tab active={currentRequest?.id === tab.requestId} key={tab.id} tab={tab} />
      ))}
    </div>
  );
};
