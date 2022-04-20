import { Main } from 'renderer/app/components/Main/Main';
import { StatusBar } from 'renderer/app/components/StatusBar/StatusBar';
import { App } from '../../App';
import style from './Rest.module.scss';

export const Rest: React.FC = () => {
  return (
    <App>
      <div className={style.App}>
        <Main>hello world</Main>
        <StatusBar />
      </div>
    </App>
  );
};
