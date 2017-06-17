//系统托盘

const path = require('path')
const electron = require('electron')
const Tray = electron.Tray
const Menu = electron.Menu
const app = electron.app

let appIcon = null

function contextMenu (){
	const iconName = process.platform === 'win32' ? '../src/icon/favicon@64.ico' : '../src/icon/favicon@64.ico'
	const iconPath = path.join(__dirname, iconName)
	appIcon = new Tray(iconPath)
	const contextMenu = Menu.buildFromTemplate([{
		label: '退出',
		click: function () {
		  app.quit();
		}
	}])
	appIcon.setToolTip('proxy')
	appIcon.setContextMenu(contextMenu)
}
app.on('ready', contextMenu)