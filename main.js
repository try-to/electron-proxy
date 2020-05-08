const electron = require('electron');

// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const ipcMain = electron.ipcMain;

const {dialog} = require('electron')


const setupEvents = require('./proxy/setupEvents');


const CrawlService = require('./proxy/crawlService');

const appIcon = require('./proxy/appIcon');

//url协议,用于地址打开
// app.setAsDefaultProtocolClient('wj-proxy')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 500, height: 600, transparent: false,resizable:false,icon: './src/icon/favicon@32.ico'})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'html/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})


//服务停止按钮
ipcMain.on('stop', function (event, arg) {
  const options = {
    type: 'info',
    title: '提示',
    message: '你确定要停止服务吗？',
    buttons: ['确定', '取消']
  }
  dialog.showMessageBox(options, function (index) {
    if (index === 0){
      mainWindow.reload();//重载
    }else{

    }
  });
})
