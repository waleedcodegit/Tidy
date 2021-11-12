import Axios from 'axios';
import React, { Component } from 'react';
import { img_baseurl } from '../../../../Configs/Api';
import Swal from 'sweetalert2';

class CustomerServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: {},
            loading: true,
            beforeImages: [],
            afterImages: [],
            serviceRounds: {},
            checklists: [],
            vendor:'',
            error_string: '',
            div: 0,
            complain:'',

        };
        console.log(this.state.booking);
    }

    componentDidMount() {

        Axios.post('/api/service_details', { id: this.props.match.params.id }).then(res => {
            console.log(res);

            this.setState({
                booking: res.data.data,
                vendor: res.data.data.vendor_info,
                serviceRounds: res.data.serviceRounds,
                beforeImages: res.data.serviceRounds.before_images ? JSON.parse(res.data.serviceRounds.before_images) : [],
                afterImages: res.data.serviceRounds.after_images ? JSON.parse(res.data.serviceRounds.after_images) : [],
                checklists: res.data.serviceRounds.check_list ? JSON.parse(res.data.serviceRounds.check_list) : [],
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

    submit_complain(e){
        e.preventDefault();
        let data = {
            id: this.props.match.params.id,
            complain:this.state.complain,
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
                            <div className="container">
                                <div className="blog-wrap row">
                                    <div className="col-lg-12 sm-padding">
                                        <div className="blog-item profile-shadow">
                                            <div id="main" className="blog-item profile-shadow">
                                                <div className="card ">
                                                    <div className="card-content" id="faqhead1">
                                                        <h3>Service Details</h3>
                                                        <h6> ${this.state.booking.total_price} </h6>
                                                        <div className="divid-line" />
                                                        <div className="dt-table">
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <div className="booking-content">
                                                                        <ul>
                                                                            {/* need to show vendor ID after completing the process */}
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
                                                                            <li>Start Time<br /><span> {this.state.serviceRounds.start_time} </span></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="booking-content">
                                                                        <ul>
                                                                            <li>End Time<br /><span> {this.state.serviceRounds.end_time} </span></li>
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
                                                                                this.state.beforeImages.map((data,index)=>{
                                                                                    return(
                                                                                    <li key={index}><img src={img_baseurl+data} className="img-up-thumb" /></li>

                                                                                    )
                                                                                })
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
                                                                                this.state.afterImages.map((data,index)=>{
                                                                                    return(
                                                                                    <li key={index}><img src={img_baseurl+data} className="img-up-thumb" /></li>
                                                                                    )
                                                                                })
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
                                                                            this.state.checklists.map((data,index)=>{
                                                                                return(
                                                                                    <>
                                                                                    {
                                                                                        data.type == 1 ?
                                                                                        <li style={{listStyleType:'none'}}><input type="checkbox" className="col-sm-1" checked={data.check_} /> {data.item} </li> 
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                    
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                        <h3>Bathrooms</h3>
                                                                        <div className="divid-line" />
                                                                        {
                                                                            this.state.checklists.map((data,index)=>{
                                                                                return(
                                                                                    <>
                                                                                    {
                                                                                        data.type == 2 ?
                                                                                        <li style={{listStyleType:'none'}}><input type="checkbox" className="col-sm-1" checked={data.check_} /> {data.item} </li> 
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                    
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                        <h3>Kitchens</h3>
                                                                        <div className="divid-line" />
                                                                        {
                                                                            this.state.checklists.map((data,index)=>{
                                                                                return(
                                                                                    <>
                                                                                    {
                                                                                        data.type == 3 ?
                                                                                        <li style={{listStyleType:'none'}}><input type="checkbox" className="col-sm-1" checked={data.check_} /> {data.item} </li> 
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                    
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                        <h3>Bedrooms</h3>
                                                                        <div className="divid-line" />
                                                                        {
                                                                            this.state.checklists.map((data,index)=>{
                                                                                return(
                                                                                    <>
                                                                                    {
                                                                                        data.type == 4 ?
                                                                                        <li style={{listStyleType:'none'}}><input type="checkbox" className="col-sm-1" checked={data.check_} /> {data.item} </li> 
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                    
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                        <h3>Others</h3>
                                                                        <div className="divid-line" />
                                                                        {
                                                                            this.state.checklists.map((data,index)=>{
                                                                                return(
                                                                                    <>
                                                                                    {
                                                                                        data.type == 5 ?
                                                                                        <li style={{listStyleType:'none'}}><input type="checkbox" className="col-sm-1" checked={data.check_} /> {data.item} </li> 
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                    
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }

                                                                    </div>
                                                                :
                                                                    null
                                                                }
                                                            </div>
                                                            
                                                            {
                                                                this.state.div == 0 
                                                                ?
                                                                <div className="row">
                                                                <div className="divid-line" />
                                                                <div className="col-md-12">
                                                                    <span>If You are Satisfied with the Job,Click AGREE</span><button style={{ cursor: 'pointer' , marginLeft:'10px'}} className="btn btn-outline-success">AGREE</button>
                                                                    
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <span >If You have any complains for the Service,Click here</span><button onClick={this.make_complain.bind(this,1)} style={{ cursor: 'pointer' , marginLeft:'10px' ,marginTop:'5px' }} className="btn btn-outline-danger">Make A Complain</button>
                                                                </div>
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                            
                                                            <div className="divid-line" />
                                                            {
                                                                this.state.div == 1 
                                                                ?
                                                                <div className="row col-md-12">
                                                                    <textarea onChange={this.get_complain.bind(this)} className="col-md-12"></textarea>
                                                                    <div className="col-sm-12">
                                                                    <div className="divid-line" />
                                                                    <h4><button style={{ cursor: 'pointer' , marginLeft:'10px'}} onClick={this.cancel_complain.bind(this,0)} className="btn btn-outline-danger">Cancel</button></h4>
                                                                    <h4><button style={{ cursor: 'pointer' , marginLeft:'10px'}} onClick={this.submit_complain.bind(this)} className="btn btn-outline-primary">Submit</button></h4>
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
                            </div>
                    }
                </div>
            </section>
        </div>
        );
    }
}

export default CustomerServiceDetails;