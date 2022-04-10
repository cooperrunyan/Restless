import { RequestInit, Response } from 'node-fetch';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        on(channel: string, func: (...args: any[]) => void): void;
        once(channel: string, func: (...args: any[]) => void): void;
      };
      openLink: (url: string) => void;
      store: {
        get: () => any;
        set: (val: any) => void;
        updater: (cb: (...args: any[]) => void) => void;
      };
      uuid: () => string;
      fetch: (
        url: string,
        options: RequestInit,
      ) => Promise<{
        type: string;
        body: string;
        url: string;
        status: number;
        statusText: string;
        headers: { [key: string]: string };
        ok: boolean;
        size: number;
      }>;
    };
  }
}

export {};
