var remote = require('remote');
var kazinoki = remote.require('./kazinoki').instance;

class App extends React.Component {
  render() {
    return (
      <p>{kazinoki.config.booksDir}</p>
    );
  }
};

ReactDOM.render(<App/>, document.getElementById('main'));
