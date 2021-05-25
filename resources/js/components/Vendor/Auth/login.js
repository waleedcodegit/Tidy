import Axios from 'axios';
import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import { base_url } from '../../Configs/Api';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            error_string:'',
            services:[],
            error_string:'',

        };
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
    login(e){
        e.preventDefault();
        Axios.post('/api/vendor-login',this.state).then(res=>{
            console.log(res);
            if(res.data.status == 200){

            }else{
                this.setState({
                    error_string:res.data.message
                })
            }
        })
    }
    render() {
        return (
            <div >

                   
                        <div className="panel">
                           
                            {/*Block Styled Form */}
                            {/*===================================================*/}
                            <form>
                                <div className="panel-body row mt-5 mb-5">
                                    <div className="col-sm-4"></div>
                                    <div className=" col-sm-4">
                                    <div className="panel-heading">
                                <h3 className="text-center center_title">Vendor Login</h3>
                            </div>
                                        <div className="col-sm-12">
                                      
                                            <div className="form-group">
                                                <label className="control-label">Email</label>
                                                <input onChange={this.email.bind(this)} type="Email" name="email" className="form-control"  aria-autocomplete/>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Password</label>
                                                <input onChange={this.password.bind(this)} type="password" name="password" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <p className="text-right">Forgot Password ?</p>
                                        </div>
                                        {
                                            this.state.error_string != '' ?
                                            <p className="text-danger text-center">{this.state.error_string}</p>
                                            :null
                                        }
                                        <div className="col-sm-12">
                                        <button onClick={this.login.bind(this)} className="btn btn-success text-center sub_btn col-sm-12" type="submit">Login</button>
                                        </div>
                                        
                                       <div className="col-sm-12">
                                       <hr></hr>
                                        <div className="text-center ">
                                            <p>New to TidyHome as a Vendor? <span ><Link to="/vendor-signup">SignUp</Link></span> </p>
                                        </div>
                                       </div>
                                    </div>
                                </div>
                                {/* <div className="panel-footer text-center">
                                    <button className="btn btn-success " type="submit">Login</button>
                                </div> */}

                            </form>
                            {/*===================================================*/}
                            {/*End Block Styled Form */}
                        </div>

            </div>
        );
    }
}

export default Login;