import { app, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import sqlite3 from 'sqlite3';
import { mainWindow } from './window';
import { setup, listen, info } from './setup';
import { ensureUser } from './ensureUser';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

new sqlite3.Database('./prisma/storage.db');

setup();
info();

const createWindow = async () => {
  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) throw new Error('"window" is not defined');
    if (process.env.START_MINIMIZED) mainWindow.minimize();
    else mainWindow.show();
  });

  mainWindow.on('closed', () => ((mainWindow as any) = null));

  new MenuBuilder(mainWindow).buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler(edata => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

app
  .whenReady()
  .then(() =>
    ensureUser().then(() => {
      createWindow();
      listen();
      app.on('activate', () => {
        if (mainWindow === null) createWindow();
      });
    }),
  )
  .catch(console.log);
