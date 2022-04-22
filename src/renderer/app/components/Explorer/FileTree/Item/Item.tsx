import { useRef, useState } from 'react';
import { ChevronDownOutline } from 'react-ionicons';
import style from './Item.module.scss';

export interface Props {
  method?: string;
  name: string;
  id: string;
  children?: Props[];
  layer: number;
  rename?: boolean;
}

export const Item: React.FC<Props> = ({ method, name, children, layer, id, rename = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  if (rename) console.log(`rename ${name}`);

  return (
    <div className={style.Item} onClick={e => e.stopPropagation()}>
      <div
        className={style.content + ' ' + style[`layer-${layer || 0}`] + ' ' + (open ? style.open : '')}
        ref={ref}
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
        <h6 className={style.method}>{!children ? method : <ChevronDownOutline width="1.6rem" height="1.6rem" color="var(--7)" />}</h6> <p>{name}</p>
      </div>

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
