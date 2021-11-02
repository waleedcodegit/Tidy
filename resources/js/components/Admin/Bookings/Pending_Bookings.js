import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

class PendingBookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            vendors: []
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
        return(
            <div id="page-content">
                <div className="panel panel-info row">
                <h3 className="panel-title">Pending Bookings</h3>
                </div>
                
            <div className="row">
            
                <div className="panel panel-bordered panel-success">
                
                    <div className="panel ">
                            {
                            this.state.bookings.map((data)=>{
                                return(
                                    <div className="panel col-sm-12 ">
                                        <div className="col-sm-12">
                                            <div>
                                                <div className="panel-content col-sm-12" style={{display:'flex' , justifyContent:'space-between'}}>
                                                    <div className="panel-detail-left">
                                                        <ul className="list-unstyled" style={{fontSize:'15px'}}>
                                                            <li>Bookings Type</li>
                                                            <li>Service Name</li>
                                                            <li>Service Price</li>
                                                            <li>Status</li>
                                                            <li>Assign To Vendor</li>
                                                        </ul>
                                                    </div>
                                                    <div className="panel-detail-right">
                                                        <ul className="list-unstyled " style={{fontSize:'15px'}}>
                                                            <li>{data.booking_type == 1 ? "One Time" : "Recurring"}</li>
                                                            <li>{data.service.name}</li>
                                                            <li>${data.booking_totals}</li>
                                                            <li>{data.vendor_status == 5 ? "Pending" : "Invalid"}</li>
                                                            <li>
                                                            <select className="form-control" name="type">
                                                                {this.state.vendors.map((data,index)=>{
                                                                    return(
                                                                        <option>{data.first_name}</option>
                                                                        )
                                                                    }
                                                                )
                                                                }
                                                            </select>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                            </div>
                                )
                            })
                        }
                        </div>
                </div>
            </div>
        </div>
            
        );
    }
}

export default PendingBookings;

