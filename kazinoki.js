'use strict';
var Config = require('./config');

class Kazinoki {
  constructor() {
    if (Kazinoki.instance) {
      return Kazinoki.instance;
    }
    Kazinoki.instance = this;
    this.config = new Config();
  }

  init() {
    return this.config.load().then(() => this);
  }
}

Kazinoki.instance = null;

module.exports = Kazinoki;
