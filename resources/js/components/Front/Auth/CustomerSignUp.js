import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {img_baseurl } from '../../Configs/Api';
 
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
            form_error:false,
            error_string:''
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
        e.preventDefault();
        Axios.post('/api/create-customer',this.state).then(res=>{
            if(res.data.status == 200){
                window.localStorage.setItem('cus_token',res.data.customer.token);
                this.props.changeUser({is_login:true,data:res.data.customer});
                this.props.history.push('/');
            }else{
                this.setState({
                    form_error:true,
                    error_string:res.data.msg
                })
            }
        })
    }
    render() { 
        return (
        <React.Fragment>
            {/* <div className="back_image"></div> */}
            <div className="row">
                <div className="col-md-4">
                    {/* <div className="login_img_div">
                        <img src={img_baseurl+"login-img.png"}></img>
                    </div> */}
                </div>
                <div className="col-md-4 auth_div">
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
                                <input onChange={this.phone.bind(this)} type="email" class="form-control auth_input_box"   />
                            </div>
                            <div>
                                {
                                    this.state.form_error ?
                                    <p className="text-danger">{this.state.error_string}</p>
                                    :null
                                }
                            </div>
                                <div className="input_div">
                                    <button onClick={this.signup.bind(this)} className="btn submit_button btn-info">SignUp</button>
                                </div>
                            </form>
                            <div>
                                <hr></hr>
                                <p className="auth_divider_text">Already have an account ? <span> <a href="/login">Login</a></span></p>
                              
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
        changeUser:(user)=>{disptach({type:'CHANGE_USER', payload:user})}
    }
}
 
export default connect(null,mapDispatchToProps)(CustomerSignUp);
