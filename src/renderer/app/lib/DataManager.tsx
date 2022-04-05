import { createContext, ReactChild, useEffect, useState } from 'react';
import { Setter } from '../types/State';
import { Collection, Folder, Storage, Workspace, Request } from './Settings';

export const DataContext = createContext<{
  storage: Storage;
  setStorage: Setter<Storage>;
  push(): void;
  pull(): void;
  getAllWorkspaces(): Workspace[];
  setWorkspace(workspace: Workspace): void;
  setCurrentWorkspace(workspace: string): void;
  getCurrentWorkspace(): Workspace | null;
  getCurrentCollection(): Collection | null;
  setCurrentCollection(col: string): null;
  getCurrentRequest(): Request | null;
  setCurrentRequest(req: string): void;
  createWorkspace(name: string): void;
  createCollection(name: string): void;
  createFolder(name: string, parentId?: string | undefined): true | null;
  createRequest(name: string, parentId?: string | undefined): true | null;
  moveXintoY(idOfElementToBeMoved: string, idOfElementToBeMovedInto: string, index: number): any;
  deleteTreeItem(idOfElementToBeDeleted: string): any;
  modifyRequest(id: string, request: Partial<Request>): true | null;
  modifyCurrentRequest(request: Partial<Request>): true | null;
  toggleSidebar(): void;
  uuid(): string;
} | null>(null);

const defaultStorage = {
  currentWorkspace: null,
  workspaces: [],
  settings: {
    hideSidebar: false,
  },
};

