import { PrismaClient } from '@prisma/client';
import { useContext, useEffect, useRef, useState } from 'react';
import { AddOutline, ChevronBackOutline } from 'react-ionicons';
import { toast } from 'react-toastify';
import { createCollectionInCurrentWorkspace as createCollection } from 'renderer/app/db/create/collection';
import { getAllCollections, getCurrentCollection } from 'renderer/app/db/get/collection';
import { setCurrentCollection } from 'renderer/app/db/set/collection';
import { RefresherContext } from 'renderer/app/Refresher';
import style from './Explorer.module.scss';
import { FileTree } from './FileTree/FileTree';

export const Explorer: React.FC = () => {
  const [collection, setCollection] = useState<Awaited<ReturnType<typeof getCurrentCollection>>>();
  const [allCollections, setAllCollections] = useState<Awaited<ReturnType<PrismaClient['collection']['findMany']>>>([]);

  const newCollectionRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const { iteration, refresh } = useContext(RefresherContext);

  useEffect(() => void (async () => setCollection(await getCurrentCollection()))(), [iteration]);
  useEffect(() => void (async () => setAllCollections((await getAllCollections()) || []))(), [iteration]);

  return (
    <div className={style.Explorer}>
      <div className={style.Collections}>
        <div className={style.content} onClick={() => setOpen(!open)}>
          <h6>{collection?.name || 'None Selected'}</h6>
          <span className={open ? style.active : ''}>
            <ChevronBackOutline height="1.2rem" width="1.2rem" color="var(--7)" />
          </span>
        </div>

        <ul className={style.dropdown + ' ' + (open ? style.active : '')}>
          {allCollections.map(collection => (
            <li
              key={collection.id}
              onClick={() => {
                setCurrentCollection(collection.id).then(() => {
                  setOpen(false);
                  refresh();
                });
              }}>
              {collection.name}
            </li>
          ))}
          <li className={style.new}>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (!newCollectionRef.current!.value) return;

                const value = newCollectionRef.current!.value;

                newCollectionRef.current!.value = '';
                newCollectionRef.current!.blur();

                const id = 'loading';

                toast.loading(`Creating workpsace: ${value}`, {
                  toastId: id,
                });

                createCollection(value).then(() => {
                  toast.dismiss(id);

                  setOpen(false);
                  refresh();
                });
              }}>
              <input tabIndex={-1} ref={newCollectionRef} type="text" placeholder="New..." />
              <button tabIndex={-1} type="submit">
                <AddOutline width="2.2rem" height="2.2rem" color="var(--7)" />
              </button>
            </form>
          </li>
        </ul>
      </div>
      <div className={style.backdrop + ' ' + (open ? style.active : '')} onClick={() => setOpen(false)}></div>

      <FileTree />
    </div>
  );
};
