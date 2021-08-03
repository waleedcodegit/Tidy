import { RateReviewSharp } from '@material-ui/icons';
import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {img_baseurl, MAP_PLACES_API_KEY} from '../../../Configs/Api';
import Swal from 'sweetalert2';
import Autocomplete from "react-google-autocomplete";
import toast from 'react-hot-toast';

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
            id:this.props.vendor.vendor_id,
            vendor_services:[],
            card_details:{},
            no_card_details:false,
            credit_card_number: '',
            cvc: '',
            card_holder_name: '',
            expiry_year: '',
            expiry_month: '',
            update_card:false,
            vendor_id:this.props.vendor.data.vendor_id,
            vendor_addresses:[],
            loc_address:'',
            lat:0,
            long:0,
            lat_u:0,
            long_u:0,
            radius:0,
            loc_u_address:'',
            addresses:[],
            show_add_address:false,
            last_address_updater:0
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
                bio:res.data.data.bio,
                vendor_id:this.props.vendor.data.vendor_id

            })
        })
        Axios.post('/api/get_vendor_services',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>{
            this.setState({
                vendor_services:res.data
            })
        })
        Axios.post('/api/get_vendor_addresses',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>{
            this.setState({
                vendor_addresses:res.data
            })
        })
        Axios.post('/api/get_vendor_card_details',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>{
            console.log(res);
          if(res.data.status == 200){
              this.setState({
                  card_details:res.data.details
              })
          }else{
              this.setState({
                  no_card_details:true
              })
          }
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
    delete_vendor_service(id){
        Axios.post('/api/delete_vendor_service',{id:id}).then(res=>{
            Axios.post('/api/get_vendor_services',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>{
                this.setState({
                    vendor_services:res.data
                })
            })
            Swal.fire({
                icon: 'success',
                title: 'Service deleted Successfully',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
    update_card(){
        this.setState({
            update_card:true
        })
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
    validate_card() {
        Axios.post('/api/update_vendor_card', this.state).then(res => {
            console.log(res);
            if (res.data.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Payment details updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                this.setState({
                    error_string: res.data.message
                })
            }

        })
    }
    AddAddress(){
        let payload = {address:this.state.loc_address,lat:this.state.lat,long:this.state.long,radius:this.state.radius,vendor_id:this.props.match.params.id};
        Axios.post('/api/add_vendor_address',this.state).then(res=>{
            if(res.data.status){
                toast.success('Address Added SuccessFully');
                this.componentDidMount();
            }else{
                toast.error(res.data.message);
            }
        })

    }
    places(place){

        let lat  = place.geometry.location.lat();
        let long = place.geometry.location.lng();
        this.setState({
            lat:lat,
            long:long,
            loc_address:place.formatted_address
        })
    }
    places_u(place,index){
        console.log(place)
        let lat  = place.geometry.location.lat();
        let long = place.geometry.location.lng();
        let temp = this.state.vendor_addresses;
        temp[index].lat = lat;
        temp[index].lng = long;
        temp[index].address = place.formatted_address;
        this.setState({
            vendor_addresses:temp
        })
    }
    radius(e){
        this.setState({
            radius:e.target.value
        })
    }
    removeAddress(index) {
        let NPC_ = this.state.addresses;
        NPC_.splice(index, 1);
        this.setState({
            addresses: NPC_
        })
    }
    changeRadius(val,index){
        console.log(val)
        let temp = this.state.vendor_addresses;
        temp[index].radius = val;
        this.setState({
            vendor_addresses:temp
        })
    }
    update_address(data,index){
        var payload ;
        payload = {
            address:data.address,
            lat:data.lat,
            long:data.lng,
            vendor_id:this.state.vendor_id,
            radius:data.radius,
            id:data.id
        }
        Axios.post('/api/update_vendor_address',payload).then(res=>{
            if(res.data.status){
                toast.success('Address Updated SuccessFully.')
            }else{
                toast.error('Error - '+res.data.message)
            }
        })

    }
    delete_vendor_address(id){
        Axios.post('/api/delete_vendor_address',{id:id}).then(res=>{
            toast.success('Address deleted successfully.');
            this.componentDidMount();
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
                                            <a className="nav-link active" id="profile-tab2" data-toggle="tab" href="#settings" role="tab" aria-selected="true">Edit Profile</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link " id="profile-tab3" data-toggle="tab" href="#services" role="tab" aria-selected="false">My Services</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link " id="profile-tab5" data-toggle="tab" href="#services_areas" role="tab" aria-selected="false">My Services Areas</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link " id="profile-tab4" data-toggle="tab" href="#payments" role="tab" aria-selected="false">Payment Setting</a>
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
                                        <div className="tab-pane show  fade" id="services" role="tabpanel" aria-labelledby="profile-tab4">
                                            <form >
                                                <div className="card-header">
                                                    <h4>My Services</h4>
                                                </div>
                                                <div className="card-body">
                                                   <div className="row">
                                                      {
                                                          this.state.vendor_services.map((data,index)=>{
                                                              return(
                                                                <div className="row ml-4 mt-2 vendor_service_name p-2">
                                                                    <h6 className="mt-2 ">{data.service.name}</h6>
                                                                    <li onClick={this.delete_vendor_service.bind(this,data.id)} className="far fa-times-circle mt-1 ml-2 cross_icon"></li>
                                                                </div>
                                                              )
                                                          })
                                                      }
                                                   </div>
                                                </div>
                                                    
                                                    
                                               
                                                
                                            </form>
                                        </div>
                                        <div className="tab-pane show  fade" id="services_areas" role="tabpanel" aria-labelledby="profile-tab5">
                                        
                                                <div className="card-header">
                                                    <h4>My Services Areas</h4>
                                                </div>
                                                <div className="card-body">
                                                <div className="col-md-12 text-right">
                                                    <button onClick={(e)=>{
                                                        e.preventDefault();
                                                        this.setState({show_add_address:!this.state.show_add_address})}} className="btn btn-info" >Add new Address</button>
                                                </div>
                                                {
                                                    this.state.show_add_address ? 

                                                
                                                <div className="col-md-12">
                                                
                                                <div className="form-group">
                                                            <label className="control-label">Enter your Address</label>
                                                            <Autocomplete
                                                                apiKey={MAP_PLACES_API_KEY}
                                                                options={{types:'sublocality'}}
                                                                onPlaceSelected={(place) => {
                                                                    this.places(place);
                                                                }}
                                                                style={{ width: '100%' }}
                                                                className="form-control input_box"
                                                            />
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                                <label className="control-label">Enter Radius</label>
                                                                <input value={this.state.radius || ""} onChange={this.radius.bind(this)} type="number" placeholder="Enter Radius" className="form-control" />
                                                            </div>
                                                        <div>
                                                            <button onClick={this.AddAddress.bind(this)} className="btn btn-info" style={{width:'100%',borderRadius:'0px'}}>Add Address</button>
                                                                
                                                            
                                                        </div>
                                                </div>
                                                :
                                                null
                                                }
                                                <table className="table table-hover table-light table-striped mt-2">
                                                    <tbody>
                                                        {
                                                            this.state.vendor_addresses.map((data, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                    <td>
                                                                    <Autocomplete
                                                                    apiKey={MAP_PLACES_API_KEY}
                                                                    options={{types:'sublocality'}}
                                                                    onPlaceSelected={(place) => {
                                                                        this.places_u(place,index);
                                                                    }}
                                                                    style={{ width: '100%' }}
                                                                    className="form-control input_box"
                                                                    defaultValue={data.address}
                                                                    
                                                                    onChange={(place) => {
                                                                        this.places_u(place,index);
                                                                    }}
                                                                />
                                                                    </td>
                                                                    <td>
                                                                        <input onChange={(e)=>{this.changeRadius(e.target.value,index)}} className="form-control" value={data.radius} type="number"></input>
                                                                    </td>
                                                                    <td onClick={this.update_address.bind(this,data, index)}><button className="btn btn-outline-success"> <i className="fas fa-save"></i></button></td>
                                                                    <td onClick={this.delete_vendor_address.bind(this, data.id)}><button className="btn btn-outline-danger"> <i className="fas fa-trash"></i></button></td>
                                                                   
                                                                    </tr>
                                                                    )
                                                            })
                                                        }
                                                    </tbody>
                                                    </table>
                                                </div>
                                                    
                                                    
                                               
                                                
                                            
                                        </div>
                                        <div className="tab-pane show  fade" id="payments" role="tabpanel" aria-labelledby="profile-tab3">
                                           
                                                <div className="card-header">
                                                    <h4>Payment Settings</h4>
                                                </div>
                                                <div className="card-body">
                                                   {
                                                       this.state.no_card_details ?
                                                       <div className="text-center " >
                                                            Payment Card not Integrated
                                                       </div>
                                                       :
                                                       <div className="row">
                                                        <div className="col-md-4">
                                                        <strong><h6>Name on Card</h6></strong><br></br>
                                                        <h6>{this.state.card_details.card_holder_name}</h6>
                                                        </div>
                                                        <div className="col-md-4">
                                                        <strong><h6>Card Number</h6></strong><br></br>
                                                        <h6>xxxx xxxx xxxx {this.state.card_details.credit_card_number}</h6>
                                                        </div>    
                                                        <div className="col-md-2">
                                                        <strong><h6>CVC</h6></strong><br></br>
                                                        <h6>{this.state.card_details.cvc}</h6>
                                                        </div>   
                                                        <div className="col-md-2">
                                                        <strong><h6>Expiry</h6></strong><br></br>
                                                        <h6>{this.state.card_details.expiry_month}/{this.state.card_details.expiry_year}</h6>
                                                        </div>                                                
                                                    </div>
                                                   }
                                                   <div className="row">
                                                    <button onClick={this.update_card.bind(this)} className="btn btn-info"> 
                                                        {
                                                            this.state.no_card_details ? <>Add New Card</> : <>Change Card</>
                                                        }
                                                    </button>
                                                   </div>
                                                   {
                                                       this.state.update_card ?
                                                       <div className="card p-3 col-sm-12 mt-5">
                                                                                        <div className="col-sm-12  p-3">
                                                                                            <div className="form-group">
                                                                                                <label className="control-label">Name on Card</label>
                                                                                                <input value={this.state.card_holder_name || ""} onChange={this.card_holder_name.bind(this)} type="name" className="form-control" />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-sm-12">
                                                                                            <div className="form-group">
                                                                                                <label className="control-label">Card Number</label>
                                                                                                <input value={this.state.credit_card_number || ""} onChange={this.credit_card_number.bind(this)} type="number" className="form-control" />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-sm-12 row">
                                                                                            <div className="col-sm-3">
                                                                                                <div className="form-group">
                                                                                                    <label className="control-label">CVC</label>
                                                                                                    <input value={this.state.cvc || ""} onChange={this.cvc.bind(this)} type="number" placeholder="ex. 311" className="form-control" />

                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-sm-1"></div>
                                                                                            <div className="col-sm-3">
                                                                                                <div className="form-group">
                                                                                                    <label className="control-label">Expiration</label>
                                                                                                    <input value={this.state.expiry_month || ""} onChange={this.expiry_month.bind(this)} type="number" placeholder="MM" className="form-control" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-sm-1"></div>
                                                                                            <div className="col-sm-3">
                                                                                                <div className="form-group">
                                                                                                    <label className="control-label"></label>
                                                                                                    <input value={this.state.expiry_year || ""} onChange={this.expiry_year.bind(this)} type="number" placeholder="YYYY" className="form-control" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        {
                                                                                            this.state.error_string != ''?
                                                                                            <p className="text-center text-danger">{this.state.error_string}</p>
                                                                                            :null
                                                                                        }
                                                                                        <div className="col-sm-12  text-right p-3">
                                                                                           <button onClick={this.validate_card.bind(this)} className="btn btn-success ">Save</button>
                                                                                        </div>
                                                                                        </div>
                                                    :null
                                                   }
                                                </div>
                                                    
                                                    
                                               
                                                
                                            
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