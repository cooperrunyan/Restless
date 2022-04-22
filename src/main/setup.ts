import * as channels from '../channels';
import { app, ipcMain, shell, screen, ipcRenderer } from 'electron';
import contextMenu from 'electron-context-menu';
import { mainWindow } from './window';

export function listen() {
  // IPC
  ipcMain.on(channels.OPEN_LINK, (e, link) => shell.openExternal(link));

  // Handle opening links
  mainWindow.webContents.setWindowOpenHandler(edata => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  if (process.platform !== 'darwin') app.on('window-all-closed', () => app.quit());
}

export function info() {
  app.setAboutPanelOptions({
    applicationName: 'Restless',
    applicationVersion: '0.0.0',
    authors: ['Cooper Runyan'],
    copyright: 'EPL-2.0',
    iconPath: '../../public/icon.icns',
  });

  app.setName('Restless');
}

export function setup() {
  if (process.env.NODE_ENV === 'production') require('source-map-support').install();
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') require('electron-debug')();
}
