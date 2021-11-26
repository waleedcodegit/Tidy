import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name:'',
            last_name:'',
            email:'',
            address:'',
            phone:'',
            phonenumber:'',
            loading:false,
            id:this.props.user.data.id,
            profile_image:''
        };
    }
     
    componentDidMount(){
        this.setState({
            first_name:this.props.user.data.first_name,
            last_name:this.props.user.data.last_name,
            email:this.props.user.data.email,
            address:this.props.user.data.address,
            phone:this.props.user.data.phone,
            profile_image:this.props.user.data.image
            
        })
    }
      defineProp  ( obj, key, value ) {
        var config = {
          value: value,
          writable: true,
          enumerable: true,
          configurable: true
        };
        Object.defineProperty( obj, key, config );
      };
    handleStateChange(e){
        let state = {};
        this.defineProp( state , e.target.name , e.target.value , e.target.phonenumber);
        this.setState(state);
    }
    phonenumber(e){
        this.setState({
            phonenumber:e.target.value
        })
    }
    Update_Profile(e){
        this.setState({ loading : true});
        e.preventDefault();
        this.setState({
            loading:true
        })
        Axios.post('/api/update_customer',this.state).then(res=>{
            this.setState({
                loading:false
            })
            if(res.data.status){
                toast.success('Customer Updated SuccessFully.');
                this.props.changeUser({is_login:true,is_apicall:true,data:res.data.customer})
            }
        })
        setTimeout(() => {
            this.setState({ loading : false});
          }, 2000);
    }
    upload_Profile_img(event) {
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
        Axios.post('/api/image_upload', formData, Configs).then(res => {

            if (res.data.status == 200) {
                toast.success('Profile Image Uploaded. Please update profile.');
                this.setState({
                    profile_image:res.data.url,
                    loading:false
                })
            } else {
                toast.error(res.data.msg);
                this.setState({
                    loading:false
                })
            }
        })

    }
    render() {
        const {loading} = this.state;
        return (
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div className="row">
                <div className="col-sm-12 padding-15">
                    <div className="blog-item profile-shadow">
                        <div className="edit-content">
                            <div className="col-md-12 auth_div">
                                <div className="login_div">
                                    <h1 className="login_page_heading">Edit Profile</h1>
                                    {
                                        
                                     this.props.user.is_login == true && this.props.user.is_apicall == true ?
                                     <div onLoad={()=>{this.setProps()}}>
                                     {

                                     }
                                     </div>
                                     :
                                     null
                                    }
                                    <div className="form_div">
                                        <form>
                                            <div className="row ">
                                            <div className="form-group input_div col-md-6">
                                                <label className="input_label">First Name</label>
                                                <input value={this.state.first_name} type="text" onChange={this.handleStateChange.bind(this)} name="first_name" className="form-control auth_input_box" />
                                            </div>
                                            <div className="form-group input_div col-md-6"><label className="input_label">Last Name</label>
                                                <input value={this.state.last_name} onChange={this.handleStateChange.bind(this)} name="last_name" type="email" className="form-control auth_input_box" />
                                            </div>
                                            </div>
                                            
                                            <div className="form-group input_div "><label className="input_label">Email</label>
                                                <input value={this.state.email} onChange={this.handleStateChange.bind(this)} name="email" type="email" className="form-control auth_input_box" /></div>
                                            <div className="form-group input_div "><label className="input_label">Address</label>
                                                <input value={this.state.address} onChange={this.handleStateChange.bind(this)} name="address" type="email" className="form-control auth_input_box" /></div>
                                            <div className="form-group input_div "><label className="input_label">Phone Number</label> <div/>
                                            {/* <div class="row"> */}
                                               {/* <div class="col-md-3">
                                                     <select  onChange={this.phonenumber.bind(this)} type="number"  className="form-control auth_input_box">
                                                     <option>+61</option>
                                                   <option>+61</option>
                                               </select> */}
                                                     {/* </div> */}
                                                     {/* <div class="col-md-9"> */}
                                                <input value={this.state.phone} onChange={this.handleStateChange.bind(this)} name="phone" type="email" className="form-control auth_input_box" />
                                                {/* </div> */}
                                                {/* </div> */}
                                                </div>
                                            <div />
                                            <div className="form-group input_div "><label className="input_label">Upload Profile Image</label>
                                                <input onChange={this.upload_Profile_img.bind(this)} type="file" className="form-control auth_input_box" /></div>
                                            <div />
                                            {
                                                this.state.error_string != '' ?
                                                <p className="text-center text-danger">{this.state.error_string}</p>
                                                :
                                                null
                                            }
                                            <div onClick={this.Update_Profile.bind(this)} className="input_div"><button disabled={this.state.loading} className="btn submit_button rounded btn-info">
                                            { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                                   { loading && <span >Updating...</span>}
                                                   { !loading && <span >Update</span>}
                                                </button></div>
                                        </form>
                                        <div>
                                        </div>
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
const mapStateToProps = (state) => {
    return{
        user:state.user
    }
}
const mapDispatchToProps = (disptach) => {
    return{
        changeUser:(user)=>{disptach({type:'CHANGE_USER', payload:user})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);
