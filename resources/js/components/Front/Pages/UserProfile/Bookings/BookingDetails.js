import Axios from 'axios';
import { data } from 'jquery';
import React, { Component } from 'react';
import toast from 'react-hot-toast';
import CustomerVendorChat from './CustomerVendorChat';
import {img_baseurl, MAP_PLACES_API_KEY} from '../../../../Configs/Api';

class BookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booking:{},
            quotes:[],
            loading:true,
            bookingExtras:[],
            Questions:[]
        };
        console.log(props)
    }

    componentDidMount(){
        Axios.post('/api/get_booking_by_id',{id:this.props.match.params.id}).then(res=>{
            console.log(res);
            this.setState({
                booking:res.data.data,
                bookingExtras: res.data.data.booking_extras ? JSON.parse(res.data.data.booking_extras) : [],
                Questions: res.data.data.information.questions ? JSON.parse(res.data.data.information.questions) : [],
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
        this.setState({ loading : true});
        Axios.post('/api/accept_vednor_request',{quote_id:id}).then(res=>{
            toast.success('Vendor Quote is Accepted');
            window.location.reload();
        })
        setTimeout(() => {
            this.setState({ loading : false});
          }, 2000);
    }
    render() {
        const {loading} = this.state;
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
                                                    <h3>Booking Extras</h3>
                                                    <h5>Extras Total Amount: ${this.state.booking.booking_extras_total}</h5>
                                                    <div className="divid-line" />
                                                        <table className="table table-hover table-light table-borderless">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{width:'250px'}}>Extra's Name</th>
                                                                    <th style={{width:'250px'}}>Price</th>
                                                                    <th style={{width:'250px'}}>Quantity</th>
                                                                    <th style={{width:'250px'}}>Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                this.state.bookingExtras.map((data)=>{
                                                                    return(
                                                                        <tr>
                                                                            <td>{data.title}</td>
                                                                            <td>{data.price}</td>
                                                                            <td>{data.quantity}</td>
                                                                            <td>{data.quantity*data.price}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                            </tbody>
                                                        </table>
                                                    <h3>Questions</h3>
                                                    <div className="divid-line" />
                                                        <table className="table table-hover table-light table-borderless">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{width:'400px'}}>Questions</th>
                                                                    <th>Answers</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.Questions.map((data)=>{
                                                                        return(
                                                                            <tr>
                                                                            <td style={{width:'400px'}}><li>{data.question}</li></td>
                                                                            <td><li>{data.answer}</li></td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                </div> }
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
{/* vendor quotes section start                                */}
                                <div className="vendor-detail">
                                    {
                                        this.state.booking.service.residential_type == 0  && this.state.booking.vendor_status != 1 && this.state.quotes.length != 0 ?
                                        <div className="card">
                                        <div className="detl-section">
                                            
                                        <div className="vendor-qote">
                                        <h3>Vendor Quotes</h3>
                                        <div className="divid-line" />
                                        {
                                            this.state.quotes.map((data,index)=>{
                                                return(
                                                    <div className="row col-md-12">
                                                        
                                                        <div className="col-md-2">
                                                            <div className="qote-img">
                                                            <img alt="image" src={img_baseurl + data.vendor.image} style={{width:'200px'}} className="rounded-circle author-box-picture" />
                                                                {/* <img src="img/Worker-1.jpg" className="qote-thumb" /> */}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7">
                                                            <div className="qote-section">
                                                                <h2>Vendor Name: {data.vendor.first_name} </h2>
                                                                <h2> Company Name: {data.vendor.company_name} </h2>
                                                                <h2> Address: {data.vendor.address} </h2>
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
                                                            <span style={{margin:"0px",fontSize:"35px" , color:"#28a745"}}>${data.quote} </span>
                                                            <a onClick={this.accept_vendor_quote.bind(this,data.id)} disabled={loading} className="btn bk-btn btn-success"> 
                                                                { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                                                { loading && <span > Loading...</span>}
                                                                { !loading && <span>Accept</span>}
                                                            </a>
                                                        </div>
                                                        </div>
                                                        <div className="divid-line" />
                                                    </div>
                                                )
                                            })
                                        }
                                        
                                    </div>
                                    </div>
                                    </div>
                                    :null
                                    // <div className="detl-section">
                                    //     <div className="text-center">
                                    //     <p style={{color:'#000000a3' , fontSize:'20px'}}>No Quotes from Vendor yet</p>
                                    //     </div>
                                    // </div>
                                    }
                                </div>
                            {/* vendor quote section end                           */}
                            <div className="vendor-detail">
                                
                                {
                                    this.state.booking.vendor_status == 1 
                                    ?
                                    
                                        <div className="detl-section">
                                            <h3>Vendor Details</h3>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <span>Vendor Name</span>
                                                    <p>{this.state.booking.vendor.first_name}</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <span>Business Name</span>
                                                    <p>{this.state.booking.vendor.company_name}</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <span>From</span>
                                                    <p>{this.state.booking.vendor.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    :null

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