import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class BookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booking:{},
            bookingdetails:{},
            information:{},
            loading:true,
            selected_employee:'',
            data:'',
            booking_type:'',
            booking_services:[],
            name:'',
            time:'',
            is_parking_available:'',
            levels:'',
            status:'',
            will_be_at_home:'',
            resident_type:'',
            bathrooms:"",
            bedrooms:'',
            residential_type:'',
        };
        console.log(props);
    }

    componentDidMount(){
        Axios.post('/api/get_ven_booking_by_id',{id:this.props.match.params.id,vendorId:this.props.vendor.data.vendor_id}).then(res=>{
            console.log(res);

            this.setState({
                booking:res.data.data,
                employees: res.data.employees,
                loading:false
            })
        })
        Axios.post('/api/get_vendor_booking_requests_details',{id:this.props.match.params.id}).then(res=>
            {
                console.log(res);
                this.setState({
                    date: res.data.bookingdetails.date,
                    vendor_id:this.props.vendor.data.vendor_id,
                    booking_type: res.data.bookingdetails.booking_type,
                    name: res.data.bookingdetails.sub_service.name,
                    time: res.data.bookingdetails.time,
                    bathrooms: res.data.bookingdetails.information.bathrooms,
                    bedrooms: res.data.bookingdetails.information.bedrooms,
                    is_parking_available: res.data.bookingdetails.information.is_parking_available,
                    levels: res.data.bookingdetails.information.levels,
                    status: res.data.bookingdetails.booking_services,
                    will_be_at_home: res.data.bookingdetails.information.will_be_at_home,
                    resident_type: res.data.bookingdetails.information.resident_type,
                    will_be_at_home: res.data.bookingdetails.information.will_be_at_home,
                    residential_type: res.data.bookingdetails.service.resident_type,
                })
                
        })
    
    }

  
    selected_employee(e){
        this.setState({
            selected_employee:e.target.value
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
                                                 <div className="card-content" id="faqhead1">
                                                    <h3>Booking Details</h3>
                                                    <h5> {this.state.date}</h5>
                                                    <div className="divid-line" />
                                                    <div className="dt-table">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Services Type<br /><span>{this.state.booking_type == 1 ? 'Residential Service' : 'Business Service' } 
                                                                        </span></li>
                                                                        <li>How Often<br /><span> {this.state.booking_type == 1 ? 'One Time' : 'Recurring'} </span></li>
                                                                        <li>Bathrooms<br /><span> {this.state.bathrooms}</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Sub Service<br /><span>{this.state.name}</span></li>
                                                                        <li>Resident Type<br /><span>{this.state.resident_type}</span></li>
                                                                        <li>Parking Available<br /><span>{this.state.is_parking_available}</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Coming Date<br /><span>{this.state.date}</span></li>
                                                                        <li>No of Levels<br /><span>{this.state.levels}</span></li>
                                                                        <li>At Home<br /><span>{this.state.will_be_at_home}</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Coming Time<br /><span>{this.state.time}</span></li>
                                                                        <li>Bedrooms<br /><span>{this.state.bedrooms}</span></li>
                                                                    </ul>
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
                           
                        </div>
                    </div>
                }
               
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
export default connect(mapStateToProps)(BookingDetails);