import { deleteFolder } from '@/app/db/delete/folder';
import { deleteRequest } from '@/app/db/delete/request';
import { folders } from '@/app/db/get';
import { getAllRequests } from '@/app/db/get/request';
import { renameFolder } from '@/app/db/rename/folder';
import { renameRequest } from '@/app/db/rename/request';
import { useOnRefresh } from '@/app/hooks/useOnRefresh';
import { useRefresher } from '@/app/hooks/useRefresher';
import { pathsToJSON } from '@/app/lib/pathsToJSON';
import { useState, useRef, useEffect } from 'react';
import { AddOutline } from 'react-ionicons';
import { toast } from 'react-toastify';
import { TemplateItem } from './TemplateItem/TemplateItem';

import type { Props as ItemType } from './Item/Item';
import { Item } from './Item/Item';

import * as channels from '@/channels';

import style from './FileTree.module.scss';

export const FileTree: React.FC = () => {
  const [data, setData] = useState([]);
  const refresh = useRefresher();
  const [showTemplate, setShowTemplate] = useState(false);
  const [templateType, setTemplateType] = useState<'request' | 'folder'>('request');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.electron.ipcRenderer.on(channels.DELETE_ITEM, (e: any, type: string, id: string) => {
      if (type === 'request') deleteRequest(id).then(refresh);
      if (type === 'folder') deleteFolder(id).then(refresh);
    });

    window.electron.ipcRenderer.on(channels.RENAME_ITEM, (e: any, id: string) => {
      const item = getElementByID(data, id);
      if (!item) return;

      item.rename = true;
      item.stopRenaming = (save: boolean, type?: string, name?: string) => {
        item.rename = false;
        if (!save || !name || !type) return setData([...data]);

        if (/\//.test(name)) throw new Error('Request name cannot contain the "/" slash character.');

        if (type === 'folder')
          renameFolder(id, name)
            .catch(err => toast.error(err.message))
            .then(refresh);

        if (type === 'request')
          renameRequest(id, name)
            .catch(err => toast.error(err.message))
            .then(refresh);
      };
      setData([...data]);
    });

    return () => {
      window.electron.ipcRenderer.removeAllListeners(channels.RENAME_ITEM);
      window.electron.ipcRenderer.removeAllListeners(channels.DELETE_ITEM);
    };
  }, [data]);

  useOnRefresh(
    () =>
      void (async () => {
        const requests = getAllRequests();
        const paths = folders.getFoldersInCurrentCollection();

        await Promise.all([requests, paths]);

        const p = (await paths) || [];

        setData(
          pathsToJSON([
            ...p.map(path => ({
              path: path.value,
              id: path.id,
            })),

            ...((await requests) || []).map(request => {
              return {
                path: request.path,
                method: request.method,
                id: request.id,
                name: request.name,
                isRequest: true,
              };
            }),
          ] as any),
        );
      })(),
  );

  return (
    <div
      className={style.FileTree}
      onDoubleClick={e => {
        if (
          !showTemplate &&
          !Array.from(document.elementsFromPoint(e.pageX, e.pageY))
            .map(el => el.classList.contains('ITEM'))
            .includes(true)
        )
          setShowTemplate(true);
      }}>
      <div className={style.manager} onClick={e => e.stopPropagation()}>
        <button
          tabIndex={-1}
          onClick={e => {
            e.preventDefault();
            setTemplateType('request');
            setShowTemplate(true);
          }}>
          <AddOutline height="1.2rem" width="1.2rem" color="var(--7)" />
          Request
        </button>
        <button
          tabIndex={-1}
          onClick={e => {
            e.preventDefault();
            setTemplateType('folder');
            setShowTemplate(true);
          }}>
          <AddOutline height="1.2rem" width="1.2rem" color="var(--7)" />
          Folder
        </button>
      </div>

      <div
        ref={ref}
        id={(data[0] as any)?.id}
        className={style.Tree}
        onDragOver={e => {
          e.stopPropagation();
          e.preventDefault();
          ref.current!.classList.add('current-dragging-over');
        }}
        onDragLeave={e => {
          ref.current!.classList.remove('current-dragging-over');
        }}>
        {(data[0] as any)?.children?.map((item: any) => (
          <Item key={item.id} {...item} />
        ))}
        {showTemplate && <TemplateItem type={templateType} setter={setShowTemplate} />}
      </div>
    </div>
  );
};

function getElementByID(data: ItemType[], id: string): ItemType | null {
  for (const item of data) {
    if (item.id === id) return item;
    const result = getElementByID(item.children || [], id);
    if (result) return result;
  }
  return null;
}
