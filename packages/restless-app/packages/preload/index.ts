import { contextBridge, ipcRenderer } from 'electron';
import { createRequire } from 'module';
import path from 'path';

const require = createRequire(path.join(__dirname, '../preload/index.cjs'));
const { PrismaClient } = require('@prisma/client') as typeof import('@prisma/client');

const prisma = new PrismaClient();

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on: (...args) => ipcRenderer.on(...args),
    addListener: (...args) => ipcRenderer.addListener(...args),
    emit: (...args) => ipcRenderer.emit(...args),
    eventNames: (...args) => ipcRenderer.eventNames(...args),
    getMaxListeners: (...args) => ipcRenderer.getMaxListeners(...args),
    invoke: (...args) => ipcRenderer.invoke(...args),
    listenerCount: (...args) => ipcRenderer.listenerCount(...args),
    listeners: (...args) => ipcRenderer.listeners(...args),
    off: (...args) => ipcRenderer.off(...args),
    once: (...args) => ipcRenderer.once(...args),
    postMessage: (...args) => ipcRenderer.postMessage(...args),
    prependListener: (...args) => ipcRenderer.prependListener(...args),
    prependOnceListener: (...args) => ipcRenderer.prependOnceListener(...args),
    rawListeners: (...args) => ipcRenderer.rawListeners(...args),
    removeAllListeners: (...args) => ipcRenderer.removeAllListeners(...args),
    removeListener: (...args) => ipcRenderer.removeListener(...args),
    send: (...args) => ipcRenderer.send(...args),
    sendSync: (...args) => ipcRenderer.sendSync(...args),
    sendTo: (...args) => ipcRenderer.sendTo(...args),
    sendToHost: (...args) => ipcRenderer.sendToHost(...args),
    setMaxListeners: (...args) => ipcRenderer.setMaxListeners(...args),
  } as typeof ipcRenderer,
  prisma: {
    user: {
      aggregate: async (...args) => await prisma.user.aggregate(...args),
      count: async (...args) => await prisma.user.count(...args),
      create: async (...args) => await prisma.user.create(...args),
      delete: async (...args) => await prisma.user.delete(...args),
      deleteMany: async (...args) => await prisma.user.deleteMany(...args),
      findFirst: async (...args) => await prisma.user.findFirst(...args),
      findMany: async (...args) => await prisma.user.findMany(...args),
      findUnique: async (...args) => await prisma.user.findUnique(...args),
      update: async (...args) => await prisma.user.update(...args),
      updateMany: async (...args) => await prisma.user.updateMany(...args),
      upsert: async (...args) => await prisma.user.upsert(...args),
    },
    tab: {
      aggregate: async (...args) => await prisma.tab.aggregate(...args),
      count: async (...args) => await prisma.tab.count(...args),
      create: async (...args) => await prisma.tab.create(...args),
      delete: async (...args) => await prisma.tab.delete(...args),
      deleteMany: async (...args) => await prisma.tab.deleteMany(...args),
      findFirst: async (...args) => await prisma.tab.findFirst(...args),
      findMany: async (...args) => await prisma.tab.findMany(...args),
      findUnique: async (...args) => await prisma.tab.findUnique(...args),
      update: async (...args) => await prisma.tab.update(...args),
      updateMany: async (...args) => await prisma.tab.updateMany(...args),
      upsert: async (...args) => await prisma.tab.upsert(...args),
    },
    request: {
      aggregate: async (...args) => await prisma.request.aggregate(...args),
      count: async (...args) => await prisma.request.count(...args),
      create: async (...args) => await prisma.request.create(...args),
      delete: async (...args) => await prisma.request.delete(...args),
      deleteMany: async (...args) => await prisma.request.deleteMany(...args),
      findFirst: async (...args) => await prisma.request.findFirst(...args),
      findMany: async (...args) => await prisma.request.findMany(...args),
      findUnique: async (...args) => await prisma.request.findUnique(...args),
      update: async (...args) => await prisma.request.update(...args),
      updateMany: async (...args) => await prisma.request.updateMany(...args),
      upsert: async (...args) => await prisma.request.upsert(...args),
    },
    workspace: {
      aggregate: async (...args) => await prisma.workspace.aggregate(...args),
      count: async (...args) => await prisma.workspace.count(...args),
      create: async (...args) => await prisma.workspace.create(...args),
      delete: async (...args) => await prisma.workspace.delete(...args),
      deleteMany: async (...args) => await prisma.workspace.deleteMany(...args),
      findFirst: async (...args) => await prisma.workspace.findFirst(...args),
      findMany: async (...args) => await prisma.workspace.findMany(...args),
      findUnique: async (...args) => await prisma.workspace.findUnique(...args),
      update: async (...args) => await prisma.workspace.update(...args),
      updateMany: async (...args) => await prisma.workspace.updateMany(...args),
      upsert: async (...args) => await prisma.workspace.upsert(...args),
    },
    response: {
      aggregate: async (...args) => await prisma.response.aggregate(...args),
      count: async (...args) => await prisma.response.count(...args),
      create: async (...args) => await prisma.response.create(...args),
      delete: async (...args) => await prisma.response.delete(...args),
      deleteMany: async (...args) => await prisma.response.deleteMany(...args),
      findFirst: async (...args) => await prisma.response.findFirst(...args),
      findMany: async (...args) => await prisma.response.findMany(...args),
      findUnique: async (...args) => await prisma.response.findUnique(...args),
      update: async (...args) => await prisma.response.update(...args),
      updateMany: async (...args) => await prisma.response.updateMany(...args),
      upsert: async (...args) => await prisma.response.upsert(...args),
    },
    settings: {
      aggregate: async (...args) => await prisma.settings.aggregate(...args),
      count: async (...args) => await prisma.settings.count(...args),
      create: async (...args) => await prisma.settings.create(...args),
      delete: async (...args) => await prisma.settings.delete(...args),
      deleteMany: async (...args) => await prisma.settings.deleteMany(...args),
      findFirst: async (...args) => await prisma.settings.findFirst(...args),
      findMany: async (...args) => await prisma.settings.findMany(...args),
      findUnique: async (...args) => await prisma.settings.findUnique(...args),
      update: async (...args) => await prisma.settings.update(...args),
      updateMany: async (...args) => await prisma.settings.updateMany(...args),
      upsert: async (...args) => await prisma.settings.upsert(...args),
    },
    collection: {
      aggregate: async (...args) => await prisma.collection.aggregate(...args),
      count: async (...args) => await prisma.collection.count(...args),
      create: async (...args) => await prisma.collection.create(...args),
      delete: async (...args) => await prisma.collection.delete(...args),
      deleteMany: async (...args) => await prisma.collection.deleteMany(...args),
      findFirst: async (...args) => await prisma.collection.findFirst(...args),
      findMany: async (...args) => await prisma.collection.findMany(...args),
      findUnique: async (...args) => await prisma.collection.findUnique(...args),
      update: async (...args) => await prisma.collection.update(...args),
      updateMany: async (...args) => await prisma.collection.updateMany(...args),
      upsert: async (...args) => await prisma.collection.upsert(...args),
    },
    path: {
      aggregate: async (...args) => await prisma.path.aggregate(...args),
      count: async (...args) => await prisma.path.count(...args),
      create: async (...args) => await prisma.path.create(...args),
      delete: async (...args) => await prisma.path.delete(...args),
      deleteMany: async (...args) => await prisma.path.deleteMany(...args),
      findFirst: async (...args) => await prisma.path.findFirst(...args),
      findMany: async (...args) => await prisma.path.findMany(...args),
      findUnique: async (...args) => await prisma.path.findUnique(...args),
      update: async (...args) => await prisma.path.update(...args),
      updateMany: async (...args) => await prisma.path.updateMany(...args),
      upsert: async (...args) => await prisma.path.upsert(...args),
    },
    $connect: async () => await prisma.$connect(),
    $disconnect: async () => await prisma.$disconnect(),
  } as typeof prisma,
});