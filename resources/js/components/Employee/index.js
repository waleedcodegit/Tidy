import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import MainIndex from '../Vendor/Admin_Sidebar';
import {Route , BrowserRouter , Switch} from 'react-router-dom';
import '../Vendor/admin.css';
import EmpProfile from '../Employee/Components/Settings/Profile';
import EmpLogin from './Auth/EmpLogin';
import Empbookings from './Components/Bookings/Empbookings';

class Index extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div >
                <BrowserRouter>
                    <Route path="/employee/employee-login" component={EmpLogin}></Route>
                    <Route path="/vendor-employee/Empprofile" component={EmpProfile}></Route>
                    <Route path='/vendor-employee/Empbookings' component={Empbookings}></Route>
                </BrowserRouter>
            </div>
        );
    }
    
}

export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}
