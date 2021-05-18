import React , {Component} from 'react'
import Index from './Container/Index';
import ReactDOM from 'react-dom';

import Login from './Auth/Login';
import CustomerSignUp from './Auth/CustomerSignUp';
import {Route , BrowserRouter ,Switch } from 'react-router-dom';
import './index.css' 
class App extends Component{
  render(){
    return (
      <div className="App">
          <BrowserRouter>
            <Route exact path="/" component={Index}></Route>
            <Route path="/services/:name?" component={Index}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/customer-signup" component={CustomerSignUp}></Route>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
