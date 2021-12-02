import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

class AllBookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            loading:false,
        }
    }

    componentDidMount() {
        Axios.post('/api/get_all_bookings', { headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res => {
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    bookings: res.data.bookings
                })
            }
        })
    }
    deleteCustomer(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-customer',data).then(res=>{
            Swal.fire({
                icon: 'success',
                title: 'Successfully Deleted',
                showConfirmButton: false,
                timer: 1500
            })
            this.componentDidMount();
        })
    }



    render() {
        const {loading} = this.state;
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">All Bookings</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>  
                                            <th>Customer Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Date</th>
                                            <th>Booking Totals</th>
                                            {/* <th>ratings</th> */}
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.bookings.map((data,index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.customer.first_name +' '+ data.customer.last_name}</td>
                                                        <td>{data.customer.email}</td>
                                                        <td>{data.customer.phone}</td>
                                                        <td>{data.customer.address}</td>
                                                        <td>{data.booking_totals}</td>
                                                        <td>{data.date}</td>
                                                        {/* <td>{data.vendor.ratings}</td> */}
                                                       
                                             <td>
                                                              <Link to ={`/admin/customer-bookings-details/${data.id}`}> 
                                                            <button className="btn btn-success" disabled={loading}> 
                                                            { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                                            { loading && <span > Loading...</span>}
                                                            { !loading && <span >Details</span>}
                                                            </button>
                                                             </Link> 
                                                            </td>
                                                        {/* <td> */}
                                                             {/* <button 
                                                         onClick={this.deleteCustomer.bind(this, data.id)} 
                                                        className="btn btn-danger">Reject</button> </td>  */}
                                                        
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

export default AllBookings;