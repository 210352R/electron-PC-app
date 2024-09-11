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

// Listen for 'save-image' from the renderer process
ipcMain.on('save-image', (event, { imageData, fileName }) => {
  try {
    // Check if the imageData is a valid base64 string
    if (!/^data:image\/(png|jpeg|jpg);base64,/.test(imageData)) {
      throw new Error(
        'Invalid image format. Expected a base64-encoded PNG or JPEG image.'
      );
    }

    // Strip off the data: URL prefix to get just the base64-encoded bytes
    const base64Data = imageData.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ''
    );

    // Define the path where the image will be saved
    const savePath = path.join(app.getPath('pictures'), fileName);

    // Try to save the image to the file system
    fs.writeFile(savePath, base64Data, 'base64', (err) => {
      if (err) {
        throw new Error(`Failed to save image: ${err.message}`);
      }
      console.log('Image saved successfully to', savePath);
    });
  } catch (error) {
    // Log the error to the console and notify the renderer process
    console.error('Error processing or saving image:', error);
    event.reply('save-image-error', error.message);
  }
});
