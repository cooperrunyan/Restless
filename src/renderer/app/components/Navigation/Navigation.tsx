import { Send } from '../../icons/send';
import { Server } from '../../icons/server';
import style from './Navigation.module.scss';

export function Navigation() {
  return (
    <div className={style.Navigation}>
      <ul>
        <li className={style.active}>
          <Send />
        </li>
        <li>
          <Server />
        </li>
      </ul>
    </div>
  );
}
