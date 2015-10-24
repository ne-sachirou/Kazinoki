'use strict';
var app           = require('app');
var BrowserWindow = require('browser-window');
var Config        = require('./config');

var mainWindow = null;

function onReady(app, config) {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/browser.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

require('crash-reporter').start();

app.on('window-all-closed', () => {
  if ('darwin' !== process.platform) {
    app.quit();
  }
});

Promise.all([
  new Promise((resolve) => app.on('ready', () => resolve(app))),
  new Config().load(),
]).
  then((values) => onReady.apply(null, values)).
  catch((err) => {
    console.error(err);
    app.quit();
  });
