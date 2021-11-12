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
import EmpDashBoard from '../../Employee/Dashboard/EmpDashboard';
import EmpProfile from '../../Employee/Components/Settings/Profile';
import VendorBookingDetails from '../Component/ManageBookings/ManageVendorBooking';
import Empbookings from '../../Employee/Components/Bookings/Empbookings';
import CreateQoute from '../Component/ManageBookings/CreateQoute';
import EditQoute from '../Component/ManageBookings/EditQuote';
import VendorWallet from '../Component/ManageAccounts/wallet';
import AddWithdraw from '../Component/ManageAccounts/Addwithdraw';
import MyPayments from '../Component/ManageAccounts/Mypaments';
import BookingDetails from '../Component/ManageBookings/BookingDetails';


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
                <Route path='/vendor-employee/Empdashboard' component={EmpDashBoard}></Route>
                <Route path='/vendor/create-quote/:id' component={CreateQoute}></Route>
                <Route path='/vendor/edit_quote/:id' component={EditQoute}></Route>
                <Route path='/vendor-employee/Empprofile' component={EmpProfile}></Route>
                <Route path='/vendor/vendor-booking-details/:id' component={VendorBookingDetails}></Route>
                <Route path='/vendor-employee/Empbookings' component={Empbookings}></Route>
                <Route path='/vendor/vendor_wallet' component={VendorWallet}></Route>
                <Route path='/vendor/add_withdraw' component={AddWithdraw}></Route>
                <Route path='/vendor/my_payments' component={MyPayments}></Route>
                <Route path='/vendor/booking-details/:id' component={BookingDetails}></Route>
                {/* <Route path='/vendor/booking-details/:id' component={BookingDetails}></Route> */}
                
            </div>
        );
    }
}
 
export default Main;