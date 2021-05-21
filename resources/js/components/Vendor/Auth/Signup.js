import Axios from 'axios';
import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import SignUpRequest from './SignUpRequest';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {

            btn_loading: false,
            insurance_certificate_type: 'admin',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            address: '',
            phone: '',
            dob: '',
            australian_business_number: '',
            type_of_business: '',
            business_name: '',
            trading: '',
            insurance_certificate: '',
            credit_card_number: '',
            cvc: '',
            expiry_date: '',
            card_holder_name: '',
            duration_of_insu_charges: '',
            expiry_year: '',
            expiry_month: '',
            error_string: '',
            businessname: '',
            step: 1,
            services:[],
            vendor_id:this.props.match.params.vendor_id,
            photo_id:[],
            Npc:[],
            ic:[],
            btn1_prg:0,
            btn2_prg:0,
            btn2_prg:0,
            customer:{},
            agree_check:false
        };
        if (!this.props.match.params.step) {
            this.props.history.push('/vendor-signup/1')
        }
    }
    nextStep() {
        this.setState({
            step: step + 1
        })
    }
    PrevStep() {
        this.setState({
            step: step - 1
        })
    }
    InsuranceType(type) {
        this.setState({
            insurance_certificate_type: type
        })
    }
    first_name(e) {
        this.setState({
            first_name: e.target.value
        })
    }
    last_name(e) {
        this.setState({
            last_name: e.target.value
        })
    }
    email(e) {
        this.setState({
            email: e.target.value
        })
    }
    password(e) {
        this.setState({
            password: e.target.value
        })
    }
    address(e) {
        this.setState({
            address: e.target.value
        })
    }
    phone(e) {
        this.setState({
            phone: e.target.value
        })
    }
    dob(e) {
        this.setState({
            dob: e.target.value
        })
    }
    australian_business_number(e) {
        this.setState({
            australian_business_number: e.target.value
        })
    }
    type_of_business(e) {
        this.setState({
            type_of_business: e.target.value
        })
    }
    business_name(e) {
        this.setState({
            business_name: e.target.value
        })
    }
    trading(e) {
        this.setState({
            trading: e.target.value
        })
    }
    insurance_certificate(e) {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const promises = files.map(file => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }))
            });
            Promise.all(promises).then(images => {
                this.setState({
                    insurance_certificate: images[0]
                }, function () {
                    console.log(this.state.insurance_certificate);
                })
            }, error => { console.error(error); });

        }
    }
    credit_card_number(e) {
        this.setState({
            credit_card_number: e.target.value
        })
    }
    cvc(e) {
        this.setState({
            cvc: e.target.value
        })
    }
    expiry_month(e) {
        this.setState({
            expiry_month: e.target.value
        })
    }
    expiry_year(e) {
        this.setState({
            expiry_year: e.target.value
        })
    }
    card_holder_name(e) {
        this.setState({
            card_holder_name: e.target.value
        })
    }
    duration_of_insu_charges(e) {
        this.setState({
            duration_of_insu_charges: e.target.value
        })
    }
    validate_vendor(e) {
        e.preventDefault();
        console.log(this.state);
        Axios.post('/api/create-vendor', this.state).then(res => {
            if (res.data.status) {
                this.setState({
                    step: 2,
                    error_string:''
                })
            } else {
                this.setState({
                    error_string: res.data.message
                })
            }
        })
    }
    Create_Vendor(e) {
        e.preventDefault();
        console.log(this.state);


        this.setState({
            btn_loading: true
        })
        Axios.post('/api/create-vendor', this.state).then(res => {
            this.setState({
                btn_loading: false
            })
            console.log(res);
            if (res.data.status) {

                this.props.history.push('/vendor-signup/2/' + res.data.vendor.id);
            } else {
                this.setState({
                    error_string: res.data.message
                })
            }
        }).catch(e => { console.log(e) })
    }
    componentDidMount() {
        Axios.post('/api/get-services').then(res => {
            this.setState({
                services: res.data.data
            })
        })
    }

    submit_insurance() {
        if (this.state.insurance_certificate_type == 'own') {
            if (this.state.insurance_certificate == '') {

                this.setState({
                    error_string: 'Please Upload Insurance Certificate'
                })
                return;
            }
        }
        this.setState({
            btn_loading: true
        })
        Axios.post('/api/vendor_insurance_certificate', this.state).then(res => {
            if (res.data.status == 200) {
                this.props.history.push('/vendor-signup/4/' + this.props.match.params.vendor_id);
            } else {
                this.setState({
                    error_string: res.data.message
                })
            }
            this.setState({
                btn_loading: false
            })
            console.log(res);
        })
    }
    SelectService(index) {
        let temp = this.state.services;
        temp[index].check = !temp[index].check;
        this.setState({
            services: temp
        })
    }
    insurance_certificate(e) {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const promises = files.map(file => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }))
            });
            Promise.all(promises).then(images => {
                this.setState({
                    insurance_certificate: images[0]
                }, function () {
                    console.log(this.state.insurance_certificate);
                })
            }, error => { console.error(error); });

        }
    }
    credit_card_number(e) {
        this.setState({
            credit_card_number: e.target.value
        })
    }
    cvc(e) {
        this.setState({
            cvc: e.target.value
        })
    }
    expiry_month(e) {
        this.setState({
            expiry_month: e.target.value
        })
    }
    expiry_year(e) {
        this.setState({
            expiry_year: e.target.value
        })
    }
    card_holder_name(e) {
        this.setState({
            card_holder_name: e.target.value
        })
    }
    duration_of_insu_charges(e) {
        this.setState({
            duration_of_insu_charges: e.target.value
        })
    }
    InsuranceType(type) {
        this.setState({
            insurance_certificate_type: type
        })
    }
    upload_insurance(event) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('token', window.localStorage.getItem('al'));
        let Configs = {
            headers: {
                token: window.localStorage.getItem('al'),
                'content-type': false,
                'mime-type': "multipart/form-data",
            },
            onUploadProgress: progressEvent => {
                this.setState({
                    btn1_prg: Math.round((progressEvent.loaded * 100) / progressEvent.total)
                })
            }
        }
        this.setState({
            loading: true,
        })
        Axios.post('/api/file_upload', formData, Configs).then(res => {

            if (res.data.status == 200) {
                let temp = this.state.ic;
                temp.push({ url: res.data.url })
                this.setState({
                    btn1_prg: false,
                    ic: temp
                })
                Swal.fire({
                    icon: 'success',
                    title: 'File Uploaded Successfully',
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

    upload_NPC(event) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('token', window.localStorage.getItem('al'));
        let Configs = {
            headers: {
                token: window.localStorage.getItem('al'),
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
        Axios.post('/api/file_upload', formData, Configs).then(res => {

            if (res.data.status == 200) {
                let temp = this.state.Npc;
                temp.push({ url: res.data.url })
                this.setState({
                    btn2_prg: false,
                    Npc: temp
                })
                Swal.fire({
                    icon: 'success',
                    title: 'File Uploaded Successfully',
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
    upload_photo_id(event) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('token', window.localStorage.getItem('al'));
        let Configs = {
            headers: {
                token: window.localStorage.getItem('al'),
                'content-type': false,
                'mime-type': "multipart/form-data",
            },
            onUploadProgress: progressEvent => {
                this.setState({
                    progress: Math.round((progressEvent.loaded * 100) / progressEvent.total)
                })
            }
        }
        this.setState({
            loading: true,
        })
        Axios.post('/api/file_upload', formData, Configs).then(res => {

            if (res.data.status == 200) {
                let temp = this.state.photo_id;
                temp.push({ url: res.data.url })
                this.setState({
                    btn2_prg: false,
                    photo_id: temp
                })
                Swal.fire({
                    icon: 'success',
                    title: 'File Uploaded Successfully',
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
    validate_services(){
        let payload = {
            services: this.state.services,
            vendor_id: this.props.match.params.vendor_id
        }
        let check = false;
        this.state.services.map((data, index) => {
            if (data.check) {
                check = true;
            }
        })
        if (check) {
            this.setState({
                step:3,
                error_string:''
            })
        } else {
            this.setState({
                error_string: 'Please Select at least One Service'
            })
        }

    }
    change_step(step){
        this.setState({
            step:step,
            error_string:''
        })
    }
    submit_services() {
        let payload = {
            services: this.state.services,
            vendor_id: this.props.match.params.vendor_id
        }
        let check = false;
        this.state.services.map((data, index) => {
            if (data.check) {
                check = true;
            }
        })
        if (check) {
            this.setState({
                btn_loading: true
            })
            Axios.post('/api/save_vendor_services', payload).then(res => {
                this.setState({
                    btn_loading: false
                })
                this.props.history.push('/vendor-signup/3/' + this.props.match.params.vendor_id);
                console.log(res);
            })
        } else {
            this.setState({
                error_string: 'Please Selct at least One Service'
            })
        }

    }
    SelectService(index) {
        let temp = this.state.services;
        temp[index].check = !temp[index].check;
        this.setState({
            services: temp
        })
    }
    validate_card(){
        Axios.post('/api/validate_card',this.state).then(res=>{
            if(res.data.status){
               this.setState({
                   customer:res.data.customer,
                   step:4
               })
            }else{
                this.setState({
                    error_string:res.data.message
                })
            }
            
        })
    }
    validate_documents(){
        if(this.state.ic.length == 0){
            this.setState({
                error_string:'Please Upload Public Insurance Certificate'
            })
        }else if(this.state.Npc.length == 0){
            if(this.state.type_of_business == 'sole'){
                this.setState({
                    error_string:'Please Upload National Police Check'
                }) 
            }
        }else if(this.state.photo_id.length > 0){
            this.setState({
                error_string:'Please Photo Id'
            })
        }else{
            this.setState({
                step:4
            })
        }
    }
    submit_request(){
        Axios.post('/api/submit_vendor_request',this.state).then(res=>{
            if(res.data.status == 200){
                this.setState({
                    step:5
                })
            }else{
                this.setState({
                    error_string:'Sorry. we are unable to submit your request.'
                })
            }
        })
    }
    agree_check(){
        this.setState({
            agree_check : !this.state.agree_check
        })
    }
    render() {
        return (
            <div >
                <Navbar bg="light">
                    <div className="container">
                        <Navbar.Brand className="container" href="#home">
                            <img
                                src={`/images/tidy-home-logo.png`}
                                className=" p-3"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                    </div>

                </Navbar>
                <div>

                    <div className="container-fluid" id="grad1">
                        <div className="row justify-content-center mt-0">
                            <div className="col-11 col-sm-9 col-md-7 col-lg-6  p-0 mt-3 mb-2">
                                <div className="card card-signin p-3 animate_auth_modal  px-0 pt-4 pb-0 mt-3 mb-3">
                                    <h2 className="text-center"><strong>Vendor Account SignUp</strong></h2>
                                    <p className="text-center">Fill all form field to go to next step</p>
                                    <div className="row">
                                        <div className="col-md-12 mx-0">
                                            <form id="msform" className="text-center">
                                                {/* progressbar */}
                                                <ul id="progressbar">
                                                    <li className={this.state.step >= 1 ? "progress_active" : 'progress_icon'}  >
                                                        <i className="fas fa-user"></i>
                                                        <h6>Account Information</h6>
                                                    </li>
                                                    <li className={this.state.step >= 2 ? "progress_active" : 'progress_icon'} >
                                                        <i class="fas fa-solar-panel"></i>
                                                        <h6> Choose one or more services</h6>
                                                    </li>
                                                    <li className={this.state.step >= 3 ? "progress_active" : 'progress_icon'}>
                                                        <i class="fas fa-certificate"></i>
                                                        <h6>Documents</h6>
                                                    </li>
                                                    <li className={this.state.step >= 4 ? "progress_active" : 'progress_icon'}>
                                                        <i class="far fa-calendar-check"></i>
                                                        <h6>Review</h6>
                                                    </li>
                                                    <li className={this.state.step >= 5 ? "progress_active" : 'progress_icon'}>
                                                        <i class="fas fa-check"></i>
                                                        <h6>Finish</h6>
                                                    </li>
                                                </ul>
                                            </form>
                                            {
                                                this.state.step == 1 ?
                                                    <div >
                                                        <div className="row">
                                                            <div className="col-sm-1"></div>
                                                            <div className="col-sm-10">
                                                                <div className="panel">
                                                                    <form className="mb-5">
                                                                        <div className="panel-body">
                                                                            <div className="row">
                                                                                <div className="col-sm-6">
                                                                                    <div className="form-group">
                                                                                        <label className="control-label">Firstname</label>
                                                                                        <input onChange={this.first_name.bind(this)} type="firstname" name="firstname" className="form-control" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-6">
                                                                                    <div className="form-group">
                                                                                        <label className="control-label">Lastname</label>
                                                                                        <input onChange={this.last_name.bind(this)} type="lastname" name="lastname" className="form-control" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <label className="control-label">Email</label>
                                                                                        <input onChange={this.email.bind(this)} type="email" name="email" className="form-control" />
                                                                                    </div>
                                                                                </div>
                                                                                {/* <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <label className="control-label">Password</label>
                                                                                        <input onChange={this.password.bind(this)} type="password" className="form-control" />
                                                                                    </div>
                                                                                </div> */}
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <label className="control-label">Phone</label>
                                                                                        <input onChange={this.phone.bind(this)} type="phone" name="phone" className="form-control" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <label className="control-label">Date of Birth</label>
                                                                                        <input onChange={this.dob.bind(this)} type="date" name="dob" className="form-control" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <label className="control-label">Address</label>
                                                                                        <input onChange={this.address.bind(this)} type="text" name="address" className="form-control" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <label className="control-label">Australian Business Number</label>
                                                                                        <p style={{ fontSize: '12px' }} className="mb-1 py-1">Please note your name on this application must match the first and last
                                                 name registered to your ABN. If you do not have ABN yet, click here to <a target="blank" href="https://www.abr.gov.au/business-super-funds-charities/applying-abn">learn more</a>.</p>
                                                                                        <input onChange={this.australian_business_number.bind(this)} type="number" className="form-control" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <label className="control-label">Type of Business</label>
                                                                                        <select onChange={this.type_of_business.bind(this)} type="text" className="form-control" >
                                                                                            <option>-- Select type of business--</option>
                                                                                            <option value={'sole'}>Sole trader</option>
                                                                                            <option value={'company'}>Company</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <label className="control-label">Business Name</label>
                                                                                        <input onChange={this.business_name.bind(this)} type="text" className="form-control" />
                                                                                    </div>
                                                                                </div>
                                                                                <div >

                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <label className="control-label">Trading as (optional)</label>
                                                                                        <input onChange={this.trading.bind(this)} type="text" className="form-control" />
                                                                                    </div>
                                                                                </div>



                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            this.state.error_string != '' ?
                                                                                <p className="text-danger text-center">{this.state.error_string}</p>
                                                                                : null
                                                                        }
                                                                        <div className="panel-footer text-right">
                                                                            <button onClick={this.validate_vendor.bind(this)} className="btn btn-success   " type="submit">
                                                                                {
                                                                                    this.state.btn_loading ?
                                                                                        <div id="displayspinner" style={{ display: 'block', }}>
                                                                                            <div className="spinner-border  ml-2 text-light spinner_format" role="status">
                                                                                                <span className="sr-only">Loading...</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        : <>Next</>
                                                                                }
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                    {/*===================================================*/}
                                                                    {/*End Block Styled Form */}
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3"></div>
                                                        </div>

                                                    </div>
                                                    : null
                                            }
                                            {
                                                this.state.step == 2 ?
                                                    <div >
                                                        <div className="row">
                                                            <div className="col-sm-1"></div>
                                                            <div className="col-sm-10">
                                                                <div className="panel">
                                                                    <div className="panel-heading">
                                                                        <h3 className="text-center center_title">Select Services</h3>
                                                                    </div>

                                                                    <div className="panel-body">
                                                                        <div className="row">
                                                                            {
                                                                                this.state.services.map((data, index) => {
                                                                                    return (
                                                                                        <div onClick={this.SelectService.bind(this, index)} key={index} className="p-2">
                                                                                            <button className={!data.check ? "btn btn-outline-info" : "btn btn-success"}>
                                                                                                {data.check ?
                                                                                                    <i className="fas fa-check"></i>
                                                                                                    : null
                                                                                                }
                                                                                                {data.name}</button>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>

                                                                    </div>
                                                                    {
                                                                        this.state.error_string != '' ?
                                                                            <p className="text-danger text-center">{this.state.error_string}</p>
                                                                            : null
                                                                    }

                                                                    <div className="panel-footer row mt-5">
                                                                    <div className="text-left">
                                                                            <button onClick={this.change_step.bind(this,1)} className="btn btn-info   " type="submit">
                                                                                    {
                                                                                        this.state.btn_loading ?
                                                                                            <div id="displayspinner" style={{ display: 'block', }}>
                                                                                                <div className="spinner-border  ml-2 text-light spinner_format" role="status">
                                                                                                    <span className="sr-only">Loading...</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            : <>Previous</>
                                                                                    }
                                                                                </button>
                                                                        </div>
                                                                        <div className="text-right ml-auto">
                                                                            <button onClick={this.validate_services.bind(this)} className="btn btn-success   " type="submit">
                                                                                    {
                                                                                        this.state.btn_loading ?
                                                                                            <div id="displayspinner" style={{ display: 'block', }}>
                                                                                                <div className="spinner-border  ml-2 text-light spinner_format" role="status">
                                                                                                    <span className="sr-only">Loading...</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            : <>Next</>
                                                                                    }
                                                                                </button>
                                                                        </div>
                                            
                                                                    </div>

                                                                    {/*===================================================*/}
                                                                    {/*End Block Styled Form */}
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-1"></div>
                                                        </div>

                                                    </div>
                                                    : null
                                            }
                                            {
                                                this.state.step == 3 ?
                                                    <div >
                                                        <div className="row">
                                                            <div className="col-sm-1"></div>
                                                            <div className="col-sm-10">
                                                                <div className="panel">
                                                                    <div className="panel-heading">
                                                                        <h3 className="text-center center_title">Upload or Buy Insurance Certificate</h3>
                                                                    </div>
                                                                    <div className="panel-body">
                                                                        <div className="col-sm-12 ">
                                                                            <Tabs>
                                                                                <TabList>
                                                                                    <Tab onClick={this.InsuranceType.bind(this, 'own')}>Buy Public Liability Insurance</Tab>
                                                                                    <Tab onClick={this.InsuranceType.bind(this, 'admin')}>Upload Documents</Tab>
                                                                                </TabList>

                                                                                <TabPanel>
                                                                                    <div className="col-sm-12">
                                                                                        <div className="form-group">
                                                                                            <label className="control-label">Name on Card</label>
                                                                                            <input onChange={this.card_holder_name.bind(this)} type="name" className="form-control" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-sm-12">
                                                                                        <div className="form-group">
                                                                                            <label className="control-label">Card Number</label>
                                                                                            <input onChange={this.credit_card_number.bind(this)} type="number" className="form-control" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-sm-12 row">
                                                                                        <div className="col-sm-3">
                                                                                            <div className="form-group">
                                                                                                <label className="control-label">CVC</label>
                                                                                                <input onChange={this.cvc.bind(this)} type="number" placeholder="ex. 311" className="form-control" />

                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-sm-1"></div>
                                                                                        <div className="col-sm-3">
                                                                                            <div className="form-group">
                                                                                                <label className="control-label">Expiration</label>
                                                                                                <input onChange={this.expiry_month.bind(this)} type="number" placeholder="MM" className="form-control" />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-sm-1"></div>
                                                                                        <div className="col-sm-3">
                                                                                            <div className="form-group">
                                                                                                <label className="control-label"></label>
                                                                                                <input onChange={this.expiry_year.bind(this)} type="number" placeholder="YYYY" className="form-control" />
                                                                                            </div>
                                                                                        </div>
                                                                                        {
                                                                        this.state.error_string != '' ?
                                                                            <p className="text-danger text-center">{this.state.error_string}</p>
                                                                            : null
                                                                    }
                                                                   
                                                                                    </div>
                                                                                    {/* <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control-label">Recurring Payment Deduction</label>
                                                        <select onChange={this.duration_of_insu_charges.bind(this)} type="number" placeholder="MM" className="form-control" >
                                                            <option value="1">Weekly</option>
                                                            <option value="2">Monthly</option>
                                                        </select>
                                                    </div>
                                                </div>*/}
                                                <div className="panel-footer row mt-5">
                                                                    <div className="text-left">
                                                                            <button onClick={this.change_step.bind(this,2)} className="btn btn-info   " type="submit">
                                                                                    {
                                                                                        this.state.btn_loading ?
                                                                                            <div id="displayspinner" style={{ display: 'block', }}>
                                                                                                <div className="spinner-border  ml-2 text-light spinner_format" role="status">
                                                                                                    <span className="sr-only">Loading...</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            : <>Previous</>
                                                                                    }
                                                                                </button>
                                                                        </div>
                                                                        <div className="text-right ml-auto">
                                                                            <button onClick={this.validate_card.bind(this)} className="btn btn-success   " type="submit">
                                                                                    {
                                                                                        this.state.btn_loading ?
                                                                                            <div id="displayspinner" style={{ display: 'block', }}>
                                                                                                <div className="spinner-border  ml-2 text-light spinner_format" role="status">
                                                                                                    <span className="sr-only">Loading...</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            : <>Next</>
                                                                                    }
                                                                                </button>
                                                                        </div>
                                            
                                                                    </div>
                                                                                </TabPanel>
                                                                                <TabPanel>
                                                                                    <div className="col-sm-12 py-4">
                                                                                        <div className="  card p-3 form-group">
                                                                                            <label className="control-label p-2">Public Liability Insurance  </label>
                                                                                            <input style={{ border: '0px' }} onChange={this.upload_insurance.bind(this)} type="file" className="form-control col-md-8" />

                                                                                            <table className="table table-hover table-light table-striped mt-2">
                                                                                                <tbody>
                                                                                                    {
                                                                                                        this.state.ic.map((data, index) => {
                                                                                                            return (
                                                                                                                <tr key={index}>
                                                                                                                    <td>{data.url}</td>
                                                                                                                    <td><i className="fas fa-times"></i></td>
                                                                                                                </tr>
                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                        <div className="  card p-3 form-group">
                                                                                            <label className="control-label p-2">National Police Check (Only for sole trader)  </label>
                                                                                            <input style={{ border: '0px' }} onChange={this.upload_NPC.bind(this)} type="file" className="form-control col-md-8" />
                                                                                            <table className="table table-hover table-light table-striped mt-2">
                                                                                                <tbody>
                                                                                                    {
                                                                                                        this.state.Npc.map((data, index) => {
                                                                                                            return (
                                                                                                                <tr key={index}>
                                                                                                                    <td>{data.url}</td>
                                                                                                                    <td><i className="fas fa-times"></i></td>
                                                                                                                </tr>
                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                        <div className="  card p-3 form-group">
                                                                                            <label className="control-label p-2">Photo ID  </label>
                                                                                            <input style={{ border: '0px' }} onChange={this.upload_photo_id.bind(this)} type="file" className="form-control col-md-8" />
                                                                                            <table className="table table-hover table-light table-striped mt-2">
                                                                                                <tbody>
                                                                                                    {
                                                                                                        this.state.photo_id.map((data, index) => {
                                                                                                            return (
                                                                                                                <tr key={index}>
                                                                                                                    <td>{data.url}</td>
                                                                                                                    <td><i className="fas fa-times"></i></td>
                                                                                                                </tr>
                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>

                                                                                    </div>
{
                                                                        this.state.error_string != '' ?
                                                                            <p className="text-danger text-center">{this.state.error_string}</p>
                                                                            : null
                                                                    }
                                                                    <div className="panel-footer row mt-5">
                                                                    <div className="text-left">
                                                                            <button onClick={this.change_step.bind(this,2)} className="btn btn-info   " type="submit">
                                                                                    {
                                                                                        this.state.btn_loading ?
                                                                                            <div id="displayspinner" style={{ display: 'block', }}>
                                                                                                <div className="spinner-border  ml-2 text-light spinner_format" role="status">
                                                                                                    <span className="sr-only">Loading...</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            : <>Previous</>
                                                                                    }
                                                                                </button>
                                                                        </div>
                                                                        <div className="text-right ml-auto">
                                                                            <button onClick={this.validate_documents.bind(this)} className="btn btn-success   " type="submit">
                                                                                    {
                                                                                        this.state.btn_loading ?
                                                                                            <div id="displayspinner" style={{ display: 'block', }}>
                                                                                                <div className="spinner-border  ml-2 text-light spinner_format" role="status">
                                                                                                    <span className="sr-only">Loading...</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            : <>Next</>
                                                                                    }
                                                                                </button>
                                                                        </div>
                                            
                                                                    </div>
                                                                                </TabPanel>
                                                                            </Tabs>

                                                                        </div>
                                                                    </div>
                                                                    

                                                                    {/*===================================================*/}
                                                                    {/*End Block Styled Form */}
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3"></div>
                                                        </div>

                                                    </div>
                                                    : null
                                            }
                                            {
                                                this.state.step == 4 ?
                                                    <div>
                                                        <div className="panel-heading">
                                                            <h3 className="text-center center_title">Preview Request</h3>
                                                        </div>
                                                        <div className="card p-3">
                                                        <div className="panel-heading">
                                                            <h5 className="text-left center_title">Personal Information</h5>
                                                        </div>
                                                        <label className="control-label p-2">Name  </label>
                                                        <p>{this.state.first_name} {this.state.last_name}</p>
                                                        <label className="control-label p-2">Email  </label>
                                                        <p>{this.state.email}</p>
                                                        <label className="control-label p-2">Phone  </label>
                                                        <p>{this.state.phone}</p>
                                                        <label className="control-label p-2">Date of Birth  </label>
                                                        <p>{this.state.dob}</p>
                                                        <label className="control-label p-2">Australian Business Number  </label>
                                                        <p>{this.state.australian_business_number}</p>
                                                        <label className="control-label p-2">Type Of Business  </label>
                                                        <p>{this.state.type_of_business}</p>
                                                        <label className="control-label p-2">Business Name  </label>
                                                        <p>{this.state.business_name}</p>
                                                       
                                                        </div>
                                                        <div className="card p-3 mt-2">
                                                        <div className="panel-heading">
                                                            <h5 className="text-left center_title">Selected Services</h5>
                                                        </div>
                                                        <label className="control-label p-2">Services  </label>
                                                      {
                                                          this.state.services.map((data,index)=>{
                                                              return(
                                                                  <>
                                                                      {
                                                                          data.check ?
                                                                          <div>
                                                                            {data.name}
                                                                          </div>
                                                                          :null
                                                                      }
                                                                  </>
                                                              )
                                                          })
                                                      }
                                                        
                                                       
                                                        </div>

                                                        <div className="panel-footer row mt-5 px-3">
                                                        <div > 
                                                        <p style={{fontSize:'12px'}}>
                                                        <input id="demo-checkbox-1" className="magic-checkbox" onChange={this.agree_check.bind(this)} value="helo" checked={this.state.agree_check} type="checkbox" name="acceptTerms" data-bv-field="acceptTerms"></input>
                                                    
                                                         I agree to TidyHome’s Terms and Conditions and by clicking the box and proceeding, 
                                                        I agree that TidyHome or its representatives may contact me by email, phone or SMS 
                                                        (including by automatic telephone dialling system) at the email address or number 
                                                        I provide, including for marketing purposes. I have read and understand the relevant Privacy Statement.
                                                        </p>
                                                        {
                                                                        this.state.error_string != '' ?
                                                                            <p className="text-danger text-center">{this.state.error_string}</p>
                                                                            : null
                                                                    }
                                                        </div>
                                                                    <div className="text-left">
                                                                            <button onClick={this.change_step.bind(this,3)} className="btn btn-info   " type="submit">
                                                                                    {
                                                                                        this.state.btn_loading ?
                                                                                            <div id="displayspinner" style={{ display: 'block', }}>
                                                                                                <div className="spinner-border  ml-2 text-light spinner_format" role="status">
                                                                                                    <span className="sr-only">Loading...</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            : <>Previous</>
                                                                                    }
                                                                                </button>
                                                                        </div>
                                                                        <div className="text-right ml-auto">
                                                                            <button disabled={!this.state.agree_check} onClick={this.submit_request.bind(this)} className="btn btn-success   " type="submit">
                                                                                    {
                                                                                        this.state.btn_loading ?
                                                                                            <div id="displayspinner" style={{ display: 'block', }}>
                                                                                                <div className="spinner-border  ml-2 text-light spinner_format" role="status">
                                                                                                    <span className="sr-only">Loading...</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            : <>Submit</>
                                                                                    }
                                                                                </button>
                                                                        </div>
                                            
                                                                    </div>
                                                    </div>
                                                    : null
                                            }
                                            {
                                                this.state.step == 5 ?
                                                    <SignUpRequest {...this.props}></SignUpRequest>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;