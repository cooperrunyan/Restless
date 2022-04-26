import { useEffect } from 'react';
import { AddOutline, CheckboxOutline, TrashOutline } from 'react-ionicons';
import { useElementSize } from 'usehooks-ts';
import { getRequest } from '../../../../../db/get/request';
import { Bang } from '../../../../../types/Bang';
import style from './Headers.module.scss';

const MaxGridWidth = 480;

interface Props {
  request: Bang<Awaited<ReturnType<typeof getRequest>>>;
}

export const Headers: React.FC<Props> = ({ request }) => {
  const [ref, { width }] = useElementSize<HTMLDivElement>();

  useEffect(() => {
    const grid = document.querySelector<HTMLDivElement>(`.${style.Headers} .${style.grid}`)!;
    if (width < MaxGridWidth) return grid.style.setProperty('grid-template-columns', '1fr 1fr');
    return grid.style.setProperty('grid-template-columns', '');
  }, [width]);

  if (!request) return <></>;

  return (
    <div className={style.Headers}>
      <div className={style.grid} ref={ref}>
        {width >= MaxGridWidth && <div className={style.head}></div>}
        <div className={style.head}>Header</div>
        <div className={style.head}>Value</div>
        {width >= MaxGridWidth && (
          <div className={style.head + ' ' + style.add}>
            <AddOutline color="var(--7)" width="2rem" height="2rem" />
          </div>
        )}

        <Row tooSmall={width < MaxGridWidth} template />
      </div>
    </div>
  );
};

const Row: React.FC<{ tooSmall: boolean; template?: true }> = ({ tooSmall }) => {
  return (
    <>
      {!tooSmall && <div className={style.spacer + ' ' + style.start}></div>}
      <div>
        <input type="text" placeholder="header" />
      </div>
      <div>
        <input type="text" placeholder="value" />
        <span className={style.button}>
          <CheckboxOutline color="var(--primary)" height="2rem" width="2rem" />
        </span>
        <span className={style.button + ' ' + style.end}>
          <TrashOutline color="var(--4)" height="2rem" width="2rem" />
        </span>
      </div>
      {!tooSmall && <div className={style.spacer + ' ' + style.end}></div>}
    </>
  );
};
