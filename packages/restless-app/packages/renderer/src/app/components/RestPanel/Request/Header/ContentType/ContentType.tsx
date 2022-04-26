import { modifyCurrentRequest } from '@/app/db/modify/request';
import { useRefresher } from '@/app/hooks/useRefresher';
import { useState } from 'react';
import { ChevronBackOutline } from 'react-ionicons';
import { toast } from 'react-toastify';
import style from './ContentType.module.scss';

const contentTypes = [null, 'application/json', 'application/xml', 'text/plain', 'text/yaml', 'text/html'] as const;

interface Props {
  contentType: typeof contentTypes[number];
}

export const ContentType: React.FC<Props> = ({ contentType }) => {
  const [open, setOpen] = useState(false);
  const refresh = useRefresher();

  return (
    <div className={style.ContentType + ' ' + (open ? style.open : '')} onClick={() => setOpen(!open)}>
      <div className={style.content} onClick={() => setOpen(!open)}>
        <span className={style.ct}>Content-type:</span>
        <code>{contentType ? contentType : 'none'}</code>
        <ChevronBackOutline color="var(--7)" height="1.2rem" width="1.2rem" />
      </div>

      <div className={style.dropdown + ' ' + (open ? style.open : '')}>
        {contentTypes.map(ct => (
          <div
            key={ct}
            onClick={e => {
              modifyCurrentRequest({ contentType: ct })
                .catch(err => toast.error(err.message))
                .then(() => {
                  setOpen(false);
                  refresh();
                });
            }}>
            {ct || 'none'}
          </div>
        ))}
      </div>
    </div>
  );
};
