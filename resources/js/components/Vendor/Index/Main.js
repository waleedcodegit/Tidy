import React, { Component } from 'react';
import { Route } from 'react-router';
import DashBoard from '../Component/DashBoard/Dashboard';
import Profile from '../Component/Settings/Profile';
import EmployeeList from '../Component/Employee/index';
import CreateEmployee from '../Component/Employee/create';
import EditEmployee from '../Component/Employee/edit';
import AdminMessages from '../Component/Messages/AdminMessages';
import CustomerMessages from '../Component/Messages/CustomerMessages';
import BookingsFeed from '../Component/ManageBookings/NewBookingsFeed';
import AcceptedBookings from '../Component/ManageBookings/AcceptedBookings';


class Main extends Component {
    render() { 
        return (
            <div>
                <Route path='/vendor/profile' component={Profile}></Route>
                <Route path='/vendor/dashboard' component={DashBoard}></Route>
                <Route path='/vendor/employee-list' component={EmployeeList}></Route>
                <Route path='/vendor/create-employee' component={CreateEmployee}></Route>
                <Route path='/vendor/edit-employee/:id' component={EditEmployee}></Route>
                <Route path='/vendor/message-admin' component={AdminMessages}></Route>
                <Route path='/vendor/customer-messages' component={CustomerMessages}></Route>
                <Route path='/vendor/bookings-feed' component={BookingsFeed}></Route>
                <Route path='/vendor/accepted-bookings' component={AcceptedBookings}></Route> 
                
            </div>
        );
    }
}
 
export default Main;