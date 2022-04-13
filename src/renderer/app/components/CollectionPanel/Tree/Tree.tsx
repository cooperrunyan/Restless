import style from './Tree.module.scss';
import { DataContext } from '../../../lib/DataManager';
import { Folder, Request } from '../../../lib/Settings';
import React, { useContext, useRef, useState } from 'react';
import { ChevronBack } from '../../../icons/chevron-back-outline';
import { Trash } from 'renderer/app/icons/trash';

interface TreeProps {}

interface TreeItemProps<T> {
  item: T;
  id: string;
}

export const Tree: React.FC<TreeProps> = ({}: TreeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dataManager = useContext(DataContext);
  return (
    <div
      ref={ref}
      className={style.Tree}
      onDragOver={e => {
        // When user starts to drag ANOTHER element over this one
        e.preventDefault();
        e.stopPropagation();
        ref.current!.classList.add('drag-target');
      }}
      onDragLeave={e => {
        // When user stops dragging another element over this one
        e.preventDefault();
        e.stopPropagation();
        ref.current!.classList.remove('drag-target');
      }}>
      {dataManager?.getCurrentCollection()?.children?.map(child => (
        <TreeItem key={child.id} item={child} id={child.id} />
      ))}
    </div>
  );
};

export const TreeRequest: React.FC<TreeItemProps<Request>> = ({ item, id }: TreeItemProps<Request>) => {
  const dataManager = useContext(DataContext);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={style.Item + ' ' + style.request + ' ' + (item.id === dataManager?.getCurrentRequest()?.id ? style.current : '')}
      onMouseOver={hover(ref)}
      onMouseOut={unhover(ref)}
      draggable
      id={id}
      onDragStart={e => {
        // When user starts to drag THIS element
        document.documentElement.style.cursor = 'move';
        ref.current!.style.cursor = 'move';
        ref.current!.classList.add('dragging');
        e.stopPropagation();
      }}
      onDragEnd={e => {
        // When user stops dragging THIS element
        document.documentElement.style.cursor = '';
        ref.current!.style.cursor = '';
        ref.current!.classList.remove('dragging');

        const subjectElement = ref.current!;
        const draggingInto = document.querySelector('.drag-target');

        for (const el of Array.from(document.querySelectorAll('.drag-target'))) {
          el.classList.remove('drag-target');
        }

        if (subjectElement.id === draggingInto?.id) {
          draggingInto!.classList.remove('drag-target');
          e.stopPropagation();
          return;
        }

        if (!draggingInto?.id) {
          dataManager?.moveXintoY(subjectElement.id, dataManager?.getCurrentCollection()?.id || '', 0);
          dataManager?.push();
          e.stopPropagation();
          return;
        }

        dataManager?.moveXintoY(subjectElement.id, draggingInto?.id!, 0);
        dataManager?.push();
        e.stopPropagation();

        draggingInto!.classList.remove('drag-target');
      }}
      onClick={e => {
        e.stopPropagation();
        dataManager?.setCurrentRequest(item.id);
        dataManager?.push();
      }}>
      <div className={style.content} id={item.id}>
        <span>{item.name || 'NO_NAME'}</span> <p>{item.method}</p>
      </div>
    </div>
  );
};

export const TreeFolder: React.FC<TreeItemProps<Folder>> = ({ item, id }: TreeItemProps<Folder>) => {
  const dataManager = useContext(DataContext);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);

  return (
    <div
      ref={ref}
      className={style.Item + ' ' + style.folder}
      onMouseOver={hover(ref)}
      onMouseOut={unhover(ref)}
      draggable
      id={id}
      onDragStart={e => {
        // When user starts to drag THIS element
        document.documentElement.style.cursor = 'move';
        ref.current!.style.cursor = 'move';
        ref.current!.classList.add('dragging');
        e.stopPropagation();
      }}
      onDragEnd={e => {
        // When user stops dragging THIS element
        document.documentElement.style.cursor = '';
        ref.current!.style.cursor = '';
        ref.current!.classList.remove('dragging');

        const subjectElement = ref.current!;
        const draggingInto = document.querySelector('.drag-target');

        for (const el of Array.from(document.querySelectorAll('.drag-target'))) {
          el.classList.remove('drag-target');
        }

        if (subjectElement.id === draggingInto?.id) {
          draggingInto!.classList.remove('drag-target');
          e.stopPropagation();
          return;
        }

        if (!draggingInto?.id) {
          dataManager?.moveXintoY(subjectElement.id, dataManager?.getCurrentCollection()?.id || '', 0);
          dataManager?.push();
          e.stopPropagation();
          return;
        }

        dataManager?.moveXintoY(subjectElement.id, draggingInto?.id!, 0);
        dataManager?.push();

        //
        e.stopPropagation();

        draggingInto!.classList.remove('drag-target');
      }}
      onDragOver={e => {
        // When user starts to drag ANOTHER element over this one
        e.preventDefault();

        const dragging = document.querySelector('.dragging')!;
        if (dragging?.id === item.id || sloppyIDCheckingOnParents(ref.current!, dragging.id)) {
          e.stopPropagation();
          return;
        }
        e.stopPropagation();
        setOpen(true);
        ref.current!.classList.add('drag-target');
      }}
      onDragLeave={e => {
        // When user stops dragging another element over this one
        e.preventDefault();
        e.stopPropagation();
        ref.current!.classList.remove('drag-target');
      }}
      onClick={e => {
        e.stopPropagation();
        setOpen(!open);
      }}>
      <div className={style.content}>
        <span>{item.name}</span>
        <span>
          <button
            className={style.delete}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();

              dataManager?.deleteRequest(id);
            }}>
            <Trash />
          </button>
          <ChevronBack className={open ? style.turn : ''} />
        </span>
      </div>
      {open && (item as Folder).children.map(child => <TreeItem id={child.id} key={child.id} item={child} />)}
    </div>
  );
};

export const TreeItem: React.FC<TreeItemProps<Folder | Request>> = ({ item, id }: TreeItemProps<Folder | Request>) => {
  const isFolder = Array.isArray((item as Folder).children);

  if (isFolder) return <TreeFolder item={item as Folder} id={id} />;

  return <TreeRequest item={item as Request} id={id} />;
};

function hover(ref: React.RefObject<HTMLDivElement>) {
  return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    ref.current!.style.backgroundColor = 'var(--dark-grey)';
  };
}

function unhover(ref: React.RefObject<HTMLDivElement>) {
  return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    ref.current!.style.backgroundColor = '';
  };
}

function sloppyIDCheckingOnParents(ref: HTMLElement, id: string) {
  return (
    ref.parentElement?.id === id ||
    ref.parentElement?.parentElement?.id === id ||
    ref.parentElement?.parentElement?.parentElement?.id === id ||
    ref.parentElement?.parentElement?.parentElement?.parentElement?.id === id ||
    ref.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id === id ||
    ref.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id === id ||
    ref.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id === id ||
    ref.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id === id ||
    ref.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.id === id ||
    ref.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
      ?.id === id ||
    ref.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
      ?.parentElement?.id === id
  );
}
