import { PrismaClient } from '@prisma/client';
import { useEffect, useState, useContext } from 'react';
import { db } from 'renderer/app/db';
import { App } from '../../App';
import style from './Index.module.scss';
import { RefresherContext } from '../../Refresher';

export const Index: React.FC = () => {
  const [user, setUser] = useState<Awaited<ReturnType<PrismaClient['user']['findFirst']>>>(null);
  const { refresh, iteration } = useContext(RefresherContext);

  useEffect(() => {
    db.get.user.getUser().then(user => setUser(user));
  }, [iteration]);

  useEffect(() => console.log(user));

  return (
    <App>
      <div className={style.App}>
        <div className={style.contents}></div>
      </div>
    </App>
  );
};
