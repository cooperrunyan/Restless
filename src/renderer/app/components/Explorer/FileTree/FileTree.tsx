import { useContext, useEffect, useState } from 'react';
import { AddOutline } from 'react-ionicons';
import { folders } from 'renderer/app/db/get';
import { getAllRequests } from 'renderer/app/db/get/request';
import { RefresherContext } from 'renderer/app/Refresher';
import style from './FileTree.module.scss';
import { Item } from './Item/Item';
import { pathsToJSON } from './parse/pathsToJSON';
import * as channels from '../../../../../channels';
import { deleteRequest } from 'renderer/app/db/delete/request';
import { TemplateItem } from './TemplateItem/TemplateItem';
import { deleteFolder } from 'renderer/app/db/delete/folder';
import type { Props as ItemType } from './Item/Item';

export const FileTree: React.FC = () => {
  const [data, setData] = useState([]);
  const { iteration, refresh } = useContext(RefresherContext);
  const [showTemplate, setShowTemplate] = useState(false);
  const [templateType, setTemplateType] = useState<'request' | 'folder'>('request');

  useEffect(() => {
    window.electron.ipcRenderer.on(channels.DELETE_ITEM, (e, type: string, id: string) => {
      if (type === 'request') deleteRequest(id).then(refresh);
      if (type === 'folder') deleteFolder(id).then(refresh);
    });
    window.electron.ipcRenderer.on(channels.RENAME_ITEM, (e, id: string) => {
      const item = getElementByID(data, id)
    });
  }, []);

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
        if (!showTemplate) setShowTemplate(true);
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

      <div className={style.Tree}>
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
