import { getCurrentRequest } from '@/app/db/get/request';
import { useState, useRef, useEffect } from 'react';
import { useOnRefresh } from '@/app/hooks/useOnRefresh';
import { useRefresher } from '@/app/hooks/useRefresher';
import { useWindowSize, useMediaQuery } from 'usehooks-ts';
import { Logo } from '../Logo/Logo';
import { Tabs } from '../Tabs/Tabs';
import style from './RestPanel.module.scss';
import { Request } from './Request/Request';
import { Response } from './Response/Response';
import SplitPane from 'react-split-pane';

export const RestPanel = () => {
  const [request, setRequest] = useState();
  const container = useRef(null);
  const [updateInterval, setUpdateInterval] = useState(0);

  const updatePanelSize = () => setUpdateInterval(updateInterval + 1);

  const [containerWidth, setContainerWidth] = useState(0);

  const size = useWindowSize();
  const matches = useMediaQuery('(max-width: 1400px)');

  useEffect(() => void setContainerWidth(container.current?.clientWidth || 0), [size.width]);
  useOnRefresh(() => void getCurrentRequest().then(setRequest), []);

  if (!request)
    return (
      <div className={style.RestPanel}>
        <Tabs />
        <div className={style.Logocontainer}>
          <Logo color="var(--4)" />
        </div>
      </div>
    );

  return (
    <div className={style.RestPanel}>
      <Tabs />
      <div className={style.content} ref={container}>
        <SplitPane
          primary="first"
          split={matches ? 'horizontal' : 'vertical'}
          pane1Style={{ background: 'var(--1)' }}
          pane2Style={{ background: 'var(--1)', zIndex: 4 }}
          onDragFinished={updatePanelSize}
          defaultSize="50%"
          minSize={0}
          maxSize={matches ? size.height - 132 : containerWidth - 6}>
          <Request request={request} updateInterval={updateInterval} />
          <Response responses={request.responses} />
        </SplitPane>
      </div>
    </div>
  );
};
