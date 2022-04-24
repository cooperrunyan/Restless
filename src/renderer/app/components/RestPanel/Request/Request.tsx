import { getRequest } from 'renderer/app/db/get/request';
import { Bang } from 'renderer/app/types/Bang';
import style from './Request.module.scss';
import { UrlBar } from './UrlBar/UrlBar';

interface Props {
  request: Bang<Awaited<ReturnType<typeof getRequest>>>;
}

export const Request: React.FC<Props> = ({ request }) => {
  if (!request) return <></>;

  return (
    <div className={style.Request}>
      <UrlBar request={request} />
    </div>
  );
};
