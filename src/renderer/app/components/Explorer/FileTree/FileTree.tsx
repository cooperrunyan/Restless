import { useContext, useEffect, useState } from 'react';
import { AddOutline } from 'react-ionicons';
import { createRequestInCurrentCollection as createRequest } from 'renderer/app/db/create/request';
import { folders } from 'renderer/app/db/get';
import { getFoldersInCurrentCollection } from 'renderer/app/db/get/folders';
import { getAllRequests } from 'renderer/app/db/get/request';
import { RefresherContext } from 'renderer/app/Refresher';
import style from './FileTree.module.scss';
import { Item } from './Item/Item';
import { pathsToJSON } from './parse/pathsToJSON';
import * as channels from '../../../../../channels';
import { deleteRequest } from 'renderer/app/db/delete/request';

type Path = Bang<Awaited<ReturnType<typeof getFoldersInCurrentCollection>>>;
type Bang<T> = T extends null | undefined ? never : T;

export const FileTree: React.FC = () => {
  const [data, setData] = useState([]);
  const { iteration, refresh } = useContext(RefresherContext);

  useEffect(() => {
    window.electron.ipcRenderer.on(channels.DELETE_ITEM, (e, type: string, id: string) => {
      if (type === 'request') deleteRequest(id).then(refresh);
    });

    (async () => {
      const requests = getAllRequests();
      const paths = folders.getFoldersInCurrentCollection();

      await Promise.all([requests, paths]);

      setData(
        pathsToJSON([
          { path: '/Users', id: 'sdf' },
          { path: '/Profiles', id: 'sdfsg' },
          ...((await paths) || []).map(path => {
            (path as any).path = path.value;
            return path;
          }),

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
    <div className={style.FileTree}>
      <div className={style.manager}>
        <button
          tabIndex={-1}
          onClick={e => {
            e.preventDefault();

            (async () => {
              refresh();
            })();
          }}>
          <AddOutline height="1.2rem" width="1.2rem" color="var(--7)" />
          Request
        </button>
        <button tabIndex={-1}>
          <AddOutline height="1.2rem" width="1.2rem" color="var(--7)" />
          Folder
        </button>
      </div>

      <div className={style.Tree}>
        {(data[0] as any)?.children!.map((item: any) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
