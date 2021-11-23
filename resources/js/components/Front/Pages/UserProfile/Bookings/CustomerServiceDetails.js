import Axios from 'axios';
import React, { Component } from 'react';
import { img_baseurl } from '../../../../Configs/Api';
import Swal from 'sweetalert2';
import { data } from 'jquery';

class CustomerServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: {},
            loading: true,
            //beforeImages: [],
            //afterImages: [],
            serviceRounds: [],
            complaints: [],
            //checklists: [],
            vendor:'',
            error_string: '',
            div: 0,
            complain:'',
            checkBox: false,

        };
        console.log(props);
    }

    componentDidMount() {

        Axios.post('/api/service_details', { id: this.props.match.params.id }).then(res => {
            console.log(res);

            this.setState({
                booking: res.data.data,
                vendor: res.data.data.vendor_info,
                serviceRounds: res.data.serviceRounds,
                complaints: res.data.complaints,
                // beforeImages: res.data.serviceRounds.before_images ? JSON.parse(res.data.serviceRounds.before_images) : [],
                // afterImages: res.data.serviceRounds.after_images ? JSON.parse(res.data.serviceRounds.after_images) : [],
                // checklists: res.data.serviceRounds.check_list ? JSON.parse(res.data.serviceRounds.check_list) : [],
                loading: false
            })
        })
    }

    make_complain(val){
        this.setState({
            div:val
        })
    }

    cancel_complain(val){
        this.setState({
            div:val
        })
    }

    get_complain(e){
        this.setState({
            complain:e.target.value
        })
    }

    handleCheck(){
        this.setState({
            checkBox:!this.state.checkBox
        })
    }

    serviceCompleted(){
        let data = {
            service_id: this.props.match.params.id,
            vendor_id: this.state.vendor.id
        }

        Axios.post('/api/complete_service', data).then(res=>{
            if(res.data.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Service Is Completed,Thankyou for choosing TidyHome',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload();
                }else{
                    this.setState({
                        error_string:res.data.msg
                    })
                }
        })
    }

    submit_complain(e){
        e.preventDefault();
        let data = {
            id: this.props.match.params.id,
            complain:this.state.complain,
            checkBox:this.state.checkBox
        }
        Axios.post('/api/submit_complain', data).then(res=>{
            console.log(res);
            if(res.data.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Your Complaint is Submitted',
                    showConfirmButton: false,
                    timer: 1500
                })
                }else{
                    this.setState({
                        error_string:res.data.msg
                    })
                }
        })
    }

    render() {
        return (
            <div>
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
                                <div className="container">
                                    <div className="blog-wrap row">
                                        <div className="col-lg-12 sm-padding">
                                            <div className="blog-item profile-shadow">
                                                <div id="main" className="blog-item profile-shadow">
                                                    <div className="card ">
                                                        <div className="card-content" id="faqhead1">
                                                            <h3>Service Details</h3>
                                                            <h6> ${this.state.booking.total_price} </h6>

                                                            {
                                                                this.state.serviceRounds ? this.state.serviceRounds.map((data, index) => {
                                                                    return (
                                                                        <div className="dt-table">
                                                                            <div className="divid-line" />
                                                                            <h3>(Round - {data.round})</h3>
                                                                            <div className="row">
                                                                                <div className="col-md-3">
                                                                                    <div className="booking-content">
                                                                                        <ul>
                                                                                            <li>Vendor<br /><span>{this.state.vendor.first_name}</span></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <div className="booking-content">
                                                                                        <ul>
                                                                                            <li>Date<br /><span> {this.state.booking.date} </span></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <div className="booking-content">
                                                                                        <ul>
                                                                                            <li>Start Time<br /><span> {data.start_time} </span></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <div className="booking-content">
                                                                                        <ul>
                                                                                            <li>End Time<br /><span> {data.end_time} </span></li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-3">
                                                                                    <div className="booking-content">
                                                                                        <ul>
                                                                                            <li>Before Images</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-9">
                                                                                    <div className="booking-content before-image">
                                                                                        <ul>
                                                                                            {
                                                                                                data.before_images ? JSON.parse(data.before_images).map((data, index) => {
                                                                                                    return (
                                                                                                        <li key={index}><img src={img_baseurl + data} className="img-up-thumb" /></li>

                                                                                                    )
                                                                                                })
                                                                                                    : null
                                                                                            }
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-3">
                                                                                    <div className="booking-content">
                                                                                        <ul>
                                                                                            <li>After Images</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-9">
                                                                                    <div className="booking-content before-image">
                                                                                        <ul>
                                                                                            {
                                                                                                data.after_images ? JSON.parse(data.after_images).map((data, index) => {
                                                                                                    return (
                                                                                                        <li key={index}><img src={img_baseurl + data} className="img-up-thumb" /></li>
                                                                                                    )
                                                                                                })
                                                                                                    : null
                                                                                            }
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="divid-line" />
                                                                            <div className="row col-sm-12">
                                                                                {
                                                                                    this.state.booking.booking_information.resident_type == "House"
                                                                                        ?
                                                                                        <div className="col-md-12">
                                                                                            <h3>All areas of the house</h3>
                                                                                            <div className="divid-line" />
                                                                                            {
                                                                                                data.check_list ? JSON.parse(data.check_list).map((data, index) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            {
                                                                                                                data.type == 1 ?
                                                                                                                    <li style={{ listStyleType: 'none' }}><input type="checkbox" className="col-sm-1" checked={data.check_} /> {data.item} </li>
                                                                                                                    :
                                                                                                                    null
                                                                                                            }

                                                                                                        </>
                                                                                                    )
                                                                                                }) : null
                                                                                            }
                                                                                            <h3>Bathrooms</h3>
                                                                                            <div className="divid-line" />
                                                                                            {
                                                                                                data.check_list ? JSON.parse(data.check_list).map((data, index) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            {
                                                                                                                data.type == 2 ?
                                                                                                                    <li style={{ listStyleType: 'none' }}><input type="checkbox" className="col-sm-1" checked={data.check_} /> {data.item} </li>
                                                                                                                    :
                                                                                                                    null
                                                                                                            }

                                                                                                        </>
                                                                                                    )
                                                                                                }) : null
                                                                                            }
                                                                                            <h3>Kitchens</h3>
                                                                                            <div className="divid-line" />
                                                                                            {
                                                                                                data.check_list ? JSON.parse(data.check_list).map((data, index) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            {
                                                                                                                data.type == 3 ?
                                                                                                                    <li style={{ listStyleType: 'none' }}><input type="checkbox" className="col-sm-1" checked={data.check_} /> {data.item} </li>
                                                                                                                    :
                                                                                                                    null
                                                                                                            }

                                                                                                        </>
                                                                                                    )
                                                                                                }) : null
                                                                                            }
                                                                                            <h3>Bedrooms</h3>
                                                                                            <div className="divid-line" />
                                                                                            {
                                                                                                data.check_list ? JSON.parse(data.check_list).map((data, index) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            {
                                                                                                                data.type == 4 ?
                                                                                                                    <li style={{ listStyleType: 'none' }}><input type="checkbox" className="col-sm-1" checked={data.check_} /> {data.item} </li>
                                                                                                                    :
                                                                                                                    null
                                                                                                            }

                                                                                                        </>
                                                                                                    )
                                                                                                }) : null
                                                                                            }
                                                                                            <h3>Others</h3>
                                                                                            <div className="divid-line" />
                                                                                            {
                                                                                                data.check_list ? JSON.parse(data.check_list).map((data, index) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            {
                                                                                                                data.type == 5 ?
                                                                                                                    <li style={{ listStyleType: 'none' }}><input type="checkbox" className="col-sm-1" checked={data.check_} /> {data.item} </li>
                                                                                                                    :
                                                                                                                    null
                                                                                                            }

                                                                                                        </>
                                                                                                    )
                                                                                                })
                                                                                                    : null
                                                                                            }

                                                                                        </div>
                                                                                        :
                                                                                        null
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }) : null
                                                                
                                                            }
                                                            <div className="divid-line" />
                                                            {
                                                                this.state.complaints.length > 0 
                                                                ?
                                                                    <div className="row col-md-12 card-content" style={{marginLeft:"5px"}}>
                                                                        <h3>Previous Complaints</h3>
                                                                        {
                                                                            this.state.complaints.map((data,index)=>{
                                                                                return(
                                                                                    <div className="row col-md-12" style={{marginLeft:"20px"}} >
                                                                                        <li >{data.complaints}</li>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                :
                                                                    <div className="detl-section">
                                                                        <div className="text-center">
                                                                            <p style={{color:'#000000a3' , fontSize:'20px'}}>No Previous Complain For this Service</p>
                                                                        </div>
                                                                    </div>

                                                            }
                                                            {
                                                                this.state.div == 0
                                                                    ?
                                                                    <div className="row">
                                                                        <div className="divid-line" />
                                                                        <div className="col-md-12">
                                                                            <span>If You are Satisfied with the Job,Click AGREE</span><button style={{ cursor: 'pointer', marginLeft: '10px' }} className="btn btn-outline-success" onClick={this.serviceCompleted.bind(this)}>AGREE</button>

                                                                        </div>
                                                                        <div className="col-md-12">
                                                                            <span >If You have any complains for the Service</span><button onClick={this.make_complain.bind(this, 1)} style={{ cursor: 'pointer', marginLeft: '16px', marginTop: '5px' }} className="btn btn-outline-danger">Make A Complain</button>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                            {
                                                                this.state.div == 1
                                                                    ?
                                                                    <div className="row col-md-12">
                                                                        <div className="divid-line" />
                                                                        <h3>Complaint :</h3>
                                                                        <textarea style={{ marginTop: "10px" }} onChange={this.get_complain.bind(this)} className="col-md-12" placeholder="Write Your Complain Here"></textarea>
                                                                        <div className="col-sm-12" style={{ marginTop: "10px" }}><input className="col-sm-1" type="checkbox" defaultChecked={false} onClick={this.handleCheck.bind(this)}/><span>Ask Vendor To Re-Visit</span></div>
                                                                        <div className="col-sm-12">
                                                                            
                                                                            <div className="divid-line" />
                                                                            <h4><button style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={this.cancel_complain.bind(this, 0)} className="btn btn-outline-danger">Cancel</button></h4>
                                                                            <h4><button style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={this.submit_complain.bind(this)} className="btn btn-outline-primary">Submit</button></h4>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
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

export default CustomerServiceDetails;