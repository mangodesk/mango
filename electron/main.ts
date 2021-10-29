import { app, BrowserWindow, ipcMain, MessageChannelMain } from 'electron'

let mainWindow: BrowserWindow | null
let threadWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string
declare const THREAD_WINDOW_WEBPACK_ENTRY: string
declare const THREAD_WINDOW_PRELOAD_WEBPACK_ENTRY: string

function createMainWindow () {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    show: true,
    width: 1300,
    height: 700,
    minWidth: 1300,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })
  
  mainWindow.webContents.openDevTools()

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createThreadWindow () {
  threadWindow = new BrowserWindow({
    show: false,
    width: 0,
    height: 0,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: THREAD_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })
  
  threadWindow.webContents.openDevTools({ mode: 'detach' });

  threadWindow.loadURL(THREAD_WINDOW_WEBPACK_ENTRY)

  // threadWindow.on('close', (e: Event) => {
  //   e.preventDefault();
  //   return false;
  // })

  threadWindow.on('closed', () => {
    threadWindow = null
  })
}

function appReady() {
  ipcMain.on('request-thread-channel', (event) => {
    if (!mainWindow || !threadWindow) return;

    if (event.senderFrame === mainWindow.webContents.mainFrame) {
      const { port1, port2 } = new MessageChannelMain()
      threadWindow.webContents.postMessage('new-client', null, [port1])
      event.senderFrame.postMessage('provide-thread-channel', null, [port2])

      mainWindow.show();
    }
  })
}

app.on('ready', () => {
  createThreadWindow();
  createMainWindow();
})
  .whenReady()
  .then(appReady)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})
