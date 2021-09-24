import Axios from 'axios';
import React, { Component } from 'react';
import CustomerVendorChat from './CustomerVendorChat';

class BookingDetails extends Component {
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
                    <h1 className="text-center ">Booking Details</h1>
                </div>
                {
                    this.state.loading ?
                        <div id="displayspinner text-center mt-5" style={{ display: 'block', }}>
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
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Services Type<br /><span>
                                                                            {this.state.booking.booking_type == 1 ? 'Residential Service' : 'Business Service' } 
                                                                        </span></li>
                                                                        <li>How Often<br /><span> 1</span></li>
                                                                        <li>Bathrooms<br /><span>5</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Sub Service<br /><span>House Cleaning</span></li>
                                                                        <li>Home<br /><span>House</span></li>
                                                                        <li>Parking Available<br /><span>yes</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Coming Date<br /><span>April 4, 2021</span></li>
                                                                        <li>No of Levels<br /><span>2</span></li>
                                                                        <li>At Home<br /><span>Yes</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="booking-content">
                                                                    <ul>
                                                                        <li>Coming Time<br /><span>11:00 - 11:50 am</span></li>
                                                                        <li>Bedrooms<br /><span>4</span></li>
                                                                        <li>Status<br /><span>Pending</span></li>
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
                                            <h2>Jhon Smith</h2>
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
                            <div className="vendor-detail">
                                <h3>Vendor Details</h3>
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
                            <a href="#">
                            </a><div className="row"><a href="#">
                            </a><div className="col-sm-12 padding-15"><a href="#">
                            </a><div className="blog-item profile-shadow"><a href="#">
                            </a><div id="main" className="blog-item profile-shadow"><a href="#">
                            </a><div className="card "><a href="#">
                            </a><div className="card-content" id="faqhead1"><a href="#">
                                <h3>Services</h3>
                            </a><a href="#" className="bk-btn">View Detail</a>
                                                    <div className="divid-line" />
                                                    <div className="dt-table">
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <div className="srv-content">
                                                                    <ul>
                                                                        <li>Jan 13, 2020<br /><span>Wednesday 10:00am-11:00am</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="srv-content">
                                                                    <ul>
                                                                        <li>Out Cleaning<br /><span>Duration 3.5 hours</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="srv-content">
                                                                    <ul>
                                                                        <li>Rosseta Jhonsan<br /><span>#125678</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="srv-content">
                                                                    <ul>
                                                                        <li>Weakly<br /><span>Only 1</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="srv-content">
                                                                    <ul>
                                                                        <li>Status<br /><span className="paid-cls">Paid</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="srv-content">
                                                                    <ul>
                                                                        <li>Price<br /><span>$120.00</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="divid-line" />
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <div className="srv-content">
                                                                    <ul>
                                                                        <li>Jan 13, 2020<br /><span>Wednesday 10:00am-11:00am</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="srv-content">
                                                                    <ul>
                                                                        <li>Out Cleaning<br /><span>Duration 3.5 hours</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="srv-content">
                                                                    <ul>
                                                                        <li>Rosseta Jhonsan<br /><span>#125678</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="srv-content">
                                                                    <ul>
                                                                        <li>Weakly<br /><span>10 Recruiting</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="srv-content">
                                                                    <ul>
                                                                        <li>Status<br /><span className="due-cls">Due Payment</span></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="srv-content">
                                                                    <ul>
                                                                        <li>Price<br /><span>$120.00</span></li>
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
                            <div className="col-lg-12 sm-padding">
                                <div className="comments-area">
                                    <div className="comments-section">
                                        <h3 className="comments-title">Chat With Vendor</h3>
                                        <div className="divid-line" />
                                        {/* <ol className="comments">
                                            <li className="comment even thread-even depth-1" id="comment-1">
                                                <div id="div-comment-1">
                                                    <div className="comment-main-area">
                                                        <div className="comment-wrapper">
                                                            <div className="comments-meta">
                                                                <h4>Jhon Castellon <span className="comments-date">jan 05, 2020 at 8:00</span></h4>
                                                            </div>
                                                            <div className="comment-area">
                                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul className="children">
                                                    <li className="comment">
                                                        <div>
                                                            <div className="comment-main-area">
                                                                <div className="comment-wrapper">
                                                                    <div className="comments-meta">
                                                                        <h4>José Carpio <span className="comments-date">jan 15, 2020 at 8:00</span></h4>
                                                                    </div>
                                                                    <div className="comment-area">
                                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ul>
                                                            <li className="comment">
                                                                <div>
                                                                    <div className="comment-main-area">
                                                                        <div className="comment-wrapper">
                                                                            <div className="comments-meta">
                                                                                <h4>Valentin Lacoste <span className="comments-date">jan 25, 2020 at 8:00</span></h4>
                                                                            </div>
                                                                            <div className="comment-area">
                                                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="comment">
                                                <div>
                                                    <div className="comment-main-area">
                                                        <div className="comment-wrapper">
                                                            <div className="comments-meta">
                                                                <h4>Kyle Frederick <span className="comments-date">jan 02, 2020 at 8:00</span></h4>
                                                            </div>
                                                            <div className="comment-area">
                                                                <p>Home renovations, especially those involving plentiful of demolition can be a very dusty affair. This nasty dust can easily free flow through your house.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ol> */}
                                    
                                    </div>
                                    {/* <div className="comment-respond">
                                        <form method="post" id="commentform" className="comment-form">
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <div className="form-inputs">
                                                        <input placeholder="Comment Here" type="email" />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <a href="#" className="bk-btn2">Send </a>
                                                </div>
                                            </div>
                                        </form>
                                    </div> */}
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