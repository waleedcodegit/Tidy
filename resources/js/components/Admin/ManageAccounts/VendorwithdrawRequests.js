import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import { data } from 'jquery';
import toast from 'react-hot-toast';
import { Fastfood } from '@material-ui/icons';

class VendorwithdrawRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vendorwithdrawrequest: [],
            loading:false,
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


    accept_vendor_withraw_request(data){
        Axios.post('/api/accept_vendor_withdraw_request',{id:data.id}).then(res=>{
            if(res.data.status == 200){
                toast.success(res.data.message);
            }else{
                toast.error(res.data.message);
            }
        })
    }
    reject_vendor_withraw_request(id){
        this.setState({ loading : true});
        let data = {
            id: id
        }
        Axios.post('/api/reject_vendor_withdraw_request',data).then(res=>{
            if(res.data.status == 200){
                toast.success('Reject successfully');
            }else{
                toast.error(res.data.message);
            }
        })
        setTimeout(() => {
            this.setState({ loading : false});
          }, 2000);
    }
    render() {
        const {loading} = this.state;
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
                                                        <td>{data.status == 0 ? "Pending": data.status == 0 ? "Sucseed":"Rejected"}</td>
                                                        <td>{data.date}</td>
                                                        {
                                                             data.status == 0 ?
                                                             <td>
                                                             <button onClick={this.accept_vendor_withraw_request.bind(this,data)} className="btn btn-success"> Accept</button>
                                                             </td> : 
                                                             
                                                            data.status == 1 ?
                                                            <td colspan="2">
                                                            <span  className="btn btn-success">Accepted</span>
                                                            </td> :
                                                           data.status == 2 ?
                                                           <td colspan="2">
                                                           <span  className="btn btn-danger">Rejected</span>
                                                           </td> :
                                                           null
                                                            }
                                                          
                                                            

                                                           
                                                            <td>
                                                            {
                                                                 data.status == 0 ?
                                                                 <button  onClick={this.reject_vendor_withraw_request.bind(this, data.id)}  className="btn btn-danger">
                                                                      {/* { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                                                     { loading && <span > Loading...</span>}
                                                                    { !loading && <span >Reject</span>} */}
                                                                    Reject </button>
                                                                 :
                                                                 null
                                                            }
                                                            </td>
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