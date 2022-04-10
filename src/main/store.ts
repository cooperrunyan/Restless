import { app } from 'electron';
import fs from 'fs';

export const store = {
  get() {
    app.getPath('home');
    if (!fs.existsSync(app.getPath('home') + '/.restless')) fs.mkdirSync(app.getPath('home') + '/.restless');

    if (!fs.existsSync(app.getPath('home') + '/.restless/storage.json'))
      fs.writeFileSync(app.getPath('home') + '/.restless/storage.json', JSON.stringify(defaultStorage));

    return JSON.parse(fs.readFileSync(app.getPath('home') + '/.restless/storage.json', 'utf-8'));
  },
  set(value: any) {
    if (!fs.existsSync(app.getPath('home') + '/.restless')) fs.mkdirSync(app.getPath('home') + '/.restless');

    if (!fs.existsSync(app.getPath('home') + '/.restless/storage.json'))
      fs.writeFileSync(app.getPath('home') + '/.restless/storage.json', JSON.stringify(defaultStorage));

    return fs.writeFileSync(app.getPath('home') + '/.restless/storage.json', JSON.stringify(value));
  },
};

const defaultStorage = {
  currentWorkspace: null,
  workspaces: [],
  settings: {
    zenmode: false,
  },
};
