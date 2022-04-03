/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import fs from 'fs';
import crypto from 'crypto';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const store = {
  get() {
    app.getPath('home');
    if (!fs.existsSync(app.getPath('home') + '/.restless'))
      fs.mkdirSync(app.getPath('home') + '/.restless');

    if (!fs.existsSync(app.getPath('home') + '/.restless/storage.json'))
      fs.writeFileSync(
        app.getPath('home') + '/.restless/storage.json',
        JSON.stringify({
          currentWorkspace: null,
          workspaces: [],
        })
      );

    return JSON.parse(
      fs.readFileSync(app.getPath('home') + '/.restless/storage.json', 'utf-8')
    );
  },
  set(value: any) {
    if (!fs.existsSync(app.getPath('home') + '/.restless'))
      fs.mkdirSync(app.getPath('home') + '/.restless');

    if (!fs.existsSync(app.getPath('home') + '/.restless/storage.json'))
      fs.writeFileSync(
        app.getPath('home') + '/.restless/storage.json',
        JSON.stringify({
          currentWorkspace: null,
          workspaces: [],
        })
      );

    return fs.writeFileSync(
      app.getPath('home') + '/.restless/storage.json',
      JSON.stringify(value)
    );
  },
};

// IPC listener
ipcMain.on('electron-store-get', (e) => {
  e.returnValue = store.get();
});
ipcMain.on('electron-store-set', (e, val) => {
  store.set(val);
  ipcMain.emit('electron-store-set-success');
});

ipcMain.on('electron-uuid', (e, val) => {
  e.returnValue = crypto.randomUUID();
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const createWindow = async () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 10000,
    height: 10000,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: '#000000',
    frame: false,
    title: 'Restless',
    titleBarStyle: 'hiddenInset',
    icon: getAssetPath('icon.icns'),
    webPreferences: {
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

app.setAboutPanelOptions({
  applicationName: 'Restless',
  applicationVersion: '0.0.0',
  authors: ['Cooper Runyan'],
  copyright: 'EPL-2.0',
  iconPath: '../../assets/icon.icns',
});

app.setName('Restless');

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
