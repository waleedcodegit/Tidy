import Axios from 'axios';
import React from 'react';

class CreateCustomer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name : '',
            password : '',
            address : '',
            email : '',
            phone : '',
            errorString: '',
        }
    }

    getFirstName(event) {
        this.setState({
            first_name: event.target.value
        })
    }

    getLastName(event) {
        this.setState({
            last_name: event.target.value
        })
    }

    getEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    getPassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    getPhone(event) {
        this.setState({
            phone: event.target.value
        })
    }

    getAddress(event) {
        this.setState({
            address: event.target.value
        })
    }

    createCustomer(event) {
        event.preventDefault();
        Axios.post('/api/create-customer', this.state, {headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=> {
            console.log(res);
            if(res.data.status == true) {
                this.props.history.push('/admin/customer-list');
            } else {
                this.setState({
                    errorString: res.data.msg
                })
            }
        })
    }

    render() {
        return(
        <div id="page-content">
            <div className="row">
                <div className="col-sm-12">
                <div className="panel panel-bordered">
                    <div className="panel-heading">
                    <h3 className="panel-title">Create Customer</h3>
                    </div>
                    <div className="panel-body">
                    <div className="panel">
                        <form encType="multipart/form-data">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="first_name">First Name:</label>
                                        <input onChange={this.getFirstName.bind(this)} type="text" className="form-control" id="first_name" name="first_name" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="last_name">Last Name:</label>
                                        <input onChange={this.getLastName.bind(this)} type="text" className="form-control" id="last_name" name="last_name"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input onChange={this.getEmail.bind(this)} type="text" className="form-control" id="email" name="email"/>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input onChange={this.getPassword.bind(this)} type="text" className="form-control" id="password" name="password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input onChange={this.getPhone.bind(this)} type="text" className="form-control" id="phone" name="phone"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input onChange={this.getAddress.bind(this)} type="text" className="form-control" id="address" name="address"/>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.errorString != '' ?
                                <p className="text-center text-danger">{this.state.errorString}</p>
                                : null
                            }
                        </div>
                        <div className="panel-footer text-right">
                        <button onClick={this.createCustomer.bind(this)} type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        );
    }
}

export default CreateCustomer;