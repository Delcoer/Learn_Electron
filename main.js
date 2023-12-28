const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong') // chanel-> ping listener
  createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

/*macOSS

In contrast, macOS apps generally continue running even without any windows open. 
Activating the app when no windows are available should open a new one.
*/

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

