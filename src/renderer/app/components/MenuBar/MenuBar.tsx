import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from 'renderer/app/lib/DataManager';
import { Workspace } from 'renderer/app/lib/Settings';
import { ChevronBack } from '../../icons/chevron-back-outline';
import style from './MenuBar.module.scss';

export function MenuBar() {
  const [showList, setShowList] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const newWorkspaceName = useRef<HTMLInputElement>(null);
  const dataManager = useContext(DataContext);

  useEffect(() => newWorkspaceName.current?.focus(), [showCreate]);

  return (
    <>
      <div className={style.MenuBar}>
        <div className={style.workspaces}>
          <button
            onClick={(e) => {
              e.preventDefault();

              if (showCreate) setShowCreate(false);
              else if (showList) setShowList(false);
              else if (!showCreate && !showList) setShowList(true);
            }}
          >
            <span>
              Workspaces
              {Object.keys(dataManager?.getCurrentWorkspace() || {})[0] && (
                <span>
                  &nbsp;/&nbsp;{dataManager?.getCurrentWorkspace()?.name}
                </span>
              )}
            </span>
            <ChevronBack
              className={`${style.icon} ${
                showCreate || showList ? style.turn : ''
              }`}
            />
          </button>
          <div className={style.list + ' ' + (showList ? style.shown : '')}>
            <p>Workspaces</p>
            <ul>
              {dataManager?.storage?.workspaces?.map((workspace) => {
                return (
                  <WorkspaceOption
                    key={Math.random()}
                    state={{ setShowCreate, setShowList }}
                  >
                    {workspace}
                  </WorkspaceOption>
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
                  Create Workspace
                </a>
              </li>
            </ul>
          </div>
          <div
            className={`${style.createMenu} ${showCreate ? style.shown : ''}`}
          >
            <p
              className={style.backLabel}
              onClick={(e) => {
                setShowList(true);
                setShowCreate(false);
              }}
            >
              <ChevronBack className={style.back} id="back" />
              <label>New Workspace</label>
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const name = newWorkspaceName.current?.value;
                if (!name) return;

                setShowCreate(false);
                setShowList(false);

                // CREATE NEW WORKSPACE

                dataManager?.createWorkspace(name);
                dataManager?.push();
              }}
            >
              <div className={style.row}>
                <label htmlFor="workspace-name">Name</label>
                <input
                  ref={newWorkspaceName as any}
                  type="text"
                  id="workspace-name"
                  placeholder="Workspace Name"
                />
              </div>
              <button className={style.submit} type={'submit'}>
                Create Workspace
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className={
          style.overlay + ' ' + (showList || showCreate ? style.show : '')
        }
        onClick={() => {
          setShowCreate(false);
          setShowList(false);
        }}
      ></div>
    </>
  );
}

function WorkspaceOption({
  children,
  state,
}: {
  children: Workspace;
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

          dataManager?.setCurrentWorkspace(children.id);
          dataManager?.push();
        }}
      >
        {children.name}
      </a>
    </li>
  );
}
