import { ReactChild } from 'react';
import style from './Main.module.scss';

interface Props {
  children: ReactChild | ReactChild[];
}

export const Main: React.FC<Props> = ({ children }) => {
  return <div className={style.Main}>{children}</div>;
};
