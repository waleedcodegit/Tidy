import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

class PendingBookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            vendors: [],
            data:[],
        }
    }

    componentDidMount() {
        Axios.post('/api/get-pending-bookings').then(res => {
            if(res.data.status == true) {
                console.log(res);
                this.setState({
                    bookings: res.data.data,
                    vendors: res.data.vendors
                })
            }
        });
    }


    render() {
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Pending Requests</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                        <th>Sr</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Booking Type </th>
                                        <th>Residential Type</th>
                                        <th>Address</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Service Name</th>
                                        <th>Booking Totals</th>
                                        <th colspan= "2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.bookings.map((data,index)=>{
                                                return(
                                                        <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.customer.first_name+' '+data.customer.last_name}</td>
                                                           <td>{data.customer.email}</td>
                                                           <td>{data.customer.phone}</td>
                                                               <td>{data.booking_type == 1 ? "One Time" : "Recurring"}</td>
                                                               <td>{data.information.resident_type}</td>
                                                               <td>{data.information.location_address}</td>
                                                               <td>{data.date}</td>
                                                               <td>{data.time}</td>
                                                               <td>{data.service.name}</td>
                                                               <td>${data.booking_totals}</td>
                                                       
                                                        <td>
                                                              <Link to ={`/admin/assign-vendor/${data.id}`}> 
                                                            <button className="btn btn-success"> Assign Vendor</button>
                                                            </Link> 
                                                            </td>
                                                        <td> <button 
                                                        // onClick={this.deleteCustomer.bind(this, data.id)} 
                                                        className="btn btn-danger">Reject</button> </td>
                                                        
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            this.state.bookings.length == 0 ? 
                                            <tr><td colSpan="7">No records founded</td></tr>:null
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default PendingBookings;

