var remote = require('remote');
var kazinoki = remote.require('./kazinoki').instance;

var App = React.createClass({
  render: function () {
    return (
      <p>{kazinoki.config.booksDir}</p>
    );
  },
});

ReactDOM.render(<App/>, document.getElementById('main'));
