import { App } from '@/app/App';
import { Explorer } from '@/app/components/Explorer/Explorer';
import { RestPanel } from '@/app/components/RestPanel/RestPanel';
import { StatusBar } from '@/app/components/StatusBar/StatusBar';
import { Toolbar } from '@/app/components/Toolbar/Toolbar';
import { getCurrentWorkspace } from '@/app/db/get/workspace';
import { useOnRefresh } from '@/app/hooks/useOnRefresh';
import { Main } from '@/app/components/Main/Main';
import { useNavigate } from 'react-router-dom';
import style from './Rest.module.scss';

export const Rest = () => {
  const navigate = useNavigate();

  useOnRefresh(
    () =>
      void getCurrentWorkspace().then(workspace => {
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
