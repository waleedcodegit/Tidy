import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

class VendorwithdrawRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vendorwithdrawrequest: []
        }
    }

    componentDidMount() {
        Axios.post('/api/get_vendor_withdraw_requests', { headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res => {
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    vendorwithdrawrequest: res.data.vendorwithdrawrequest
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
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Vendor Withdraw Requests List</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Vendor Name</th>
                                            <th>Withdraw Amounts</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th colspan="2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.vendorwithdrawrequest.map((data,index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.vendorname.first_name +' '+ data.vendorname.last_name}</td>
                                                        <td>${data.withdraw_amount}</td>
                                                        <td>{data.status == 0 ? "Pending": "Sucseed"}</td>
                                                        <td>{data.date}</td>
                                                       
                                                        <td>
                                                             {/* <Link to ={`/admin/edit-customer/${data.id}`}> */}
                                                            <button className="btn btn-success"> Accept</button>
                                                            {/* </Link> */}
                                                            </td>
                                                        <td> <button 
                                                        // onClick={this.deleteCustomer.bind(this, data.id)} 
                                                        className="btn btn-danger">Reject</button> </td>
                                                        
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            this.state.vendorwithdrawrequest.length == 0 ? 
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

export default VendorwithdrawRequests;