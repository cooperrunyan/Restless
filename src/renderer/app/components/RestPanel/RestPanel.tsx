import { Request, Response } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { getCurrentRequest } from 'renderer/app/db/get/request';
import { RefresherContext } from 'renderer/app/Refresher';
import { Logo } from '../Logo/Logo';
import { Tabs } from '../Tabs/Tabs';
import style from './RestPanel.module.scss';

export const RestPanel: React.FC = () => {
  const [request, setRequest] = useState<Request & { responses: Response[] }>();
  const { iteration, refresh } = useContext(RefresherContext);

  useEffect(() => void getCurrentRequest().then(setRequest), [iteration]);

  if (!request)
    return (
      <div className={style.RestPanel}>
        <Tabs />
        <div className={style.Logocontainer}>
          <Logo color="var(--4)" />
        </div>
      </div>
    );

  return (
    <div className={style.RequestPanel}>
      <Tabs />
      {request.name}
    </div>
  );
};
