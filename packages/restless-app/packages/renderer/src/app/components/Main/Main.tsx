import { type ReactElement } from 'react';
import style from './Main.module.scss';

interface Props {
  children: ReactElement | ReactElement[];
}

export const Main: React.FC<Props> = ({ children }) => {
  return <div className={style.Main}>{children}</div>;
};
