import Axios from 'axios';
import React, { Component } from 'react';
import toast from 'react-hot-toast';
import CustomerVendorChat from './CustomerVendorChat';

class BookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booking:{},
            quotes:[],
            loading:true
        };
        console.log(props)
    }

    componentDidMount(){
        Axios.post('/api/get_booking_by_id',{id:this.props.match.params.id}).then(res=>{
            console.log(res);
            this.setState({
                booking:res.data.data,
                loading:false
            })
        })
        Axios.post('/api/get_vendor_quotes',{id:this.props.match.params.id}).then(res=>{
            console.log(res);
            this.setState({
                quotes:res.data.data,
            })
        })
    }
    accept_vendor_quote(id){
        Axios.post('/api/accept_vednor_request',{quote_id:id}).then(res=>{
            toast.success('Vendor Quote is Accepted');
            window.location.reload();
        })
    }
    render() {
        return (<div>
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
                                                {this.state.booking.service.residential_type == 1 ? <div className="card-content" id="faqhead1">
                                                    <h3>Booking Details</h3>
                                                    <h5> {this.state.booking.date}</h5>
                                                    <div className="divid-line" />
                                                    <div className="dt-table">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Services Type<br /><span>{this.state.booking.booking_type == 1 ? 'Residential Service' : 'Business Service' } 
                                                                        </span></li>
                                                                        <li>How Often<br /><span> {this.state.booking.booking_type == 1 ? 'One Time' : 'Recurring'} </span></li>
                                                                        <li>Bathrooms<br /><span> {this.state.booking.information.bathrooms} </span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Sub Service<br /><span>{this.state.booking.sub_service.name}</span></li>
                                                                        <li>Resident Type<br /><span>{this.state.booking.information.resident_type}</span></li>
                                                                        <li>Parking Available<br /><span>{this.state.booking.information.is_parking_available}</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Coming Date<br /><span>{this.state.booking.date}</span></li>
                                                                        <li>No of Levels<br /><span>{this.state.booking.information.levels}</span></li>
                                                                        <li>At Home<br /><span>{this.state.booking.information.will_be_at_home}</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Coming Time<br /><span>{this.state.booking.time}</span></li>
                                                                        <li>Bedrooms<br /><span>{this.state.booking.information.bedrooms}</span></li>
                                                                        <li>Status<br /><span>{this.state.booking.status == 0 ? "Pending" : "Acitve"}</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> 
                                                :   <div className="card-content" id="faqhead1">
                                                    <h3>Booking Details</h3>
                                                    <h5> {this.state.booking.date}</h5>
                                                    <div className="divid-line" />
                                                    <div className="dt-table">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Services Type<br /><span>{this.state.booking.service.residential_type == 0 ? 'Non-Residential Service' : 'Residential Service' } 
                                                                        </span></li>
                                                                        <li>How Often<br /><span> {this.state.booking.booking_type == 1 ? 'One Time' : 'Recurring'} </span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Parking Available<br /><span>{this.state.booking.information.is_parking_available}</span></li>
                                                                        <li>Bathrooms<br /><span> {this.state.booking.information.bathrooms} </span></li>
                                                                        {/* <li>Sub Service<br /><span>-----------</span></li> */}
                                                                        {/* <li>Resident Type<br /><span>{this.state.booking.information.resident_type}</span></li> */}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Coming Date<br /><span>{this.state.booking.date}</span></li>
                                                                        <li>No of Levels<br /><span>{this.state.booking.information.levels}</span></li>
                                                                        {/* <li>At Home<br /><span>{this.state.booking.information.will_be_at_home}</span></li> */}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Coming Time<br /><span>{this.state.booking.time}</span></li>
                                                                        {/* <li>Bedrooms<br /><span>{this.state.booking.information.bedrooms}</span></li> */}
                                                                        <li>Status<br /><span>{this.state.booking.status == 0 ? "Pending" : "Acitve"}</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> }
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
{/* vendor quotes section start                                */}
                                <div className="vendor-detail">
                                    <h3>Vendor Quotes</h3>
                                    {
                                        this.state.booking.service.residential_type == 0  && this.state.booking.vendor_status != 1 && this.state.quotes.length != 0 ?
                                        <div className="vendor-qote">
                                        <div className="divid-line" />
                                        
                                        {
                                            this.state.quotes.map((data,index)=>{
                                                return(
                                                    <div className="row col-md-12">
                                                        
                                                        <div className="col-md-2">
                                                            <div className="qote-img">
                                                                <img src="img/Worker-1.jpg" className="qote-thumb" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7">
                                                            <div className="qote-section">
                                                                <h2> {data.vendor.first_name} </h2>
                                                                <p> {data.vendor.company_name} </p>
                                                                <p> {data.vendor.address} </p>
                                                                <span className="fa fa-star checked-star" />
                                                                <span className="fa fa-star checked-star" />
                                                                <span className="fa fa-star checked-star" />
                                                                <span className="fa fa-star checked-star" />
                                                                <span className="fa fa-star" />
                                                                <span>{data.vendor.ratings}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                        <div className="qote-price">
                                                            <span> ${data.quote} </span>
                                                            <a onClick={this.accept_vendor_quote.bind(this,data.id)} className="bk-btn">Accept</a>
                                                        </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        
                                    </div>
                                    :
                                    <div className="detl-section">
                                        <div className="text-center">
                                        <p style={{color:'#000000a3' , fontSize:'20px'}}>No Quotes from Vendor</p>
                                        </div>
                                    </div>
                                    }
                                </div>
                            {/* vendor quote section end                           */}
                            <div className="vendor-detail">
                                <h3>Vendor Details</h3>
                                {
                                    this.state.booking.vendor_status == 1 
                                    ?
                                        <div className="detl-section">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <span>Vendor Name</span>
                                                    <p>{this.state.booking.vendor.first_name}</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <span>Business Type</span>
                                                    <p>{this.state.booking.vendor.company_name}</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <span>From</span>
                                                    <p>{this.state.booking.vendor.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    :
                                        <div className="detl-section">
                                            <div className="text-center">
                                            <p style={{color:'#000000a3' , fontSize:'20px'}}>Vendors has not quoted yet</p>
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
                                                                 <th>Service ID</th>
                                                                 <th>Date</th>
                                                                 <th>Time</th>
                                                                 <th>Round</th>
                                                                 <th>Price</th>
                                                                 <th>Payment Status</th>
                                                                 <th>Action</th>
                                                             </tr>
                                                         </thead>
                                                         <tbody>
                                                         {
                                                             this.state.booking.booking_services.map((data,index)=>{
                                                                 return(
                                                                    <tr>
                                                                        <td>#{data.id}</td>
                                                                        <td>{data.date}</td>
                                                                        <td>{data.time}</td>
                                                                        <td>{data.round}</td>
                                                                        <td>${data.total_price}</td>
                                                                        <td><span className={data.payment_status == 1 ? "paid-cls": "due-cls"}>{data.payment_status == 1 ? 'Paid' : 'Due Payment'}</span></td>
                                                                        <td><button onClick={()=>{window.open('/service-details/'+data.id,'_blank')}} className="btn btn-sm btn-outline-info">Details</button></td>
                                                                    </tr>
                                                                 )
                                                             })
                                                         }
                                                             
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
                            <div className="col-lg-12 sm-padding">
                                <div className="comments-area">
                                    <div className="comments-section">
                                        <h3 className="comments-title">Chat With Vendor</h3>
                                        {/* <div className="divid-line" /> */}
                                       
                                    
                                    </div>
                                  
                                    <CustomerVendorChat booking_id={this.props.match.params.id}></CustomerVendorChat>

                                </div>
                            </div>
                        </div>
                    </div>
                }
                </div>
            </section>
        </div>
        );
    }
}

export default BookingDetails;