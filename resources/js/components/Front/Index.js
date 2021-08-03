import React , {Component} from 'react'
import Index from './Container/Index';
import ReactDOM from 'react-dom';
import Login from './Auth/Login';
import CustomerSignUp from './Auth/CustomerSignUp';
import {Route , BrowserRouter ,Switch } from 'react-router-dom';
import './index.css' 
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      paths:['/services/:name?','/login','/signup','/vendor-signup','/vendor-login'
      ,'/gift-card','/profile','/service/:slug'
    ]
    };
  }
   
  render(){
    return (
      <div className="front-app">
            <Route exact path="/" component={Index}></Route>
            {
              this.state.paths.map((data,index)=>{
                return(
                  <Route key={index} path={data} component={Index}></Route>
                )
              })
            }
          
      </div>
    );
  }
}

export default App;


