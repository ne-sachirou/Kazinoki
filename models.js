'use strict';

/**
 * @prop {String} name
 * @prop {Page[]} pages
 */
class Book {
  constructor() {
    this.name  = '';
    this.pages = [];
  }

  get primaryTag() {
    return this.pages[0].primaryTag;
  }
}

/**
 * @prop {Book}     book
 * @prop {Number}   no
 * @prop {String[]} tags
 */
class Page {
  constructor() {
    this.book = null;
    this.no   = 0;
    this.tags = [];
  }

  get primaryTag() {
    return this.tags[0];
  }
}

module.exports = {
  Book: Book,
  Page: Page,
};
