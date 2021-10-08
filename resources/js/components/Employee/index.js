import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import MainIndex from '../Vendor/Admin_Sidebar';
import {Route , BrowserRouter , Switch} from 'react-router-dom';
import '../Vendor/admin.css';
import EmpLogin from './Auth/EmpLogin';

class Index extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div >
                <BrowserRouter>
                    {/* <Route exact path="/vendor" component={MainIndex}></Route> */}
                    <Route path="/employee-login" component={EmpLogin}></Route>
                </BrowserRouter>
            </div>
        );
    }
    
}

export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}
