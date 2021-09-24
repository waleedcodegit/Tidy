import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import MainIndex from '../Vendor/Admin_Sidebar';
import {Route , BrowserRouter , Switch} from 'react-router-dom';
import Signup from '../Vendor/Auth/Signup';
import Login from '../Vendor/Auth/login';
import SignUpRequest from '../Vendor/Auth/SignUpRequest';
import Axios from 'axios';
import {StripeProvider} from 'react-stripe-elements';
import { STRIPE_PK } from '../Configs/Api';
import {Elements} from 'react-stripe-elements';
import '../Vendor/admin.css';
import VendorSignup from './Auth/VendorSignup';

class Index extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div >
                <BrowserRouter>
                    {/* <Route exact path="/vendor" component={MainIndex}></Route> */}
                    <Route path="/vendor-signup/:step?/:vendor_id?" component={Signup}></Route>
                    <Route path="/vendor-login" component={Login}></Route>
                    <Route exact path="/request-submitted" component={SignUpRequest}></Route>
                </BrowserRouter>
            </div>
        );
    }
    
}

export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}
