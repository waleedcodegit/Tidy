import Axios from 'axios';
import { data } from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

class BookingsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceBookings: [],
            qoutes:[],
            vendor_id:this.props.vendor.data.vendor_id,
        };
    }

    componentDidMount(){
        Axios.post('/api/get_vendor_booking_requests',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
            {
                console.log(res);
                this.setState({
                    serviceBookings: res.data,
                    vendor_id:this.props.vendor.data.vendor_id
                })
                
        })
        // Axios.post('/api/get_vendor_qoutes',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
        //     {
        //         // console.log(res.data);
        //         this.setState({
        //             qoutes : res.data.qoutes,
        //             vendor_id:this.props.vendor.data.vendor_id
        //         })
        //     })
        
    }

    handleAccept(bookingId) {
        console.log(bookingId);
        let data ={
            vendor_id: this.props.vendor.data.vendor_id
        }
        Axios.post('/api/accept-booking', data ,bookingId).then(res=>{
            console.log(res);
            if(res.data.status == true){
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Accepted',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    render() {
        return (
            <div>
                <section className="section">
                    <div className="section-body">
                        <h2>Bookings Feed </h2>
                        <div className="row">
                            {
                            this.state.serviceBookings.map((data)=>{
                                return(
                                    <div className="card col-sm-12">
                                        <div className="col-sm-12">
                                            <div>
                                                <div className="card-content col-sm-12">
                                                <h3>{data.service.name}</h3>
                                            
                                                {
                                                    data.booking_information.resident_type == "House" ?
                                                
                                                   <>
                                                    {
                                                        data.service.residential_type == "1" ?
                                                        <h4><button onClick={this.handleAccept.bind(this,data.id)} className="btn btn-outline-success ml-auto">Accept</button></h4>
                                                    :
                                                    //  <h4><Link to={`/vendor/create-quote/${data.booking_id}`}><button  className="btn btn-outline-success ml-auto">Qoute</button></Link></h4>
                                                    // <>
                                                    // {
                                                         
                                                    //         this.state.qoutes.map((data)=>{
                                                    //             return(
                                                        data.vendor_qoute == null ?
                                                        <h4><Link to={`/vendor/create-quote/${data.booking_id}`}><button  className="btn btn-outline-success ml-auto">Qoute</button></Link></h4>
                                                        :
                                                        data.booking_id == data.vendor_qoute.booking_id ?
                                                        <>
                                                        
                                                       
                                                        <h4><Link to={`/vendor/edit_quote/${data.vendor_qoute.booking_id}`}><button  className="btn btn-outline-success ml-auto">Edit Quote</button></Link></h4>
                                                        
                                                    
                                                        </>
                                                        : null
                                                     
                                                     
                                                    }
                                                    </>
                                                    : null
                                                    
                                                      
                                                }
                                                {
                                                    data.service.residential_type == "0" ?
                                                     
                                                         
                                                        data.vendor_qoute == null ?
                                                      
                                                         <>
                                                        
                                                        <div className="divid-line"/>
                                                       <div className="card-detail-left">
                                                           <ul>
                                                               <li>Name:</li>
                                                              <li>Email:</li>
                                                              <li>Phone:</li>
                                                               <li>Booking Type: </li>
                                                               <li>Residential Type:</li>
                                                               <li>Address:</li>
                                                               <li>Date:</li>
                                                               <li>Time:</li>
                                                               <li>Service Name:</li>
                                                               <li>Qoute: </li>
                                                           </ul>
                                                       </div>
                                                       <div className="card-detail-right">
                                                           <ul>
                                                           <li>{data.customer.customer.first_name+ ' '+data.customer.customer.last_name}</li>
                                                           <li>{data.customer.customer.email}</li>
                                                           <li>{data.customer.customer.phone}</li>
                                                               <li>{data.booking_type == 1 ? "One Time" : "Recurring"}</li>
                                                               <li>{data.booking_information.resident_type}</li>
                                                               <li>{data.booking_information.location_address}</li>
                                                               <li>{data.booking.date}</li>
                                                               <li>{data.booking.time}</li>
                                                               {/* <li>${data.booking.time}</li> */}
                                                               <li>{data.service.name}</li>
                                                               <li>${data.booking.booking_totals}</li>
                                                           </ul>
                                                       </div>
                                                        </>
                                                        :
                                                        <>
                                                         <div className="divid-line"/>
                                                        <div className="card-detail-left">
                                                            <ul>
                                                            <li>Name:</li>
                                                              <li>Email:</li>
                                                              <li>Phone:</li>
                                                            <li>Booking Type: </li>
                                                               <li>Residential Type:</li>
                                                               <li>Address:</li>
                                                               <li>Date:</li>
                                                               <li>Time:</li>
                                                               <li>Service Name:</li>
                                                                <li>Qoute: </li>
                                                            </ul>
                                                        </div>
                                                        <div className="card-detail-right">
                                                            <ul>
                                                            <li>{data.customer.customer.first_name+ ' '+data.customer.customer.last_name}</li>
                                                           <li>{data.customer.customer.email}</li>
                                                           <li>{data.customer.customer.phone}</li>
                                                            <li>{data.booking_type == 1 ? "One Time" : "Recurring"}</li>
                                                            <li>{data.booking_information.resident_type}</li>
                                                               <li>{data.booking_information.location_address}</li>
                                                               <li>{data.booking.date}</li>
                                                               <li>{data.booking.time}</li>
                                                               <li>{data.service.name}</li>
                                                                <li>${data.vendor_qoute.quote}</li>
                                                            </ul>
                                                        </div>
                                                       </>
                                                    : 
                                                     <>
                                                    <div className="divid-line"/>
                                                   <div className="card-detail-left">
                                                       <ul>
                                                               <li>Name:</li>
                                                              <li>Email:</li>
                                                              <li>Phone:</li>
                                                             <li>Booking Type: </li>
                                                               <li>Residential Type:</li>
                                                               <li>Address:</li>
                                                               <li>Date:</li>
                                                               <li>Time:</li>
                                                               <li>Service Name:</li>
                                                           <li>Price:</li>
                                                       </ul>
                                                   </div>
                                                   <div className="card-detail-right">
                                                       <ul>
                                                           <li>{data.customer.customer.first_name+ ' '+data.customer.customer.last_name}</li>
                                                             <li>{data.customer.customer.email}</li>
                                                           <li>{data.customer.customer.phone}</li>
                                                            <li>{data.booking_type == 1 ? "One Time" : "Recurring"}</li>
                                                               <li>{data.booking_information.resident_type}</li>
                                                               <li>{data.booking_information.location_address}</li>
                                                               <li>{data.booking.date}</li>
                                                               <li>{data.booking.time}</li>
                                                               <li>${data.booking.time}</li>
                                                               <li>{data.service.name}</li>
                                                           <li>${data.booking.booking_totals}</li>
                                                       </ul>
                                                   </div>
                                                    </> 
                                                            }  
                                               
                                                
                                                {/* onClick={this.handleAccept.bind(this,data.id)}    */}
                                                {/* <div className="divid-line"/>
                                                    <div className="card-detail-left">
                                                        <ul>
                                                            <li>Booking Type: </li>
                                                            <li>Residential Type:</li>
                                                            <li>Price:</li>
                                                        </ul>
                                                    </div>
                                                    <div className="card-detail-right">
                                                        <ul>
                                                            <li>{data.booking_type == 1 ? "One Time" : "Recurring"}</li>
                                                            <li>{data.service.type}</li>
                                                            <li>${data.booking.booking_totals}</li>
                                                        </ul>
                                                    </div> */}
                                            </div>
                                            </div>
                                        </div>
                            </div>
                                )
                            })
                        }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        vendor:state.vendor
    }
}
export default connect(mapStateToProps)(BookingsFeed);