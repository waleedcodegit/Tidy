import Axios from 'axios';
import React, { Component } from 'react';
import CustomerVendorChat from './CustomerVendorChat';
import {Link} from 'react-router-dom';


class Bookingdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booking:{},
            
            first_name:'',
            loading:true
        };
    }

    componentDidMount(){
        Axios.post('/api/get_booking_by_id',{id:this.props.match.params.id}).then(res=>{
            console.log(res);
            this.setState({
                booking:res.data.data,
                first_name:res.data.data.vendor.first_name,
                loading:false
            })
        })
    }
    render() {
        return (<div>
             <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading"></div>
            <section className="blog-section padding pr-sec">
                <div className="container">
                <div>
                    {/* <h1 className="text-center ">Booking Details</h1> */}
                </div>
                {
                    this.state.loading ?
                   
                        <div id="displayspinner text-center mt-5 " className="text-center" style={{ display: 'block', }}>
                            <div className="spinner-border  ml-2 text-dark spinner_format" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                    <div className="blog-wrap row">
                        <div className="col-lg-12 sm-padding">
                            <div className="row">
                                <div className="col-sm-12 padding-15">
                                    <div className="blog-item profile-shadow">
                                        <div id="main" className="blog-item profile-shadow">
                                            <div className="card ">
                                                <div className="card-content" id="faqhead1">
                                                    <h3>Booking Details</h3>
                                                    <h5> {this.state.booking.date}</h5>
                                                    <div className="divid-line" />
                                                    <div className="dt-table">
                                                        <div className="row">
                                                            
                                                         
                                                                <div className="booking-content">
                                                                <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                        <th>Services Type</th>
                                        <th>Sub Service</th>
                                        <th>Coming Date</th>
                                        <th>How Often</th>
                                        <th>Resident Type</th>
                                        <th>Coming Time</th>
                                        <th>No of Levels</th>
                                        <th>Parking Available</th>
                                        <th>At Home</th>
                                        <th>Status</th>
                                        <th colspan= "2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                                        <td>{this.state.booking.booking_type == 1 ? 'Residential Service' : 'Business Service' }</td>
                                                        <td>{this.state.booking.sub_service.name}</td>
                                                           <td>{this.state.booking.date}</td>
                                                           <td>{this.state.booking.booking_type == 1 ? 'One Time' : 'Recurring'}</td>
                                                               <td>{this.state.booking.information.resident_type}</td>
                                                               <td>{this.state.booking.time}</td>
                                                               <td>{this.state.booking.information.levels}</td>
                                                               <td>{this.state.booking.information.is_parking_available}</td>
                                                               <td>{this.state.booking.information.will_be_at_home}</td>
                                                               <td>{this.state.booking.status == 0 ? "Pending" : "Acitve"}</td>
                                        
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
                                </div>
                            </div>
                            {/* {
                                this.state.booking.service.residential_type == 0  && this.state.booking.vendor_status !=1 ?
                                <div className="vendor-qote">
                                <h3>Vendor Quotes</h3>
                                <div className="divid-line" />
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="qote-img">
                                            <img src="img/Worker-1.jpg" className="qote-thumb" />
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="qote-section">
                                            <h2>{this.state.booking.vendor.first_name}</h2>
                                            <p>Australia Cleaning Services Company</p>
                                            <p>98 Shirley Street PIMPAMA QLD 4209 AUSTRALIA</p>
                                            <span className="fa fa-star checked-star" />
                                            <span className="fa fa-star checked-star" />
                                            <span className="fa fa-star checked-star" />
                                            <span className="fa fa-star" />
                                            <span className="fa fa-star" />
                                            <span>4.9</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="qote-price">
                                            <span>$150.00</span>
                                            <a href="#" className="bk-btn">Accept</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                            } */}
                           
                            <div className="vendor-detail">
                                <h3>Vendor Details</h3>
                                {
                                    this.state.booking.vendor_status == 1 ?
                                    <div className="detl-section">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span>Vendor Name</span>
                                            <p>
                                                {
                                            this.state.booking.vendor.first_name == null? 'No Vendor Allocated': <>{this.state.booking.vendor.first_name}</>
                                            +' '+ this.state.booking.vendor.last_name == null? 'No Vendor Allocated':<>{this.state.booking.vendor.first_name}</>}</p>
                                        </div>
                                        <div className="col-md-3">
                                            <span>Phone</span>
                                            <p>{this.state.booking.vendor.phone}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <span>From</span>
                                            <p>{this.state.booking.vendor.address}</p>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="detl-section">
                                    <div className="text-center">
                                    <p style={{color:'#000000a3' , fontSize:'20px'}}>Vendor selection is in process. </p>
                                    </div>
                                </div>
                                }
                            </div>
                            <a href="#">
                            </a><div className="row"><a href="#">
                            </a><div className="col-sm-12 padding-15"><a href="#">
                            </a><div className="blog-item profile-shadow"><a href="#">
                            </a><div id="main" className="blog-item profile-shadow"><a href="#">
                            </a><div className="card "><a href="#">
                            </a><div className="card-content" id="faqhead1"><a href="#">
                                <h3>Services</h3>
                            </a>
                            {/* <a href="#" className="bk-btn">View Detail</a> */}
                                                    <div className="divid-line" />
                                                     {
                                                         this.state.booking.booking_services.length > 0 ? 
                                                         <table className="table table-hover table-light table-borderless">
                                                         <thead>
                                                             <tr>
                                                                 <th>Service Name</th>
                                                                 <th>Date</th>
                                                                 <th>Time</th>
                                                                 <th>Round</th>
                                                                 <th>Price</th>
                                                                 <th>Payment Status</th>
                                                                 {/* <th>Action</th> */}
                                                             </tr>
                                                         </thead>
                                                         <tbody>
                                                         
                                                                    <tr>
                                                                        <td>{this.state.booking.service.name}</td>
                                                                        <td>{this.state.booking.date}</td>
                                                                        <td>{this.state.booking.time}</td>
                                                                        <td>{this.state.booking.round}</td>
                                                                        <td>${this.state.booking.booking_totals}</td>
                                                                        <td><span className={this.state.booking.payment_status == 1 ? "paid-cls": "due-cls"}>{this.state.booking.payment_status == 1 ? 'Paid' : 'Due Payment'}</span></td>
                                                                        <td>
                                                              <Link to ={`/admin/service-details/${this.state.booking.service.id}`}> 
                                                            <button className="btn btn-success"> Details</button>
                                                            </Link> 
                                                            </td>
                                                                    </tr>
                                                           
                                                             
                                                         </tbody>
                                                     </table>
                                                     :
                                                     <div className="detl-section">
                                                        <div className="text-center">
                                                        <p style={{color:'#000000a3' , fontSize:'20px'}}>Services will be available here after completion of vendor process.</p>
                                                        </div>
                                                    </div>
                                                     }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/* <div className="col-lg-12 sm-padding">
                                <div className="comments-area">
                                    <div className="comments-section">
                                        <h3 className="comments-title">Chat With Vendor</h3>
                                         <div className="divid-line" /> 
                                       
                                    
                                    </div>
                                  
                                     <CustomerVendorChat booking_id={this.props.match.params.id}></CustomerVendorChat> 

                                </div>
                            </div>  */}
                        </div>
                    </div>
                }
                </div>
            </section>
            </div>
            </div>
        </div>
        );
    }
}

export default Bookingdetails;