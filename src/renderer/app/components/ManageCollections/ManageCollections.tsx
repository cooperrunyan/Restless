import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';
import { Collection } from 'renderer/app/lib/Settings';
import { ChevronBack } from '../../icons/chevron-back-outline';
import style from './ManageCollections.module.scss';

export function ManageCollections() {
  const [showList, setShowList] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const newCollectionName = useRef<HTMLInputElement>(null);
  const dataManager = useContext(DataContext);

  useEffect(() => newCollectionName.current?.focus(), [showCreate]);

  return (
    <>
      <div
        className={style.selectCollection}
        onClick={(e) => {
          setShowCreate(false);
          setShowList(!showList);
        }}
      >
        {dataManager?.getCurrentCollection()?.name || 'Select A Collection'}
        <ChevronBack className={showList || showCreate ? style.turn : ''} />
      </div>
      <div className={style.list + ' ' + (showList ? style.shown : '')}>
        <p>Collections</p>
        <ul>
          {dataManager
            ?.getCurrentWorkspace()
            ?.collections?.map((collection) => {
              return (
                <CollectionOption
                  key={Math.random()}
                  state={{ setShowCreate, setShowList }}
                >
                  {collection}
                </CollectionOption>
              );
            })}

          <li>
            <a
              className={style.create}
              onClick={(e) => {
                e.preventDefault();
                setShowList(false);
                setShowCreate(true);
              }}
            >
              Create Collection
            </a>
          </li>
        </ul>
      </div>
      <div className={`${style.createMenu} ${showCreate ? style.shown : ''}`}>
        <p
          className={style.backLabel}
          onClick={(e) => {
            setShowList(true);
            setShowCreate(false);
          }}
        >
          <ChevronBack className={style.back} id="back" />
          <label>New Collection</label>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = newCollectionName.current?.value;
            if (!name) return;

            setShowCreate(false);
            setShowList(false);

            // // CREATE NEW COLLECTION

            dataManager?.createCollection(name);
            dataManager?.push();
          }}
        >
          <div className={style.row}>
            <label htmlFor="collection-name">Name</label>
            <input
              ref={newCollectionName as any}
              type="text"
              id="collection-name"
              placeholder="Collection Name"
            />
          </div>
          <button className={style.submit} type={'submit'}>
            Create Collection
          </button>
        </form>
      </div>
    </>
  );
}

function CollectionOption({
  children,
  state,
}: {
  children: Collection;
  state: any;
}) {
  const dataManager = useContext(DataContext);
  return (
    <li>
      <a
        onClick={(e) => {
          e.preventDefault();
          state.setShowList(false);
          state.setShowCreate(false);

          dataManager?.setCurrentCollection(children.id);
          dataManager?.push();
        }}
      >
        {children.name}
      </a>
    </li>
  );
}
