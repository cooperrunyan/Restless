import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
import { db } from '../../db';
import { App } from '../../App';
import style from './Home.module.scss';
import { useOnRefresh } from '@/app/hooks/useOnRefresh';

export const Home: React.FC = () => {
  const [user, setUser] = useState<Awaited<ReturnType<PrismaClient['user']['findFirst']>>>(null);

  useOnRefresh(() => void db.get.user.getUser().then(user => setUser(user)));

  return (
    <App>
      <div className={style.App}>
        <div className={style.contents}></div>
      </div>
    </App>
  );
};
