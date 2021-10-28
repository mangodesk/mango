import { app, BrowserWindow, ipcMain, Event } from 'electron'

let mainWindow: BrowserWindow | null
let threadWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const THREAD_WINDOW_WEBPACK_ENTRY: string

function createMainWindow () {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1300,
    height: 700,
    minWidth: 1300,
    minHeight: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
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
      nodeIntegration: true,
      contextIsolation: true,
    },
  })
  
  threadWindow.webContents.openDevTools({ mode: 'detach' });

  threadWindow.loadURL(THREAD_WINDOW_WEBPACK_ENTRY)

  threadWindow.on('close', (e: Event) => {
    e.preventDefault();
    return false;
  })

  threadWindow.on('closed', () => {
    threadWindow = null
  })
}

async function registerListeners () {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })
}

app.on('ready', () => {
  createThreadWindow();
  createMainWindow();
})
  .whenReady()
  .then(registerListeners)
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
