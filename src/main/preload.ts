import { contextBridge, ipcRenderer } from 'electron';

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
});
