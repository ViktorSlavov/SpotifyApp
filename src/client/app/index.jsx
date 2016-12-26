import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import { Router, browserHistory   } from 'react-router';
require ('../../../sass/main.scss');
import routes from './routes.jsx';

class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
      }
  }

  render() {
  }
}

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>

,document.getElementById('app'))

export default App;

