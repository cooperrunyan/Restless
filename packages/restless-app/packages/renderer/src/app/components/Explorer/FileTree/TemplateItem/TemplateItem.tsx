import { createFolderInCurrentCollection } from '@/app/db/create/folder';
import { createRequestInCurrentCollection } from '@/app/db/create/request';
import { useRefresher } from '@/app/hooks/useRefresher';
import { useRef, useState, useEffect } from 'react';
import { ChevronDownOutline } from 'react-ionicons';
import { toast } from 'react-toastify';
import style from './TemplateItem.module.scss';

interface Props {
  type: 'request' | 'folder';
  setter: (x: boolean) => void;
}

export const TemplateItem: React.FC<Props> = ({ type, setter }) => {
  const ref = useRef<HTMLInputElement>(null);
  const item = useRef<HTMLFormElement>(null);
  const refresh = useRefresher();

  const [input, setInput] = useState('');

  useEffect(() => ref.current!.focus(), []);

  return (
    <div className={style.TemplateItem}>
      <form
        ref={item}
        id="TEMPLATE_ITEM"
        className={style.content}
        onMouseOver={e => {
          e.stopPropagation();
          item.current!.style.backgroundColor = 'var(--2)';
        }}
        onMouseOut={e => {
          e.stopPropagation();
          item.current!.style.backgroundColor = '';
        }}
        onSubmit={e => {
          e.preventDefault();
          if (!input) return;

          if (type === 'request') {
            createRequestInCurrentCollection({
              documentation: `# ${input}`,
              name: input,
              path: `/${input}`,
              url: 'http://echo.restless.cc',
            })
              .catch(({ message }) => {
                if (!/timed out during query/gi.test(message)) toast.error(message);
              })
              .then(refresh)
              .then(() => setter(false));
          } else {
            createFolderInCurrentCollection({
              value: input,
            })
              .catch(({ message }) => {
                if (!/timed out during query/gi.test(message)) toast.error(message);
              })
              .then(refresh)
              .then(() => setter(false));
          }
        }}>
        {<h6 className={style.method}>{type === 'request' ? 'GET' : <ChevronDownOutline width="1.6rem" height="1.6rem" color="var(--7)" />}</h6>}
        <input
          type="text"
          ref={ref}
          value={input}
          placeholder="Request"
          onBlur={e => setter(false)}
          onChange={e => {
            setInput(e.target.value);
          }}
        />
      </form>
    </div>
  );
};
