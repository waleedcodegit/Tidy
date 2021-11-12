import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { img_baseurl } from '../../../Configs/Api';

class ServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: {},
            loading: true,
            beforeImages: [],
            afterImages: [],
            serviceRounds: {},
            checklists:[],
            error_string: ''

        };
        console.log(this.state.booking);
    }

    componentDidMount() {

        Axios.post('/api/service_details', { id: this.props.match.params.id }).then(res => {
            console.log(res);

            this.setState({
                booking: res.data.data,
                serviceRounds: res.data.serviceRounds,
                beforeImages: res.data.serviceRounds.before_images ? JSON.parse(res.data.serviceRounds.before_images) : [],
                afterImages: res.data.serviceRounds.after_images ? JSON.parse(res.data.serviceRounds.after_images) : [],
                loading: false
            })
        })
        Axios.post('/api/get_checklists').then(res=>{
            console.log(res);
            this.setState({
                checklists: res.data.data,
            })
        })
    }

    startService() {
        Axios.post('/api/start_service', { id: this.state.serviceRounds.id }).then(res => {
            if (res.data.status == 200) {
                this.props.history.push('/vendor-employee/booking-details/{id}');
                Swal.fire({
                    icon: 'success',
                    title: 'Service Started Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                this.setState({
                    error_string: res.data.msg
                })
            }
        })
    }

    endService() {
        Axios.post('/api/end_service', { id: this.state.serviceRounds.id }).then(res => {
            if (res.data.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Service Ended Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                this.setState({
                    error_string: res.data.msg
                })
            }
        })
    }

    getImage(type, event) {

        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('token', window.localStorage.getItem('al'));
        formData.append('service_id', this.state.serviceRounds.service_id);
        formData.append('type', type);

        let Configs = {
            headers: {
                token: window.localStorage.getItem('et'),
                'content-type': false,
                'mime-type': "multipart/form-data",
            },
            onUploadProgress: progressEvent => {
                this.setState({
                    btn2_prg: Math.round((progressEvent.loaded * 100) / progressEvent.total)
                })
            }
        }
        this.setState({
            loading: true,
        })

        Axios.post('/api/upload_service_images', formData, Configs).then(res => {

            if (res.data.status == 200) {
                toast.success('Image Uploaded');
                this.setState({
                    beforeImages: res.data.serviceRounds.before_images ? JSON.parse(res.data.serviceRounds.before_images) : [],
                    afterImages: res.data.serviceRounds.after_images ? JSON.parse(res.data.serviceRounds.after_images) : [],
                    loading: false
                })
            } else {
                toast.error(res.data.msg);
                this.setState({
                    loading: false
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
                                                                            <li>Vendor<br /><span>Zeeshan</span></li>
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
                                                                            <input type="file" style={{cursor:'pointer' ,width:'210px'}} 
                                                                            className="btn btn-outline-primary ml-auto" 
                                                                            onChange={this.getImage.bind(this,'b')}>
                                                                            </input>
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
                                                                            <input type="file" style={{cursor:'pointer' ,width:'210px'}} 
                                                                            className="btn btn-outline-primary ml-auto" 
                                                                            onChange={this.getImage.bind(this,'a')}>
                                                                            </input>
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
                                                                                        <li style={{listStyleType:'none'}}><input type="checkbox" className="col-sm-1" value={data.id} /> {data.item} </li> 
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
                                                                                        <li style={{listStyleType:'none'}}><input type="checkbox" className="col-sm-1" value={data.id} /> {data.item} </li> 
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
                                                                                        <li style={{listStyleType:'none'}}><input type="checkbox" className="col-sm-1" value={data.id} /> {data.item} </li> 
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
                                                                                        <li style={{listStyleType:'none'}}><input type="checkbox" className="col-sm-1" value={data.id} /> {data.item} </li> 
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
                                                                                        <li style={{listStyleType:'none'}}><input type="checkbox" className="col-sm-1" value={data.id} /> {data.item} </li> 
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
                                                            <div className="divid-line" />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                {
                                                                    this.state.serviceRounds.start_time == '-:-:-' ?
                                                                        <h4><button onClick={this.startService.bind(this)} style={{ cursor: 'pointer' }} className="btn btn-outline-success">Start Service</button></h4>
                                                                        :
                                                                        <>
                                                                            {
                                                                                this.state.serviceRounds.end_time == '-:-:-' 
                                                                                ?
                                                                                    <h4><button onClick={this.endService.bind(this)} style={{ cursor: 'pointer' }} className="btn btn-outline-success">End Service</button></h4>
                                                                                :
                                                                                    null
                                                                            }
                                                                        </>
                                                                }
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

const mapStateToProps = (state) => {
    return {
        employee: state.employee
    }
}
export default connect(mapStateToProps)(ServiceDetails);

{/* <div className="col-md-10">
    <select onChange={this.selected_employee.bind(this)} className="form-control" name="type">
    <option defaultValue="selected">Please Select</option>
        {this.state.employees.map((data,index)=>{
            return(
                <option key={index} value={data.id}>{data.name}</option>
                )
            }
        )
        }
    </select>
</div> */}
// {
//     this.state.serviceRounds.start_time.length > 0 && this.state.serviceRounds.end_time.legth > 0 ?
//     <h4>Service Completed</h4>
//     :

// }