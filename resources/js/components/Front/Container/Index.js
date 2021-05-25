import React, { Component } from 'react';
import Navbar from '../Navigation/Navbar2';
import Footer from '../LandingComponents/Footer';
import Landing from '../LandingComponents/Index';
import Login from '../Auth/Login';
import Signup from '../Auth/CustomerSignUp'
import { Switch,BrowserRouter,Route} from 'react-router-dom';
import TopHeader from '../LandingComponents/TopHeader';
import VendorSignUp from '../../Vendor/Auth/Signup';
import VendorLogin from '../../Vendor/Auth/login';

import '../index.css'
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log('Container-iNDEX');
    }
     
    render() { 
        return (
            <div>
                
                {/* <Route path="/" component={TopHeader}></Route> */}
                <Navbar  {...this.props}></Navbar>
                <Route exact path="/" component={Landing}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route path="/services/:name?" component={Landing}></Route>
                <Route exact path="/vendor-signup" component={VendorSignUp}></Route>
                <Route exact path="/vendor-login" component={VendorLogin}></Route>
                <Footer></Footer>

            </div>
        );
    }
}
 
export default Index;   	