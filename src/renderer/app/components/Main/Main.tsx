import style from './Main.module.scss';
import { Navigation } from '../Navigation/Navigation';
import { CollectionPanel } from '../CollectionPanel/CollectionPanel';
import SplitPane from 'react-split-pane';
import { RequestPanel } from '../RequestPanel/RequestPanel';
import { Toolbar } from '../Toolbar/Toolbar';
import { useContext } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';
import React from 'react';

export const Main: React.FC<{}> = () => {
  const dataManager = useContext(DataContext);

  return (
    <div className={style.Main}>
      {!dataManager?.storage?.settings?.zenmode && <Navigation />}
      <div className={style.SplitParent + ' main'}>
        <SplitPane {...splitPaneConfig}>
          <CollectionPanel />
          <RequestPanel />
        </SplitPane>
      </div>

      {!dataManager?.storage?.settings?.zenmode && <Toolbar />}
    </div>
  );
};

const splitPaneConfig = {
  split: 'vertical',
  defaultSize: 200,
  primary: 'first',
  allowResize: true,
  maxSize: 450,
  minSize: 0,

  size: 350,
  resizerClassName: 'MainResizer',
  onDragStarted() {
    const el = document.querySelector('.MainResizer') as HTMLDivElement;

    el.style.backgroundColor = 'var(--blue)';
    el.style.width = '.9rem';
    document.documentElement.style.cursor = 'col-resize';
  },
  onDragFinished() {
    const el = document.querySelector('.MainResizer') as HTMLDivElement;

    el.style.backgroundColor = '';
    el.style.width = '';
    document.documentElement.style.cursor = '';
  },
} as const;
