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
import ReactSplitPane from 'react-split-pane';

export const Rest: React.FC = () => {
  const { refresh, iteration } = useContext(RefresherContext);
  const navigate = useNavigate();

  useEffect(
    () =>
      void db.get.workspace.getCurrentWorkspace().then(workspace => {
        if (!workspace) navigate('/home');
      }),
    [iteration],
  );

  return (
    <App>
      <div className={style.App}>
        <Main>
          <Toolbar />
          <div className={style.content}>
            <ReactSplitPane
              allowResize
              split="vertical"
              primary="first"
              resizerClassName="Resizer vertical"
              minSize={180}
              defaultSize={360}
              maxSize={640}
              className="hello_world">
              <Explorer />
              <div className="Panel">Panel</div>
            </ReactSplitPane>
          </div>
        </Main>
      </div>
      <StatusBar />
    </App>
  );
};
