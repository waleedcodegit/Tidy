import React, { Component } from 'react';
import Axios from 'axios';
import {img_baseurl, img_insurance} from '../../Configs/Api'; 
import Swal from 'sweetalert2';
import { isNull } from 'lodash';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom';

class CustomersBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            address: '',
            australian_business_number: '',
            business_name: '',
            dob: '',
            email: '',
            first_name: '',
            last_name: '',
            insurance_certificate: '',
            insurance_certificate_type: '',
            phone: '',
            trading: '',
            type_of_business: '',
            company_name: '',
            expiry_date_ins: '',
            vendor_selected_services: [],
            services: [],
            vendor_docs: [],
            status: '',
            Customer_bookings_info: [],
            bookings: [],
            id:this.props.match.params.id
            
        }
    }

    componentDidMount() {
        Axios.post(`/api/customer-info/${this.props.match.params.id}`).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    id:res.data.data.id,
                    first_name: res.data.data.first_name,
                    last_name:res.data.data.last_name,
                    email:res.data.data.email,
                    address:res.data.data.address,
                    image:res.data.data.image,
                    phone: res.data.data.phone
                })
            }
        })
        Axios.post(`/api/customer-bookings-info/${this.props.match.params.id}`).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    Customer_bookings_info: res.data.data,
                })
            }
        })
        
       
    }

    deleteVendorSelectedServices(id) {
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        let data ={
            id: id
        }
        Axios.post(`/api/delete-vendor-selected-services/${id}`, data, Configs).then(res=>{
            this.componentDidMount();
        })
    }

    addVendorService(id) {
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        let data ={
            service_id: id,
            vendor_id: this.state.vendor_id,
        }
        Axios.post(`/api/add-vendor-service/${id}`, data, Configs).then(res=>{
            if(res.data.status == 200){
                toast.success('Vendor Approved Successfully',{position: "bottom-center"});
            this.componentDidMount();

            }else{
                toast.error('Service Already Exists',{position: "bottom-center"});
            }
        })
    }

    vendorApproved() {
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        let data ={
            id: this.props.match.params.id
        }
        Axios.post('/api/approved-vendor', data , Configs).then(res=>{
            if(res.data.status == 200){
                toast.success('Vendor Approved Successfully',{position: "bottom-center"});
                this.props.history.push('/admin/vendor-list');
            //     Swal.fire({
            //         icon: 'success',
            //         title: 'Vendor Approved Successfully',
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
            // } else {
            //     Swal.fire({
            //         icon: 'error',
            //         title: res.data.msg,
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
            }
        })
    }

    vendorDisApproved(){
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        let data ={
            id: this.props.match.params.id
        }
        Axios.post('/api/disapproved-vendor' , data ,Configs).then(res=>{
            console.log(res);
            if(res.data.status == 200){
                toast.success('Vendor DisApproved Successfully',{position: "bottom-center"});
                this.props.history.push('/admin/vendor-list');
            //     Swal.fire({
            //         icon: 'success',
            //         title: 'Vendor DisApproved Successfully',
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
            // }else{
            //     Swal.fire({
            //         icon: 'error',
            //         title: res.data.msg,
            //         showConfirmButton: false,
            //         timer: 1500
            //     })

            }
        })
    }

    render() {
        return (
            <div id="page-content">
                <div className="panel">
                    <div className="panel-body">
                        <div className="fixed-fluid">
                            <div className="fixed-md-250 pull-sm-left fixed-right-border">
                            <div className="text-center">
                                <div className="pad-ver">
                                    <img src={img_baseurl+this.state.image} className="img-lg img-circle" alt="Profile Picture" />
                                </div>
                                <h4 className="text-lg text-overflow mar-no">{this.state.first_name} {this.state.last_name}</h4>
                                <p className="text-sm text-muted">{this.state.business_name}</p>
                            </div>
                            <hr />
                                <p className="pad-ver text-main text-sm text-uppercase text-bold">About Me</p>
                                <p><a className="btn-link"><i className="demo-pli-internet icon-lg icon-fw" /> {this.state.email}</a></p>
                                <p><i className="demo-pli-old-telephone icon-lg icon-fw" />{this.state.phone}</p>
                                <div className="text-center">
                                <div className="pad-ver">
                                </div>
                                <div className="pad-ver">
                                </div>
                                <div className="pad-ver">
                                </div>
                                <div className="pad-ver">
                                </div>
                                <div className="pad-ver">
                                </div>
                                <Link to ={`/admin/edit-customer/${this.state.id}`}><button className="btn btn-primary" onClick={this.vendorApproved.bind(this)}>Edit Customer</button></Link>
                                   
                                <p className="text-sm text-muted"></p>
                            </div>
                            </div>
                            
                            <div className="fluid">
                            <div className="tab-base">
                                {/*Nav Tabs*/}
                                <ul className="nav nav-tabs">
                                    <li className="active">
                                        <a data-toggle="tab" href="#demo-lft-tab-1">About Me</a>
                                    </li>
                                    {/* <li>
                                        <a data-toggle="tab" href="#demo-lft-tab-2">Bussiness Info</a>
                                    </li> */}
                                    {/* <li>
                                        <a data-toggle="tab" href="#demo-lft-tab-3">Selected Services</a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#demo-lft-tab-4">Insurance Docs</a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#demo-lft-tab-5">Employees</a>
                                    </li> */}
                                    <li>
                                        <a data-toggle="tab" href="#demo-lft-tab-6">Customer Bookings</a>
                                    </li>
                                </ul>
                                    {/*Tabs Content*/}
                                    <div className="tab-content">
                                        <div id="demo-lft-tab-1" className="tab-pane fade active in">
                                            <p className="text-main text-semibold">Name</p>
                                            <p>{this.state.first_name} {this.state.last_name}</p>
                                            <p className="text-main text-semibold">Email</p>
                                            <p>{this.state.email}</p>
                                            <p className="text-main text-semibold">Phone</p>
                                            <p>{this.state.phone}</p>
                                            <p className="text-main text-semibold">Address</p>
                                            <p>{this.state.address}</p>
                                            {/* <p className="text-main text-semibold">Date Of Birth</p>
                                            <p>{this.state.dob}</p> */}
                                        </div>
                                        {/* <div id="demo-lft-tab-2" className="tab-pane fade">
                                            <p className="text-main text-semibold">Type Of Business</p>
                                            <p>{this.state.type_of_business}</p>
                                            <p className="text-main text-semibold">Business Name</p>
                                            <p>{this.state.business_name}</p>
                                            <p className="text-main text-semibold">Australian Business Number</p>
                                            <p>{this.state.australian_business_number}</p>
                                            {
                                                this.state.trading != null ?
                                                <div>
                                                    <p className="text-main text-semibold">Trading</p>
                                                    <p>{this.state.trading}</p> 
                                                </div>
                                                : 
                                                <div></div>
                                            }  
                                        </div> */}
                                        {/* <div id="demo-lft-tab-3" className="tab-pane fade">
                                            <p className="text-main text-semibold">Services</p>
                                            <table id="demo-dt-basic" className="table table-striped table-bordered" cellSpacing="0" width="100%">
                                                <thead>
                                                    <tr>
                                                        <th>Sr</th>
                                                        <th>Name</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.vendor_selected_services.map((data,index) =>{
                                                        return(
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{data.name}</td>
                                                                <td><button onClick={this.deleteVendorSelectedServices.bind(this, data.id)} className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                            <div className="panel-body demo-nifty-btn">
                                                {
                                                    this.state.services.map((data,index) =>{
                                                        return(
                                                            <button key={index} onClick={this.addVendorService.bind(this, data.id)}  className="btn btn-info btn-rounded">{data.name}</button>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div> */}
                                        {/* <div id="demo-lft-tab-4" className="tab-pane fade">
                                            {
                                                this.state.vendor_docs.map((data,index) =>{
                                                    return(
                                                        <div key={index}>
                                                            <p className="text-main text-semibold">{data.title}</p> 
                                                            <img src={img_insurance+data.document} />
                                                        </div>
                                                    )
                                                })
                                            }  
                                                                                    
                                        </div> */}
                                        {/* <div id="demo-lft-tab-5" className="tab-pane fade">
                                            <p className="text-main text-semibold">Employees</p>
                                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellSpacing="0" width="100%">
                                                    <thead>
                                                        <tr>
                                                            <th>Sr</th>
                                                            <th>Employees Name</th>
                                                            <th>User Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        this.state.employees.map((data,index) =>{
                                                            return(
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{data.name}</td>
                                                                    <td>{data.username}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                        </div> */}
                                        <div id="demo-lft-tab-6" className="tab-pane fade">
                                            <p className="text-main text-semibold">Customer Bookings</p>
                                            <table id="demo-dt-basic" className="table table-striped table-bordered" cellSpacing="0" width="100%">
                                                    <thead>
                                                        <tr>
                                                            <th>Sr</th>
                                                            <th>Bookings Type</th>
                                                            <th>Service Name</th>
                                                            <th>Vendor Name</th>
                                                            <th>Price</th>
                                                            <th>Booking Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                    this.state.Customer_bookings_info.map((data,index) =>{
                                                        return(
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{data.booking_type == 1 ? "One Time" : "Recurring"}</td>
                                                                <td>{data.service.name}</td>
                                                                <td>{data.vendor.first_name+' '+data.vendor.last_name}</td>
                                                                <td>${data.booking_totals}</td>
                                                                <td><Link to ={`/admin/customer-bookings-details/${data.id}`}>
                                                                    <button className="btn btn-outline-success"> <i  className="fa fa-eye"> </i></button></Link>
                                                                    </td>
                                                            </tr>
                                                        )
                                                    })
                                                    }
                                                    </tbody>
                                                </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>

        );
    }
}

export default CustomersBookings;