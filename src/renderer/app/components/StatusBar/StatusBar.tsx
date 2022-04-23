import style from './StatusBar.module.scss';
import { CloudyOutline, FlashOutline, TerminalOutline } from 'react-ionicons';
import { Logo } from '../Logo/Logo';

export const StatusBar: React.FC = () => {
  return (
    <div className={style.StatusBar}>
      <div>
        <a className={style.cloud} href="#">
          <CloudyOutline height="19px" title={null} color="var(--8)" />
        </a>
        <button
          onClick={() => {
            throw new Error('This feature has not yet been implemented!');
          }}>
          <TerminalOutline height="16px" title={null} color="var(--7)" />
          <p>Terminal</p>
        </button>
        <button>
          <FlashOutline height="16px" title={null} color="var(--7)" />
          <p>Shortcuts</p>
        </button>
      </div>
    </div>
  );
};
