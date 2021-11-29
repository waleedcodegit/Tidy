import Axios from 'axios';
import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import { base_url } from '../../Configs/Api';
import {connect} from "react-redux";
import '../../Vendor/admin.css';

class EmpLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            error_string:'',
            employee:''

        };
    }
    email(e){
        this.setState({
            username:e.target.value
        })
    }
    password(e){
        this.setState({
            password:e.target.value
        })
    }
    login(e){
        this.setState({ loading : true});
        e.preventDefault();
        Axios.post('/api/employee-login',this.state).then(res=>{
            this.props.employeeObject({
                is_login: true,
                data: res.data.data
            })
            if(res.data.status == 200){
                window.localStorage.setItem('et',res.data.data.token)
                window.open('/vendor-employee/Empdashboard','_self')
            }else{
                this.setState({
                    error_string:res.data.message
                })
            }
        })
        setTimeout(() => {
            this.setState({ loading : false});
          }, 2000);
    }
    render() {
        const {loading} = this.state;
        return (
            
                    <form>
                        <div className="panel-body row mt-5 mb-5">
                            <div className="col-sm-4"></div>
                            <div className=" col-sm-4">
                            <div className="panel-heading">
                                <h3 className="text-center center_title">Employee Login</h3>
                            </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="control-label">UserName</label>
                                        <input onChange={this.email.bind(this)} type="Email" name="email" className="form-control"  aria-autocomplete/>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="control-label">Password</label>
                                        <input onChange={this.password.bind(this)} type="password" name="password" className="form-control" />
                                    </div>
                                </div>
                                {
                                    this.state.error_string != '' ?
                                    <p className="text-danger text-center">{this.state.error_string}</p>
                                    :null 
                                }
                                <div className="col-sm-12">
                                <button onClick={this.login.bind(this)}  disabled={loading} className="btn btn-info text-center sub_btn col-sm-12" type="submit">
                                { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                            { loading && <span > Loading...</span>}
                                            { !loading && <span >Login</span>}
                                                    </button>
                                </div>
                            </div>
                        </div>

                    </form>
                
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employee: state.employee
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        employeeObject: (employee) => {
            dispatch({
                type: "CHANGE_EMPLOYEE",
                payload: employee
            })
        }
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(EmpLogin);