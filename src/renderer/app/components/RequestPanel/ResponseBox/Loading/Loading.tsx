import { Spinner } from 'renderer/app/components/Spinner/Spinner';
import style from './Loading.module.scss';

interface Props {
  loading: boolean;
}

export const Loading: React.FC<Props> = ({ loading }: Props) => {
  return (
    <div className={style.Loading + ' ' + (loading ? style.show : '')}>
      <div className={style.content}>
        <Spinner />
      </div>
    </div>
  );
};
