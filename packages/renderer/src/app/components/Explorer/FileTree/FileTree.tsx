import { useContext, useEffect, useRef, useState } from 'react';
import { AddOutline } from 'react-ionicons';
import { folders } from '../../../db/get';
import { getAllRequests } from '../../../db/get/request';
import { RefresherContext } from '../../../Refresher';
import style from './FileTree.module.scss';
import { Item } from './Item/Item';
import { pathsToJSON } from './parse/pathsToJSON';
import * as channels from '../../../../../../main/channels';
import { deleteRequest } from '../../../db/delete/request';
import { TemplateItem } from './TemplateItem/TemplateItem';
import { deleteFolder } from '../../../db/delete/folder';
import type { Props as ItemType } from './Item/Item';
import { renameFolder } from '../../../db/rename/folder';
import { toast } from 'react-toastify';
import { renameRequest } from '../../../db/rename/request';

export const FileTree: React.FC = () => {
  const [data, setData] = useState([]);
  const { iteration, refresh } = useContext(RefresherContext);
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

  useEffect(() => {
    (async () => {
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
    })();
  }, [iteration]);

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
