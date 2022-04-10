import { Options } from '../../icons/options';
import style from './Toolbar.module.scss';

export const Toolbar: React.FC = () => {
  return (
    <div className={style.Toolbar}>
      <ul>
        <li>
          <Options />
        </li>
      </ul>
    </div>
  );
};
