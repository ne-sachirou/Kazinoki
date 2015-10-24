'use strict';
var fs = require('fs');

module.exports = class Config {
  constructor() {
    this.booksDir = '';
  }

  load() {
    return new Promise((resolve, reject) => {
      fs.readFile(`${__dirname}/Kazinoki.json`, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        var config = JSON.parse(data);
        this.booksDir = config.booksDir;
        resolve(this);
      });
    });
  }
}
