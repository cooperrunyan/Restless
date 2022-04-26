import { AddOutline, CheckboxOutline, TrashOutline } from 'react-ionicons';
import { getRequest } from '../../../../../db/get/request';
import { Bang } from '../../../../../types/Bang';
import style from './Headers.module.scss';

interface Props {
  request: Bang<Awaited<ReturnType<typeof getRequest>>>;
}

export const Headers: React.FC<Props> = ({ request }) => {
  if (!request) return <></>;

  return (
    <div className={style.Headers}>
      <div className={style.grid}>
        <div className={style.head}></div>
        <div className={style.head}>Header</div>
        <div className={style.head}>Value</div>
        <div className={style.head + ' ' + style.add}>
          <AddOutline color="var(--7)" width="2rem" height="2rem" />
        </div>

        <div className={style.spacer + ' ' + style.start}></div>
        <div>
          <input type="text" placeholder="header" />
        </div>
        <div>
          <input type="text" placeholder="value" />
          <span>
            <CheckboxOutline color="var(--primary)" height="2rem" width="2rem" />
          </span>
          <span className={style.end}>
            <TrashOutline color="var(--4)" height="2rem" width="2rem" />
          </span>
        </div>
        <div className={style.spacer + ' ' + style.end}></div>
      </div>
    </div>
  );
};
