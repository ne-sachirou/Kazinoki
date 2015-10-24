var kazinoki = remote.require('./kazinoki').instance;

ReactDOM.render(
  <h1>{kazinoki.config.booksDir}</h1>,
  document.getElementById('main')
);
