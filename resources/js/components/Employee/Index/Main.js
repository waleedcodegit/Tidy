import React, { Component } from 'react';
import { Route } from 'react-router';
import EmpProfile from '../Components/Settings/Profile';
import EmpDashBoard from '../Dashboard/EmpDashboard';


class Main extends Component {
    render() { 
        return (
            <div>
                <Route path='/vendor-employee/Empdashboard' component={EmpDashBoard}></Route>
                <Route path='/vendor-employee/Empprofile' component={EmpProfile}></Route>
            </div>
        );
    }
}
 
export default Main;