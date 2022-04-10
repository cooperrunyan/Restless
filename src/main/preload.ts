import { contextBridge, ipcRenderer } from 'electron';
import { RequestInit } from 'node-fetch';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on(channel: string, func: (...args: any[]) => void) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (_event, ...args) => func(...args));
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    once(channel: string, func: (...args: any[]) => void) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
  store: {
    get() {
      return ipcRenderer.sendSync('electron-store-get');
    },
    set(val: any) {
      return ipcRenderer.send('electron-store-set', val);
    },
    updater(cb: (...args: any[]) => void) {
      ipcRenderer.addListener('electron-store-set-success', cb);
    },
  },
  uuid() {
    return ipcRenderer.sendSync('electron-uuid');
  },
  async fetch(
    url: string,
    options: RequestInit,
  ): Promise<{
    type: string;
    body: string;
    url: string;
    status: number;
    statusText: string;
    headers: {
      [key: string]: string;
    };
    ok: boolean;
    size: number;
  }> {
    return ipcRenderer.invoke('electron-fetch', url, options);
  },

  openLink(link: string) {
    ipcRenderer.send('electron-open-link', link)
  }
});
