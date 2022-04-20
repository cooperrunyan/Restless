import { BrowserWindow, app } from 'electron';
import path from 'path';
import { getAssetPath } from './util';

export let mainWindow: BrowserWindow = null as unknown as BrowserWindow;

app.whenReady().then(() => {
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
    trafficLightPosition: {
      x: 18,
      y: 18,
    },
    icon: getAssetPath('icon.icns'),
    webPreferences: {
      nodeIntegration: true,
      preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(__dirname, '../../.erb/dll/preload.js'),
      spellcheck: true,
    },
  });
});
