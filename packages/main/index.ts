import { app, BrowserWindow, shell } from 'electron';
import MenuBuilder from './menu';
import path from 'path';
import { setup, listen, info } from './setup';
import { ensureUser } from './ensureUser';

setup();
info();

let win: BrowserWindow | null;

const createWindow = async () => {
  win = new BrowserWindow({
    show: false,
    width: 10000,
    height: 10000,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: '#191d23',
    frame: false,
    title: 'Restless',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: {
      x: 12,
      y: 12,
    },
    icon: path.join(__dirname, '../../resources/icon.icns'),
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, '../preload/index.cjs'),
      spellcheck: true,
    },
  });

  const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`;
  win.loadURL(url);

  win.on('ready-to-show', () => {
    if (!win) throw new Error('"window" is not defined');
    if (process.env.START_MINIMIZED) win.minimize();
    else win.show();
  });

  win.on('closed', () => ((win as any) = null));

  new MenuBuilder(win).buildMenu();

  // Open urls in the user's browser
  win.webContents.setWindowOpenHandler(edata => {
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
        if (win === null) createWindow();
      });
    }),
  )
  .catch(console.log);
