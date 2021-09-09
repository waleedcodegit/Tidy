import React, { Component } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';


class ForgotPassword extends Component {

    constructor(props){
        super(props);
        this.state={
            email : '',
            error_string : '',
            loading: false,
        }
    }

    email(e){
        this.setState({
            email: e.target.value
        })
    }

    forgotPassword(e){
        e.preventDefault();
        let sendData = {
            email:this.state.email,
        }
        this.setState({
            loading:true
        })
        Axios.post('/api/forgot-password',sendData).then(res=>{
            this.setState({
                loading:false
            })
            if(res.data.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: res.data.msg,
                    })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: res.data.msg,
                    showConfirmButton: true,
                    })
            }
        })
    }

    render() { 
        return ( 
            <div>
                <div className="panel">
                <form>
                                <div className="panel-body row mt-5 mb-5">
                                    <div className="col-sm-4"></div>
                                    <div className=" col-sm-4">
                                    <div className="panel-heading">
                                <h3 className="text-center center_title">Forgot Password</h3>
                            </div>
                                    <div className="col-sm-12">
                                      
                                        <div className="form-group">
                                                <input onChange={this.email.bind(this)} 
                                                type="email" 
                                                className="form-control"
                                                placeholder="Enter Email" />
                                            </div>
                                        </div>
                                        {
                                            this.state.error_string != '' ?
                                            <p className="text-danger text-center">{this.state.error_string}</p>
                                            :null
                                        }
                                        <div className="col-sm-12">
                                        <button onClick={this.forgotPassword.bind(this)} className="btn btn-info text-center sub_btn col-sm-12" type="submit">Send Reset Link</button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                </div>

            </div>
         );
    }
}
 
export default ForgotPassword;