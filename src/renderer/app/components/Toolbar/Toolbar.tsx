import { Options } from '../../icons/options';
import style from './Toolbar.module.scss';

import React from 'react';
import { Setter } from 'renderer/app/types/State';
import { Back } from 'renderer/app/icons/back';

type View = 'settings' | 'requests';
interface Props {
  view: View;
  setView: Setter<View>;
}

export const Toolbar: React.FC<Props> = ({ view, setView }: Props) => (
  <div className={style.Toolbar}>
    <ul>
      <li onClick={() => setView(view === 'settings' ? 'requests' : 'settings')}>
        {view !== 'settings' && <Options />}
        {view === 'settings' && <Back />}
      </li>
    </ul>
  </div>
);
