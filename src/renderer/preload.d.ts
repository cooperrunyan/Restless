declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        on(channel: string, func: (...args: any[]) => void): void;
        once(channel: string, func: (...args: any[]) => void): void;
      };
      store: {
        get: () => any;
        set: (val: any) => void;
        updater: (cb: (...args: any[]) => void) => void;
      };
      uuid: () => string;
    };
  }
}

export {};
