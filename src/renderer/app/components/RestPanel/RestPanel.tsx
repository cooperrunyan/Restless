import type { Request as RequestType, Response as ResponseType } from '@prisma/client';
import { useContext, useEffect, useRef, useState } from 'react';
import SplitPane from 'react-split-pane';
import { getCurrentRequest } from 'renderer/app/db/get/request';
import { RefresherContext } from 'renderer/app/Refresher';
import { Logo } from '../Logo/Logo';
import { Tabs } from '../Tabs/Tabs';
import style from './RestPanel.module.scss';

import { Request } from './Request/Request';
import { Response } from './Response/Response';
import { useMediaQuery, useWindowSize } from 'usehooks-ts';

export const RestPanel: React.FC = () => {
  const [request, setRequest] = useState<RequestType & { responses: ResponseType[] }>();
  const { iteration, refresh } = useContext(RefresherContext);
  const container = useRef<HTMLDivElement>(null);
  const [updateInterval, setUpdateInterval] = useState(0);

  const updatePanelSize = () => setUpdateInterval(updateInterval + 1);

  const [containerWidth, setContainerWidth] = useState(0);

  const size = useWindowSize();
  const matches = useMediaQuery('(max-width: 1400px)');

  useEffect(() => void setContainerWidth(container.current?.clientWidth || 0), [size.width]);
  useEffect(() => void getCurrentRequest().then(setRequest), [iteration]);

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