export function Data({ children }: { children?: ReactChild | ReactChild[] }) {
  const [storage, setStorage] = useState<Storage>(defaultStorage);

  useEffect(() => {
    pull();
  }, []);

  function push() {
    if (window?.electron?.store) window.electron.store.set(storage);
    else localStorage?.setItem('storage', JSON.stringify(storage));
  }

  function pull() {
    if (window?.electron?.store) setStorage(window.electron.store.get());
    else setStorage(JSON.parse(localStorage.getItem('storage') || JSON.stringify(defaultStorage)));
  }

  function getAllWorkspaces() {
    return storage.workspaces;
  }

  function setWorkspace(workspace: Workspace) {
    for (const _workspace of storage.workspaces) {
      if (_workspace.name === workspace.name) {
        storage.workspaces[storage.workspaces.indexOf(_workspace)] = workspace;
      }
    }
    setStorage({ ...storage });
  }

  function setCurrentWorkspace(workspace: string) {
    storage.currentWorkspace = workspace;
    setStorage({ ...storage });
  }

  function getCurrentWorkspace() {
    for (const workspace of storage.workspaces) {
      if (workspace.id === storage.currentWorkspace) return workspace;
    }
    return null;
  }

  function getCurrentCollection() {
    const workspace = getCurrentWorkspace();
    if (!workspace) return null;

    for (const collection of workspace.collections) {
      if (collection.id === workspace.currentCollection) return collection;
    }
    return null;
  }

  function setCurrentCollection(col: string) {
    const s = storage;
    for (const workspace of s.workspaces) {
      if (workspace.id === s.currentWorkspace) {
        for (const collection of workspace.collections) {
          if (collection.id === col) {
            workspace.currentCollection = col;
          }
        }
      }
    }
    setStorage({ ...s });
    return null;
  }

  function getCurrentRequest() {
    const collection = getCurrentCollection();
    if (!collection || !collection.currentRequest) return null;

    return getElementById(storage, collection.currentRequest, collection).child as Request | null;
  }

  function modifyRequest(id: string, request: Partial<Request>) {
    const collection = getCurrentCollection();
    if (!collection) return null;

    const req = getElementById(storage, id, collection).child as any;

    for (const [key, value] of Object.entries(request)) {
      req[key as any] = value;
    }

    setStorage({ ...storage });
    return true;
  }
  function modifyCurrentRequest(request: Partial<Request>) {
    const collection = getCurrentCollection();
    if (!collection?.currentRequest) return null;

    return modifyRequest(collection.currentRequest, request);
  }

  function setCurrentRequest(id: string) {
    const collection = getCurrentCollection();
    if (!collection) return null;

    collection.currentRequest = id;
    setStorage({ ...storage });
    return true;
  }

  function createWorkspace(name: string) {
    const id = uuid();
    const _storage = storage;
    _storage.workspaces.push({
      name,
      collections: [],
      servers: [],
      id,
    });
    _storage.currentWorkspace = id;
    setStorage({ ..._storage });
  }

  function createCollection(name: string) {
    const id = uuid();
    for (const workspace of storage.workspaces) {
      if (workspace.id === storage.currentWorkspace) {
        workspace.collections.push({
          id,
          name,
          children: [],
        });
        workspace.currentCollection = id;
      }
    }
    setStorage({ ...storage });
  }

  function createRequest(name: string, parentId?: string) {
    const s = storage;
    for (const workspace of s.workspaces) {
      if (workspace.id === s.currentWorkspace) {
        for (const collection of workspace.collections) {
          if (collection.id === workspace.currentCollection) {
            const parent = parentId ? findParent(parentId, collection) : collection;

            parent?.children.push({
              sending: false,
              name,
              id: uuid(),
              auth: {
                type: null,
                data: '',
              },
              method: 'GET',
              body: {
                type: null,
                data: null,
              },
              endpoint: 'https://echo.cooperrunyan.com/ping',

              docs: `# ${name}`,
              headers: [],
              query: [],
            });

            setStorage(s);
            return true;
          }
        }
      }
    }
    return null;
  }

  function createFolder(name: string, parentId?: string) {
    const s = storage;
    for (const workspace of s.workspaces) {
      if (workspace.id === s.currentWorkspace) {
        for (const collection of workspace.collections) {
          if (collection.id === workspace.currentCollection) {
            const parent = parentId ? findParent(parentId, collection) : collection;

            parent?.children.push({
              name,
              children: [],
              id: uuid(),
            });

            setStorage(s);
            return true;
          }
        }
      }
    }
    return null;
  }

  function deleteTreeItem(idOfElementToBeDeleted: string): any {
    const collection = getCurrentCollection();
    if (!collection) return null;

    const elementToBeDeleted = getElementById(storage, idOfElementToBeDeleted, collection);

    if (!elementToBeDeleted.child) return null;
    if (elementToBeDeleted.child.id !== idOfElementToBeDeleted) return null;

    elementToBeDeleted.parent!.children.splice(elementToBeDeleted.parent!.children.indexOf(elementToBeDeleted.child), 1);

    setStorage({ ...storage });
    return true;
  }

  function moveXintoY(idOfElementToBeMoved: string, idOfElementToBeMovedInto: string, index: number): any {
    const collection = getCurrentCollection();
    if (!collection) return null;

    const elementToBeMoved = getElementById(storage, idOfElementToBeMoved, collection);

    const elementToBeMovedInto = getElementById(storage, idOfElementToBeMovedInto, collection) as any;

    if (!elementToBeMoved.child || !elementToBeMovedInto.child) return null;
    if (elementToBeMoved.child.id !== idOfElementToBeMoved) return null;
    if (elementToBeMovedInto.child.id !== idOfElementToBeMovedInto) return null;

    elementToBeMoved.parent!.children.splice(elementToBeMoved.parent!.children.indexOf(elementToBeMoved.child), 1);

    elementToBeMovedInto.child.children.splice(index, 0, elementToBeMoved.child);

    setStorage({ ...storage });
  }

  function toggleSidebar() {
    storage.settings.hideSidebar = !storage.settings.hideSidebar;

    setStorage({ ...storage });
  }

  function uuid() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16; //random number between 0 and 16
      if (d > 0) {
        //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  return (
    <DataContext.Provider
      value={{
        storage,
        setStorage,
        pull,
        push,
        moveXintoY,
        createCollection,
        createFolder,
        createWorkspace,
        createRequest,
        getAllWorkspaces,
        getCurrentCollection,
        getCurrentRequest,
        getCurrentWorkspace,
        setCurrentCollection,
        setCurrentRequest,
        setCurrentWorkspace,
        setWorkspace,
        deleteTreeItem,
        modifyRequest,
        modifyCurrentRequest,
        toggleSidebar,
        uuid,
      }}>
      {children}
    </DataContext.Provider>
  );
}

function findParent(parentId: string, collection: Collection | Folder): Folder | null {
  for (const child of collection.children) {
    if (!(child as Folder).children) continue;
    if ((child as Folder).id === parentId) return child as Folder;
    const stuff = findParent(parentId, child as Folder);
    if (stuff) {
      return stuff;
    }
  }
  return null;
}

function getElementById(storage: Storage, id: string, scope: Collection | Folder): { child: Folder | Request | null; parent: Folder | Collection | null } {
  let result = null;

  if (id === scope.id) {
    return { child: scope, parent: null };
  }

  for (const child of scope.children) {
    if (child.id === id) {
      return { child, parent: scope };
    }

    if (!result && Array.isArray((child as Folder).children)) {
      result = getElementById(storage, id, child as Folder);
    }
  }
  return result as any;
}
