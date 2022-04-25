import { useState } from 'react';
import { getRequest } from 'renderer/app/db/get/request';
import { Bang } from 'renderer/app/types/Bang';
import { Header } from './Header/Header';
import style from './Request.module.scss';

type SectionName = 'Body' | 'Headers' | 'Query' | 'Authorization' | 'Documentation';

interface Props {
  request: Bang<Awaited<ReturnType<typeof getRequest>>>;
}

export const Request: React.FC<Props> = ({ request }) => {
  const [selected, setSelected] = useState<SectionName>('Body');

  if (!request) return <></>;

  return (
    <div className={style.Request}>
      <Header request={request} selected={selected} setSelected={setSelected} />
    </div>
  );
};
