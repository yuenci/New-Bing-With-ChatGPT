const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // hide window instead of close
  mainWindow.on('close', function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }

    return false;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


const isDevelopment = !app.isPackaged;
if (isDevelopment) {
  try {
    require('electron-reloader')(module);
  } catch (err) {
  }
}


// add tray menu
let tray = null
app.whenReady().then(() => {
  tray = new Tray("assets/chatGPT.png")
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1' },
    { label: 'Item2', },
    { label: 'Item3' },
    {
      label: 'Quit', click: () => {
        console.log("quit")
        // 尝试正常退出
        app.quit()
        // 如果正常退出不成功，尝试强制退出
        setTimeout(() => {
          app.exit()
        }, 500) // 等待 1 秒后强制退出
      }
    }
  ])
  tray.setToolTip('Copilot')
  tray.setContextMenu(contextMenu)

  // click tray icon to show window
  tray.on('click', () => {
    mainWindow.show();
  })
})


