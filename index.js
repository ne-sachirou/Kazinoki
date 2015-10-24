'use strict';
var app           = require('app');
var BrowserWindow = require('browser-window');
var Kazinoki      = require('./kazinoki');

var window = null;

function onReady(app, kazinoki) {
  window = new BrowserWindow({width: 800, height: 600});
  window.loadUrl(`file://${__dirname}/browser.html`);
  window.on('closed', () => window = null);
}

require('crash-reporter').start();

app.on('window-all-closed', () => {
  if ('darwin' !== process.platform) {
    app.quit();
  }
});

Promise.all([
  new Promise((resolve) => app.on('ready', () => resolve(app))),
  new Kazinoki().init(),
]).
  then((values) => onReady.apply(null, values)).
  catch((err) => {
    console.error(err);
    app.quit();
  });
