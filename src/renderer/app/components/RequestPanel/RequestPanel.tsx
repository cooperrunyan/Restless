import { useContext } from 'react';
import SplitPane from 'react-split-pane';
import { DataContext } from '../../lib/DataManager';
import { RequestBox } from './RequestBox/RequestBox';
import style from './RequestPanel.module.scss';
import { ResponseBox } from './ResponseBox/ResponseBox';
import { UrlBox } from './UrlBox/UrlBox';

export function RequestPanel() {
  const dataManager = useContext(DataContext);
  const request = dataManager?.getCurrentRequest();

  if (!request) return <div className={style.RequestPanel}></div>;

  return (
    <div className={style.RequestPanel}>
      <UrlBox />
      <div className={style.splitterContainer}>
        <SplitPane {...splitPaneConfig}>
          <div className={style.request}>
            <RequestBox />
          </div>
          <div className={style.response}>
            <ResponseBox />
          </div>
        </SplitPane>
      </div>
    </div>
  );
}

const splitPaneConfig = {
  split: 'horizontal',
  defaultSize: (window.innerHeight - 200) / 2,
  allowResize: true,
  minHeight: 0,
  // primary: 'first',
  resizerClassName: 'RequestResizer',
  onDragStarted() {
    const el = document.querySelector('.RequestResizer') as HTMLDivElement;

    el.style.backgroundColor = 'var(--blue)';
    el.style.height = '.9rem';
    document.documentElement.style.cursor = 'row-resize';
  },
  onDragFinished() {
    const el = document.querySelector('.RequestResizer') as HTMLDivElement;

    el.style.backgroundColor = '';
    el.style.height = '';
    document.documentElement.style.cursor = '';
  },
} as const;
