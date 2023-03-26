const { app, BrowserWindow, Menu, Tray, globalShortcut, screen, ipcMain, shell } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;
let searchBar;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
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

  //createSearchBar();
};

const createSearchBar = () => {
  searchBar = new BrowserWindow({
    width: 650,
    height: 50,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
    resizable: false,
  });

  searchBar.loadFile(path.join(__dirname, 'searchBar.html'));

  searchBar.webContents.openDevTools();

  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const x = Math.floor((width - searchBar.getSize()[0]) / 2)
  const y = 0
  searchBar.setPosition(x, y)

  searchBar.once('ready-to-show', () => {
    searchBar.show();
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// app.on('ready', createWindow);
app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+G', () => {
    mainWindow.show();
  })
}
).then(createWindow);

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
    {
      label: 'Chat',
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('goToChat', "");
      }
    },
    {
      label: 'Search',
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('goToSearch', "");
      }
    },
    {
      label: 'Show Search Bar',
      click: () => {
        searchBar.show();
        searchBar.focus();
      }
    },
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



// IPC: inter-process communication

ipcMain.on('open-url', (event, url) => {
  shell.openExternal(url);
});

ipcMain.on('close-searchBar', (event, val) => {
  searchBar.hide();
});


ipcMain.on('show-mainWin', (event, val) => {
  if (mainWindow.isVisible()) {
    return;
  }
  mainWindow.show();
});

ipcMain.on('chat', (event, message) => {
  let msg = message;
  BrowserWindow.getFocusedWindow().webContents.send('userMsg', msg);
});