import Axios from 'axios';
import React,{Component} from 'react';
import Swal from 'sweetalert2'


class VendorResetPassword extends Component {

    constructor(props){
        super(props);
        this.state={
            password:'',
            confirm_password:'',
            loading: false,
        }
    }

    password(e){
        this.setState({
            password:e.target.value
        })
    }

    confirm_password(e){
        this.setState({
            confirm_password:e.target.value
        })
    }

    PasswordReset(e){
        e.preventDefault();
        let senderdata = {
            confirm_password:this.state.confirm_password,
            password:this.state.password,
            token:this.props.match.params.id
        }
        this.setState({
            loading:true
        })
        console.log(senderdata);
        if(senderdata.confirm_password == senderdata.password){
            Axios.post('/api/vendor-reset-password',senderdata).then(res=>{
                console.log(res);
                this.setState({
                    loading:false
                })
                if(res.data.status == 200){
                    Swal.fire({
                        icon: 'success',
                        title: res.data.msg,
                        showConfirmButton: false,
                        timer: 1500
                        })
                    this.props.history.push('/');
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: res.data.msg,
                        })
                }
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Passwords does not match',
                })
        }
        
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
                                                <div className="form-label-group">
                                                    <input onChange={this.password.bind(this)} type="password"  className="form-control input_box" placeholder="Password" required autoFocus/>
                                                    
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-label-group">
                                                    <input onChange={this.confirm_password.bind(this)} type="password"  className="form-control input_box" placeholder="Confirm Password" required autoFocus/>
                                                    
                                                </div>
                                            </div>
                                            <button onClick={this.PasswordReset.bind(this)} className="btn btn-lg btn-info btn-block text-uppercase" type="submit">
                                                {this.state.loading ?  
                                                    <div className="spinner-border text-light ml-2" style={{width:'25px',height:'25px'}} role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div> 
                                                    : 'Continue'
                                                }
                                                
                                            </button>
                                        </div>
                                </div>

                            </form>
                </div>

            </div>
        );
    }




}
 
export default VendorResetPassword;