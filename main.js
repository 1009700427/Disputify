const electron = require('electron');
const { app, BrowserWindow, Menu } = electron; 

const path = require('path');
const url = require('url');

var mainWindow = null; 
var addWindow = null; 
const DEV_MODE = process.argv.includes('--dev');

// listen for the app to be ready 
app.on('ready', function(){
	// create new window 
	mainWindow = new BrowserWindow({width: 1024, height: 768});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, DEV_MODE ? './build/index.dev.html' : './build/index.html'),
		protocol: 'file:', 
		slashes: true
	}));
	// Quit all windows when close app
	mainWindow.on('close', function(){
		app.quit();
	});
	// Build menu from template 
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	// insert menu 
	Menu.setApplicationMenu(mainMenu);

	//console.log(Menu.setApplicationMenu(mainMenu));
	console.log(mainMenu);
});

// Handles createAddWindow() 
function createAddWindow(){
	// create add new window 
	addWindow = new BrowserWindow({width: 300, height: 200, title:'Add Shopping List Item'});
	addWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'addWindow.html'),
		protocol: 'file:', 
		slashes: true
	}));
	// garbage collection 
	addWindow.on('close', function(){
		addWindow = null; 
	});
}

// create menu template 
const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Add Item',
				click(){
					createAddWindow(); 
				}
			},
			{
				label: 'Clear Items'
			},
			{
				label: 'Quit',
				// mac 
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', 
				click(){
					app.quit();
				}
			}
		]
	}
];

// Checks for the platform and the menu compability 
// If Mac, add empty object to menu 
if(process.platform=='darwin'){
	// adds onto the beginning of the array 
	mainMenuTemplate.unshift({});
}

// add developer tools item if not in production 
if(process.env.NODE_ENV != 'production'){
	mainMenuTemplate.push({
		label: 'Developer Tools', 
		submenu: [
			{
				label: 'Toggle DevTools',
				accelerator: process.platform=='darwin' ? 'Command+II' : 'Ctrl+I',
				click(item, focusedWindow){
					focusedWindow.toggleDevTools(); 
				}
			},
			{
				role: 'reload'
			}
		]
	});
}