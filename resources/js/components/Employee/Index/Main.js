import React, { Component } from 'react';
import { Route } from 'react-router';
import EmpDashBoard from '../Dashboard/EmpDashboard';


class Main extends Component {
    render() { 
        return (
            <div>
                <Route path='/Empdashboard' component={EmpDashBoard}></Route>
            </div>
        );
    }
}
 
export default Main;