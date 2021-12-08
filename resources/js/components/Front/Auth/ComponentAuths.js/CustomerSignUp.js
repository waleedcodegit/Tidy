import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { img_baseurl } from '../../../Configs/Api';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
 
class CustomerSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth_type:1,
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            address:'',
            phone:'',
            phonenumber:'+61',
            form_error:false,
            error_string:'',
            loading:false,
        };
    }
    set_auth_type(val){
        this.setState({
            auth_type:val
        })
    }
    phone(e){
        this.setState({
            phone:e.target.value
        })
    }
    phonenumber(e){
        this.setState({
            phonenumber:e.target.value
        })
    }
    first_name(e){
        this.setState({
            first_name:e.target.value
        })
    }
    last_name(e){
        this.setState({
            last_name:e.target.value
        })
    }
    email(e){
        this.setState({
            email:e.target.value
        })
    }
    password(e){
        this.setState({
            password:e.target.value
        })
    }
    address(e){
        this.setState({
            address:e.target.value
        })
    }
    signup(e){
        this.setState({ loading : true});
        e.preventDefault();
        Axios.post('/api/create-customer',this.state).then(res=>{
            if(res.data.status == 200){
                if(res.data.status == 200){
                    toast.success('Signup Successfully',{position: "bottom-center"});
                    // Swal.fire({
                    //     icon: 'success',
                    //     title: 'Signup Successfully',
                    //     showConfirmButton: false,
                    //     timer: 1500
                    // })
                } else {
                    toast.error(res.data.msg,{position: "bottom-center"});
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: res.data.msg,
                    //     showConfirmButton: false,
                    //     timer: 1500
                    // })
                }
                window.localStorage.setItem('cus_token',res.data.customer.token);
                this.props.changeUser({is_login:true,data:res.data.customer});
               
            }else{
              
                this.setState({
                    form_error:true,
                    error_string:res.data.message
                })
                toast.error(res.data.message,{position: "bottom-center"});
            }
        })
        setTimeout(() => {
            this.setState({ loading : false});
          }, 2000);
        
    }
    render() { 
        const {loading} = this.state;
        return (
        <React.Fragment>
            {/* <div className="back_image"></div> */}
            <div className="row">
               
                <div className="col-md-12 auth_div">
                    <div className="login_div">
                        {/* <div className="auth-site-logo">
                            <img className="logo" src={img_baseurl+"site-logo.png"} alt="Indico"/>
                        </div> */}
                        <h1 className="login_page_heading">Customer SignUp</h1>
                        <div className="form_div">
                            <form>
                            <div class="form-group input_div ">
                                <label className="input_label">First Name</label>
                                <input onChange={this.first_name.bind(this)} type="email" class="form-control auth_input_box" autoFocus  />
                            </div>
                            <div class="form-group input_div ">
                                <label className="input_label">Last Name</label>
                                <input onChange={this.last_name.bind(this)} type="email" class="form-control auth_input_box"   />
                            </div>
                            <div class="form-group input_div ">
                                <label className="input_label">Email</label>
                                <input onChange={this.email.bind(this)} type="email" class="form-control auth_input_box"  />
                            </div>
                            <div class="form-group input_div ">
                                <label className="input_label">Password</label>
                                <input onChange={this.password.bind(this)} type="password" class="form-control auth_input_box"  aria-describedby="emailHelp"  />
                            </div>
                            <div class="form-group input_div ">
                                <label className="input_label">Address</label>
                                <input onChange={this.address.bind(this)} type="email" class="form-control auth_input_box"   />
                            </div>
                            <div class="form-group input_div ">
                                <label className="input_label">Phone Number</label>
                                <div class="row">
                                <div class="col-md-3">
                                <select  onChange={this.phonenumber.bind(this)} value={this.state.phonenumber || ""} type="number"  className="form-control auth_input_box">
                               <option value={'+61'}>+61</option>
                               </select>
                               </div>
                               <div class="col-md-9">
                                <input onChange={this.phone.bind(this)} type="number" class="form-control auth_input_box"   />
                            </div> </div>
                            {/* <div> */}
                            {/* <div> */}
                                {
                                    this.state.form_error ?
                                    <p className="text-danger">{this.state.error_string}</p>
                                    :null
                                }
                            </div>
                                <div className="input_div">
                                    <button onClick={this.signup.bind(this)} disabled={loading} className="btn submit_button btn-info">
                                    { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                    { loading && <span > Loading...</span>}
                                     { !loading && <span >SignUp</span>}
                                            </button>
                                        {/* SignUp</button> */}
                                </div>
                            </form>
                            <div>
                                <hr></hr>
                                <p className="auth_divider_text">Already have an account ?<button className="btn submit_button btn-info"> <a onClick={()=>{this.props.CHANGE_AUTH_TYPE('login')}}>Login</a></button></p>
                              
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </React.Fragment>
        );
    }
}
const mapDispatchToProps = (disptach) => {
    return{
        changeUser:(user)=>{disptach({type:'CHANGE_USER', payload:user})},
        CHANGE_AUTH_TYPE:(type)=>{disptach({type:'CHANGE_AUTH_TYPE',payload:type})}

    }
}
 
export default connect(null,mapDispatchToProps)(CustomerSignUp);
