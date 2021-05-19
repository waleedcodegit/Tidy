import React, { Component } from 'react';
import Axios from 'axios';

class CreateVendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name :  '',
            last_name : '',
            password: '',
            address: '',
            email: '',
            phone: '',
            dob: '',
            australian_business_number: '',
            type_of_business: '',
            business_name: '',
            trading: '',
        }
    }

    getFirstName(event) {
        this.setState({
            first_name: event.target.value
        });
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
    getDOB(event){
        this.setState({
            dob: event.target.value
        })
    }
    getAustralianBusinessNumber(event) {
        this.setState({
            australian_business_number: event.target.value
        })
    }
    getTypeOfBusiness(event) {
        this.setState({
            type_of_business: event.target.value
        })
    }
    getBusinessName(event) {
        this.setState({
            business_name: event.target.value
        })
    }
    getTrading(event) {
        this.setState({
            trading: event.target.value
        })
    }

    render() {
        return (
            <div id="page-content">
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-bordered">
                        <div className="panel-heading">
                        <h3 className="panel-title">Create Vendor</h3>
                        </div>
                        <div className="panel-body">
                            <div className="panel">
                                <form encType="multipart/form-data">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="first_name">First Name:</label>
                                                    <input onChange={this.getFirstName.bind(this)} type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="last_name">Last Name:</label>
                                                    <input onChange={this.getLastName.bind(this)} type="text" className="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input onChange={this.getEmail.bind(this)} type="text" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <input onChange={this.getPassword.bind(this)} type="text" className="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">Date Of Birth</label>
                                                    <input onChange={this.getDOB.bind(this)} type="date" className="form-control"/>
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="australian_business_number">Australian Business Number</label>
                                                    <input onChange={this.getAustralianBusinessNumber.bind(this)} type="text" className="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Phone</label>
                                                    <input onChange={this.getPhone.bind(this)} type="text" className="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="address">Address</label>
                                                    <input onChange={this.getAddress.bind(this)} type="text" className="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* {
                                            this.state.errorString != '' ?
                                            <p className="text-center text-danger">{this.state.errorString}</p>
                                            : null
                                        } */}
                                    </div>
                                    <div className="panel-footer text-right">
                                        <button  type="submit" className="btn btn-primary">Submit</button>
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

export default CreateVendor;