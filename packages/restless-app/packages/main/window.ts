import { BrowserWindow, app } from 'electron';
import path from 'path';

export let mainWindow: BrowserWindow = null as unknown as BrowserWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
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
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload/index.cjs'),
      spellcheck: true,
    },
  });
});
