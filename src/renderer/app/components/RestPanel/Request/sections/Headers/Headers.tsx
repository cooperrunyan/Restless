import style from './Headers.module.scss';

interface Props {
  request: Bang<Awaited<ReturnType<typeof getRequest>>>;
}

export const Headers: React.FC<Props> = ({ request }) => {
  if(!request) return <></>;

  return <div className={style.Headers}></div>
}