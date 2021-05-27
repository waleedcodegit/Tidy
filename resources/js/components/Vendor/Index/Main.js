import React, { Component } from 'react';
import { Route } from 'react-router';
import DashBoard from '../Component/DashBoard/Dashboard';
import Profile from '../Component/Settings/Profile';

class Main extends Component {
    render() { 
        return (
            <div>
                <Route path='/vendor/profile' component={Profile}></Route>
                <Route path='/vendor/dashboard' component={DashBoard}></Route>
            </div>
        );
    }
}
 
export default Main;