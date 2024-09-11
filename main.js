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

ipcMain.on('submit-tasks', async (e, opt) => {
  console.log('Received the following data from the renderer process:');
  console.log(opt);
  // fs.writeFileSync('todoList.txt', opt, { flag: 'a' });
  // console.log('Data written to the file');
});

// Listen for 'save-image' from renderer process
ipcMain.on('save-image', (event, { imageData, fileName }) => {
  // Strip off the data: URL prefix to get just the base64-encoded bytes
  const base64Data = imageData.replace(
    /^data:image\/(png|jpeg|jpg);base64,/,
    ''
  );

  // Define a path to save the file
  const savePath = path.join(app.getPath('pictures'), fileName);

  // Save the image to the Pictures folder
  fs.writeFile(savePath, base64Data, 'base64', (err) => {
    if (err) {
      console.error('Failed to save image', err);
    } else {
      console.log('Image saved successfully to', savePath);
    }
  });
});
