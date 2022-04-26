import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Explorer } from '../../components/Explorer/Explorer';
import { Main } from '../../components/Main/Main';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { db } from '../../db';
import { useOnRefresh } from '../../hooks/useOnRefresh';
import { App } from '../../App';
import style from './Rest.module.scss';
import SplitPane from 'react-split-pane';
import { RestPanel } from '../../components/RestPanel/RestPanel';

export const Rest = () => {
  const navigate = useNavigate();

  useOnRefresh(
    () =>
      void db.get.workspace.getCurrentWorkspace().then(workspace => {
        if (!workspace) navigate('/home');
      }),
  );

  return (
    <App>
      <div className={style.App}>
        <Main>
          <Toolbar />
          <div className={style.content}>
            <SplitPane
              allowResize
              split="vertical"
              primary="first"
              resizerClassName="Resizer vertical"
              minSize={180}
              defaultSize={360}
              maxSize={Math.min(640, window.innerWidth)}
              className="hello_world">
              <Explorer />
              <RestPanel />
            </SplitPane>
          </div>
        </Main>
      </div>
      <StatusBar />
    </App>
  );
};
