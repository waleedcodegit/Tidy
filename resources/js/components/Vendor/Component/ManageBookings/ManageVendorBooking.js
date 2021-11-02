import Axios from 'axios';
import React, { Component } from 'react';

class VendorBookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booking:{},
            loading:true
        };
    }

    componentDidMount(){
        Axios.post('/api/get_booking_by_id',{id:this.props.match.params.id}).then(res=>{
            console.log(res);

            this.setState({
                booking:res.data,
                loading:false
            })
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
                                                                        <li>Bathrooms<br /><span> ---- </span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Sub Service<br /><span>{this.state.booking.sub_service.name}</span></li>
                                                                        <li>Resident Type<br /><span>---</span></li>
                                                                        <li>Parking Available<br /><span>----</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Coming Date<br /><span>{this.state.booking.date}</span></li>
                                                                        <li>No of Levels<br /><span>---</span></li>
                                                                        <li>At Home<br /><span>---</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Coming Time<br /><span>{this.state.booking.time}</span></li>
                                                                        <li>Bedrooms<br /><span>---</span></li>
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
                            <div className="vendor-detail">
                                <h3>Assign To Employee</h3>
                                <div className="detl-section">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <span>Vendor Name</span>
                                            <p>Jhon Smith</p>
                                        </div>
                                        <div className="col-md-3">
                                            <span>Job Type</span>
                                            <p>Company</p>
                                        </div>
                                        <div className="col-md-6">
                                            <span>From</span>
                                            <p>98 Shirley Street PIMPAMA QLD 4209 AUSTRALIA</p>
                                        </div>
                                    </div>
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

export default VendorBookingDetails;