import Axios from 'axios';
import { data } from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class BookingsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceBookings: [],
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
    }

    // handleAccept(bookingId) {
    //     let data ={
    //         vendor_id: this.props.vendor.data.vendor_id
    //     }
    //     Axios.post('/api/accept-booking', data ,bookingId).then(res=>{
    //         console.log(res);
    //         if(res.data.status == true){
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Booking Accepted',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //         } else {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: res.data.msg,
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //         }
    //     })
    // }

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
                                                    <h4><button  className="btn btn-outline-success ml-auto">Accept</button></h4>
                                                    :null   
                                                }
                                                {/* onClick={this.handleAccept.bind(this,data.id)}    */}
                                                <div className="divid-line"/>
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