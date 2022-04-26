import { getRequest } from '@/app/db/get/request';
import { Bang } from '@/app/types/Bang';
import { useState, ReactElement } from 'react';
import { Body } from './sections/Body/Body';
import { Headers } from './sections/Headers/Headers';
import { useElementSize } from 'usehooks-ts';
import { Header } from './Header/Header';
import style from './Request.module.scss';

type SectionName = 'Body' | 'Headers' | 'Query' | 'Authorization' | 'Documentation';

interface Props {
  request: Bang<Awaited<ReturnType<typeof getRequest>>>;
  updateInterval: number;
}

export const Request: React.FC<Props> = ({ request, updateInterval }) => {
  const [selected, setSelected] = useState<SectionName>('Body');
  const [ref, size] = useElementSize();

  if (!request) return <></>;

  return (
    <div className={style.Request} ref={ref}>
      <Header request={request} selected={selected} setSelected={setSelected} />
      <Overlap>
        <Show when={selected === 'Body'}>
          <Body request={request} containerSize={size} updateInterval={updateInterval} />
        </Show>
        <Show when={selected === 'Headers'}>
          <Headers request={request} />
        </Show>
      </Overlap>
    </div>
  );
};

const Show: React.FC<{ when: boolean; children: ReactElement }> = ({ children, when }) => {
  return <div className={style.Show + ' ' + (when ? style.active : '')}>{children}</div>;
};

const Overlap: React.FC<{ children: ReactElement[] }> = ({ children }) => {
  return <div className={style.overlap}>{children}</div>;
};
