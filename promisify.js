function promisify(func) {
  'use strict';
  return function (/*...args*/) {
    var args = Array.from(arguments);
    var me   = this;
    return new Promise((resolve, reject) => {
      function done(/*err, ...args*/) {
        var err  = arguments[0];
        var args = Array.from(arguments).slice(1);
        if (err) {
          return reject(err);
        }
        resolve.apply(me, args);
      }

      args.push(done);
      func.apply(me, args);
    });
  };
}

module.exports = promisify;
