import React, { Component } from 'react';
import { Route } from 'react-router';
import Empbookings from '../Components/Bookings/Empbookings';
import EmpProfile from '../Components/Settings/Profile';
import EmpDashBoard from '../Dashboard/EmpDashboard';
import EmployeeBookingDetails from '../Components/Bookings/ManageEmployeeBooking';


class Main extends Component {
    render() { 
        return (
            <div>
                <Route path='/vendor-employee/Empdashboard' component={EmpDashBoard}></Route>
                <Route path='/vendor-employee/Empprofile' component={EmpProfile}></Route>
                <Route path='/vendor-employee/Empbookings' component={Empbookings}></Route>
                <Route path='/vendor-employee/booking-details/:id' component={EmployeeBookingDetails}></Route>
            </div>
        );
    }
}
 
export default Main;