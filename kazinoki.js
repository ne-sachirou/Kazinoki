'use strict';
var fs        = require('fs');
var mkdirp    = require('mkdirp');
var Db        = require('tingodb')().Db;
var Config    = require('./config');
var models    = require('./models');
var promisify = require('./promisify');

const Book = models.Book;
const Page = models.Page;

class Kazinoki {
  constructor() {
    if (Kazinoki.instance) {
      return Kazinoki.instance;
    }
    Kazinoki.instance = this;
    this._db    = null;
    this.config = new Config();
  }

  init() {
    return Promise.all([
      this.config.load().
        then(() => new Promise((resolve, reject) => {
          fs.stat(`${this.config.booksDir}/kazinoki.db`, (err, stats) => {
            if (err) {
              return this._initNewBooksDir().
                then(() => resolve()).
                catch((err) => reject(err));
            }
            this._db = new Db(`${this.config.booksDir}/kazinoki.db`, {});
            var collection = this._db.collection('documents');
            promisify(collection.findOne.bind(collection))({kazinoki: true}).
              then(() => resolve()).
              catch((err) => reject(err));
          });
        })),
    ]).then(() => this);
  }

  _initNewBooksDir() {
    return promisify(mkdirp)(`${this.config.booksDir}/kazinoki.db`).
      then(() => this._db = new Db(`${this.config.booksDir}/kazinoki.db`, {}));
  }
}

Kazinoki.instance = null;

module.exports = Kazinoki;
