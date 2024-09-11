const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const { ipcMain } = require('electron/main');
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/build/index.html'),
    protocol: 'file',
  });

  mainWindow.loadURL(startUrl); // load the index.html file into the window

  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createMainWindow);

ipcMain.on('submit:todoForm', async (e, opt) => {
  console.log('Received the following data from the renderer process:');
  console.log(opt);
  // fs.writeFileSync('todoList.txt', opt, { flag: 'a' });
  // console.log('Data written to the file');
});
