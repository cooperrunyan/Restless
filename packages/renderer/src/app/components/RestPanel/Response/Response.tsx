import { getResponse } from '../../../db/get/response';
import { Bang } from '../../../types/Bang';
import style from './Response.module.scss';

interface Props {
  responses: Bang<Awaited<ReturnType<typeof getResponse>>>;
}

export const Response: React.FC<Props> = ({ responses }) => {
  if (!responses) return <></>;

  return <div className={style.Response}>Response</div>;
};
