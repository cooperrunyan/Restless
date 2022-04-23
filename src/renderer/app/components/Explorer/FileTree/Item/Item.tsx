import { useContext, useEffect, useRef, useState } from 'react';
import { ChevronDownOutline } from 'react-ionicons';
import { toast } from 'react-toastify';
import { moveXintoY } from 'renderer/app/db/move';
import { RefresherContext } from 'renderer/app/Refresher';
import style from './Item.module.scss';

export interface Props {
  method?: string;
  name: string;
  id: string;
  children?: Props[];
  layer: number;
  rename?: boolean;
  stopRenaming: (id: boolean, type?: 'folder' | 'request', name?: string) => void;
}

export const Item: React.FC<Props> = ({ method, name, children, layer, id, rename = false, stopRenaming = () => {} }) => {
  const ref = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const { iteration, refresh } = useContext(RefresherContext);
  const itemRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (rename) nameRef.current?.focus();
  }, [iteration, rename]);

  return (
    <div
      ref={itemRef}
      className={style.Item + ' ITEM'}
      draggable
      id={id}
      onDragOver={e => {
        if (!children) return;
        if (document.querySelector('.current-dragging-element')?.classList.contains('current-dragging-over'))
          return document.querySelector('.current-dragging-element')?.classList.remove('current-dragging-over');

        if (document.querySelector('.current-dragging-element')?.parentElement === document.querySelector('.current-parent-element')) return;

        e.stopPropagation();
        setOpen(true);
        itemRef.current!.classList.add('current-dragging-over');
        e.preventDefault();
      }}
      onDragLeave={e => {
        itemRef.current!.classList.remove('current-dragging-over');
        if (!children) return;
      }}
      onDragStart={e => {
        e.stopPropagation();
        itemRef.current!.classList.add('current-dragging-element');
        setOpen(false);
      }}
      onDragEnd={e => {
        e.stopPropagation();

        const element = id;
        const to = document.querySelector('.current-dragging-over')?.id;

        itemRef.current!.classList.remove('current-dragging-element');
        document.querySelector('.current-dragging-over')?.classList.remove('current-dragging-over');

        if (
          (document.querySelector('.current-dragging-element')?.parentElement?.id === document.querySelector('.current-parent-element')?.id ||
            document.querySelector('.current-dragging-element')?.parentElement?.parentElement?.id === document.querySelector('.current-parent-element')?.id) &&
          document.querySelector('.current-parent-element')?.id
        )
          return;

        if (!to) return;

        moveXintoY(element, to)
          .catch(err => toast.error(err.message))
          .then(refresh);
      }}>
      <form
        className={style.content + ' ' + style[`layer-${layer || 0}`] + ' ' + (open ? style.open : '') + ' ' + (rename ? style.rename : '')}
        ref={ref}
        onSubmit={e => {
          e.preventDefault();
          const name = nameRef.current?.value;
          if (!name) return;

          stopRenaming(true, children ? 'folder' : 'request', name);
        }}
        id={`{"deletable":true,"renamable":true,"id":"${id}","type":"${children ? 'folder' : 'request'}"}`}
        onContextMenu={e => e.stopPropagation()}
        onClick={e => {
          e.stopPropagation();
          if (children) setOpen(!open);
        }}
        onMouseOver={e => {
          e.stopPropagation();
          ref.current!.style.backgroundColor = 'var(--2)';
        }}
        onMouseOut={e => {
          e.stopPropagation();
          ref.current!.style.backgroundColor = '';
        }}>
        <h6 className={style.method}>{!children ? method : <ChevronDownOutline width="1.6rem" height="1.6rem" color="var(--7)" />}</h6>
        {!rename && <p>{name}</p>}
        {rename && <input ref={nameRef} defaultValue={name} onBlur={e => stopRenaming(false)} />}
      </form>
      {children && children[0] && open && (
        <div className={style.children}>
          {children.map(child => (
            <Item key={child.id || Math.random()} {...child} />
          ))}
        </div>
      )}
    </div>
  );
};
