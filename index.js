var app           = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

require('crash-reporter').start();

app.on('window-all-closed', () => {
  if ('darwin' !== process.platform) {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/browser.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
