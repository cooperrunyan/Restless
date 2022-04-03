import { Options } from '../../icons/options';
import style from './Toolbar.module.scss';

export function Toolbar() {
  return (
    <div className={style.Toolbar}>
      <ul>
        <li>
          <Options />
        </li>
      </ul>
    </div>
  );
}
