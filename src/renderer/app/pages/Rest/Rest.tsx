import { PrismaClient } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Explorer } from '../../components/Explorer/Explorer';
import { Main } from '../../components/Main/Main';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { db } from 'renderer/app/db';
import { RefresherContext } from 'renderer/app/Refresher';
import { App } from '../../App';
import style from './Rest.module.scss';

export const Rest: React.FC = () => {
  const [workspace, setWorkspace] = useState<Awaited<ReturnType<PrismaClient['workspace']['findFirst']>>>(null);
  const { refresh, iteration } = useContext(RefresherContext);
  const navigate = useNavigate();

  useEffect(
    () =>
      void db.get.workspace.getCurrentWorkspace().then(workspace => {
        if (!workspace) return void navigate('/home');
        setWorkspace(workspace);
        return;
      }),
    [iteration],
  );

  return (
    <App>
      <div className={style.App}>
        <Main>
          <Toolbar />
          <Explorer />
        </Main>
      </div>
      <StatusBar />
    </App>
  );
};
