import type { PrismaClient } from '@prisma/client';

declare global {
  interface Window {
    electron: {
      ipcRenderer: Electron.IpcRenderer;
      prisma: {
        workspace: PrismaClient['workspace'];
        user: PrismaClient['user'];
        collection: PrismaClient['collection'];
        settings: PrismaClient['settings'];
        request: PrismaClient['request'];
        response: PrismaClient['response'];
        path: PrismaClient['path'];
        $connect: PrismaClient['$connect'];
        $disconnect: PrismaClient['$disconnect'];
      };
    };
  }
}

export {};
