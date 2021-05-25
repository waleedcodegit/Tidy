import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Switch,BrowserRouter,Route} from 'react-router-dom';
import Admin_Login from './Admin/Login/Login'; 
import AdminIndex from './Admin/index';
import FrontIndex from './Front/Index';
import VendorIndex from './Vendor/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './Redux/reducer';

const store = createStore(reducer);
class Index extends Component{ 
    render(){
        return (
            <BrowserRouter>
                <div id="main-div">
                    <Route exact path="/"  component={FrontIndex}/>
                    <Route exact path="/signup"  component={FrontIndex}/>
                    <Route exact path="/login"  component={FrontIndex}/>
                    <Route exact path="/admin-login" component={Admin_Login} />
                    <Route path="/admin"  component={AdminIndex}/>
                    <Route path="/vendor"  component={VendorIndex}/>
                    <Route path="/vendor-signup"  component={FrontIndex}/>
                    <Route path="/vendor-login"  component={FrontIndex}/>
                </div>
            </BrowserRouter>
        );
    }
}
export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Provider store={store}> <Index /></Provider>, document.getElementById('root'));
}