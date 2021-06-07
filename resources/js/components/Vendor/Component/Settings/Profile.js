import { RateReviewSharp } from '@material-ui/icons';
import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {img_baseurl} from '../../../Configs/Api';
import Swal from 'sweetalert2'
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            address:'',
            image:'',
            phone:'',
            dob:'',
            australian_business_number:'',
            type_of_business:'',
            company_name:'',
            business_name:'',
            trading:'',
            insurance_certificate_type:'',
            insurance_certificate:'',
            bio:'',
            status:'',
            error_string:'',
            id:this.props.vendor.vendor_id
        };
    }
    
    componentDidMount(){
        let payload ={
            id:this.props.vendor.vendor_id
        }
        Axios.post('/api/get-vendor-info/'+this.props.vendor.data.vendor_id).then(res=>{
            console.log(res);
            this.setState({
                data:res.data.data,
                first_name:res.data.data.first_name,
                last_name:res.data.data.last_name,
                email:res.data.data.email,
                phone:res.data.data.phone,
                address:res.data.data.address,
                image:res.data.data.image,
                dob:res.data.data.dob,
                australian_business_number:res.data.data.australian_business_number,
                type_of_business:res.data.data.type_of_business,
                company_name:res.data.data.company_name,
                business_name:res.data.data.business_name,
                trading:res.data.data.trading,
                bio:res.data.data.bio

            })
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
    bio(e) {
        this.setState({
            bio: e.target.value
        })
    }
    update(e){
        e.preventDefault();
        Axios.post('/api/update_vendor_profile',this.state).then(res=>{
            if(res.data.status){
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else{
                this.setState({
                    error_string:res.data.message
                })
            }
            
        })
    }
    render() {
        return (
            <section className="section">
                <div className="section-body">
                    <div className="row mt-sm-4">
                        <div className="col-12 col-md-4 col-lg-4">
                            <div className="card author-box">
                                <div className="card-body">
                                    <div className="author-box-center">
                                        <img alt="image" src={img_baseurl + this.state.data.image} className="rounded-circle author-box-picture" />
                                        <div className="clearfix" />
                                        <div className="author-box-name">
                                            <a href="#">{this.state.data.first_name} {this.state.data.last_name}</a>
                                        </div>
                                        <div className="author-box-job">{this.state.data.email}</div>
                                    </div>
                                    <div className="mb-2 mt-3 text-center">
                                            <div className="text-small font-weight-bold">{this.state.data.business_name}</div>
                                        </div>
                                    <div className="text-center">
                                        <div className="author-box-description">
                                            <p>
                                               {this.state.bio}
                                            </p>
                                        </div>
                                     
                                       
                                        <div className="w-100 d-sm-none" />
                                    </div>
                                </div>
                            </div>
                             </div>
                        <div className="col-12 col-md-8 col-lg-8">
                            <div className="card">
                                <div className="padding-20">
                                    <ul className="nav nav-tabs" id="myTab2" role="tablist">
                                       
                                        <li className="nav-item">
                                            <a className="nav-link active" id="profile-tab2" data-toggle="tab" href="#settings" role="tab" aria-selected="true">Setting</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content tab-bordered" id="myTab3Content">
                                     
                                        <div className="tab-pane show active fade" id="settings" role="tabpanel" aria-labelledby="profile-tab2">
                                            <form >
                                                <div className="card-header">
                                                    <h4>Edit Profile</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>First Name</label>
                                                            <input onChange={this.first_name.bind(this)} value={this.state.first_name || ""} type="text" className="form-control" defaultValue="John" />
                                                            <div className="invalid-feedback">
                                                                Please fill in the first name
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Last Name</label>
                                                            <input onChange={this.last_name.bind(this)} value={this.state.last_name || ""} type="text" className="form-control" defaultValue="Deo" />
                                                            <div className="invalid-feedback">
                                                                Please fill in the last name
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Email</label>
                                                            <input onChange={this.email.bind(this)} disabled value={this.state.email || ""} type="text" className="form-control" defaultValue="John" />
                                                            <div className="invalid-feedback">
                                                                Please fill in the Email
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Phone</label>
                                                            <input onChange={this.phone.bind(this)} value={this.state.phone || ""} type="text" className="form-control" defaultValue="Deo" />
                                                            <div className="invalid-feedback">
                                                                Please fill in the Phone
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Date of birth</label>
                                                            <input onChange={this.dob.bind(this)} value={this.state.dob || ""} type="date" className="form-control" defaultValue="John" />
                                                            <div className="invalid-feedback">
                                                                Please fill in the Date of birth
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Address</label>
                                                            <input onChange={this.address.bind(this)} value={this.state.address || ""} type="text" className="form-control"  />
                                                            <div className="invalid-feedback">
                                                                Please fill in the Address
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Australian Business Number</label>
                                                            <input onChange={this.australian_business_number.bind(this)} value={this.state.australian_business_number || ""} type="text" className="form-control" defaultValue="John" />
                                                            <div className="invalid-feedback">
                                                                Please fill in the Australian Business Number
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Type of Business</label>
                                                            <input disabled onChange={this.type_of_business.bind(this)} value={this.state.type_of_business || ""} type="text" className="form-control" defaultValue="Deo" />
                                                            <div className="invalid-feedback">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Business Name</label>
                                                            <input onChange={this.business_name.bind(this)} value={this.state.business_name || ""} type="text" className="form-control" defaultValue="John" />
                                                            <div className="invalid-feedback">
                                                                Please fill in the Business Name
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>Trading as (optional)</label>
                                                            <input onChange={this.trading.bind(this)} value={this.state.trading || ""} type="text" className="form-control" defaultValue="Deo" />
                                                            <div className="invalid-feedback">
                                                                Please fill in the Trading as 
                                                            </div>
                                                        </div>
                                                    </div>
                                                   
                                                    <div className="row">
                                                        <div className="form-group col-12">
                                                            <label>Bio</label>
                                                            <textarea  onChange={this.bio.bind(this)} value={this.state.bio || ""} className="form-control summernote-simple" defaultValue={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur voluptatum alias molestias minus quod dignissimos."} />
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                {
                                                    this.state.error_string != ''?
                                                    <p className="text-center text-danger">{this.state.error_string}</p>
                                                    :null
                                                }
                                                <div className="card-footer text-right">
                                                    <button onClick={this.update.bind(this)} className="btn btn-primary">Save Changes</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        vendor:state.vendor
    }
}
export default connect(mapStateToProps)(Profile);