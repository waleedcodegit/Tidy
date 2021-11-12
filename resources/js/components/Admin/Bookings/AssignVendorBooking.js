import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import { data } from 'jquery';

class AssignVendorBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            vendors: [],
            data:[],
            vendor_id:'',
            first_name:'',
            booking_id:this.props.match.params.id,
        }
    }

    componentDidMount() {
        Axios.post('/api/get-vendors').then(res => {
            if(res.data.status == 200) {
                console.log(res);
                this.setState({
                    bookings: res.data.data,
                    vendors: res.data.vendors
                })
            }
        });
    }
    AsignVendor(id) {
        let data = {
            id: this.props.match.params.id,
            vendor_id: id
        }
        Axios.post('/api/asign-vender-tocustomer',data).then(res=>{
            Swal.fire({
                icon: 'success',
                title: 'Successfully Vendor Assign',
                showConfirmButton: false,
                timer: 1500
            })
            this.componentDidMount();
        })
    }
    name(event) {
        let data = {
            first_name: event.target.value
        }
        Axios.post('/api/search_vendors',data).then(res=>{  
            this.setState({
                vendors:res.data.vendor
            })
        })
    }
  
    

    render() {
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Assign Vendor</h3>
                            </div>
                            <div className="panel-body">
                            
             <label htmlFor="search">Search By name </label>
       
         <input className="form-control" type="text"  placeholder="Search by name" name="name" onChange={this.name.bind(this)}
        />
        
 
         <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                        <th>Sr</th>
                                        <th>Vendor Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Ratings</th>
                                        <th>Status</th>
                                        <th colspan= "2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.vendors.map((data,index)=>{
                                                return(
                                                        <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.first_name+' '+data.last_name}{data.id}</td>
                                                           <td>{data.email}</td>
                                                           <td>{data.phone}</td>
                                                               <td>{data.address}</td>
                                                               <td>${data.status}</td>
                                                               <td>${data.ratings}</td>
                                                       
                                                        <td>
                                                              {/* <Link to ={`/admin/assign-vendor-to-customer/${data.id}`}>  */}
                                                            <button onClick={this.AsignVendor.bind(this, data.id)} className="btn btn-success">Assign Vendor</button>
                                                            {/* </Link>  */}
                                                            </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            this.state.vendors.length == 0 ? 
                                            <tr><td colSpan="7">No records founded</td></tr>:null
                                        }
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default AssignVendorBooking;

