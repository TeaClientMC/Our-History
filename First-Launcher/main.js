// Imports 
const { BrowserWindow, Menu, app, ipcMain, dialog} = require('electron')
const path = require('path')
const os = require('os')
const config = require('./app/config/config.json')
const http = require('http');
const axios = require('axios');
const startLoginServer = require('./app/js/scripts/script-login/login-Java');

//===============================================================
// Window
function Createwindow() {
    const win = new BrowserWindow({
        height: 800, 
        width: 1300, 
        maximizable: false,
        titleBarStyle: 'customButtonsOnHover',
        icon: './app/assets/icon/Logo.png',
        title: "Teaclient",
        frame: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, './app/js/preload.js')
        }
    });
    win.loadFile('./app/html/index.html');
    win.fullScreenable = false;
    if (os.platform === 'win32' || os.platform === 'linux') {
        win.setMenu(null)
    }
    // To enable Developer console mode for launcher Uncomment below
    // win.openDevTools()
}

// Create an HTTP server

startLoginServer()

  
//===============================================================
// Ipc
    ipcMain.on('Start', () => {
        
        
    })


    ipcMain.on('switchProfile', (event, name) => {
        console.log(`Swapping profiles to ${name}`);
    });


    ipcMain.on('login', (event, name) => {
       
    })
//===============================================================
// Menu
    const template = ([
        {
            label: app.name,
            submenu: [
                {
                    label: 'Close',
                    click() {
                        app.quit()
                    }
                },
                {
                    label: 'Hide',
                    click() {
                        win.hide()
                    }
                },
                {
                    label: 'Show All',
                    click() {
                        win.show()
                    }
                },
                {
                    label: 'About',
                    click() {
                        dialog.showMessageBox({
                            message: 'Teaclient is a Minecraft Launcher made for all minecraft players',
                            title: 'About',
                            buttons: ['Close']
                        })
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'Cmd+Z',
                    role: 'undo'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+Cmd+Z',
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Cut',
                    accelerator: 'Cmd+X',
                    role: 'cut'
                },
                {
                    label: 'Copy',
                    accelerator: 'Cmd+C',
                    role: 'copy'
                },
                {
                    label: 'Paste',
                    accelerator: 'Cmd+V',
                    role: 'paste'
                },
                {
                    label: 'Select All',
                    accelerator: 'Cmd+A',
                    role: 'selectall'
                },
                {
                    type: 'separator'
                },
                {
                  label: 'Start Dictation',
                  accelerator: '🌐+D',
                  role: 'startDictation'
                },
                {
                    label: 'Emoji & Symbols',
                    accelerator: '🌐',
                    role: 'emojiandSymbols'
                }
            ]
        }
    ])

if (os.platform === 'darwin') {
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
}





// App
app.whenReady().then(() => {
console.log('Opening Launcher Now')
  Createwindow()
  server.listen(50505);
      })


app.on('activate' , () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        Createwindow()
    }
})


app.on('window-all-closed', () => {
    if (process.platform) {
        console.log('Closing Launcher Now')
        process.exit()
    }
  })


app.on('window-all-closed', () => {
    if (process.platform === 'darwin')
    console.log('Closing Launcher Now')
    app.quit()
  })
//===============================================================
