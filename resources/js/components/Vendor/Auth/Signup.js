import Axios from 'axios';
import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import VendorInformation from './VendorInformation';
import SelectServices from './SelectServices';
import InsuranceCertificate from './InsuranceCertificate';
import SignUpRequest from './SignUpRequest';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {

            btn_loading: false

        };
        if(!this.props.match.params.step){
            this.props.history.push('/vendor-signup/1')
        }
    }

    render() {
        return (
            <div >
                <Navbar bg="light">
                    <div className="container">
                        <Navbar.Brand className="container" href="#home">
                            <img
                                src={`/images/tidy-home-logo.png`}
                                className=" p-3"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                    </div>

                </Navbar>
                <div>

                    <div className="container-fluid" id="grad1">
                        <div className="row justify-content-center mt-0">
                            <div className="col-11 col-sm-9 col-md-7 col-lg-6  p-0 mt-3 mb-2">
                                <div className="card card-signin p-3 animate_auth_modal  px-0 pt-4 pb-0 mt-3 mb-3">
                                    <h2 className="text-center"><strong>Vendor Account SignUp</strong></h2>
                                    <p className="text-center">Fill all form field to go to next step</p>
                                    <div className="row">
                                        <div className="col-md-12 mx-0">
                                            <form id="msform" className="text-center">
                                                {/* progressbar */}
                                                <ul id="progressbar">
                                                    <li className={this.props.match.params.step >= 1 ? "progress_active" : 'progress_icon'}  >
                                                        <i className="fas fa-user"></i>
                                                        <h6>Account Information</h6>
                                                    </li>
                                                    <li className={this.props.match.params.step >= 2 ? "progress_active" : 'progress_icon'} >
                                                    <i class="fas fa-solar-panel"></i>
                                                        <h6>Select Services</h6>
                                                    </li>
                                                    <li className={this.props.match.params.step >= 3 ? "progress_active" : 'progress_icon'}>
                                                    <i class="fas fa-certificate"></i>
                                                        <h6>Insurance Certificate</h6>
                                                    </li>
                                                    <li className={this.props.match.params.step >= 4 ? "progress_active" : 'progress_icon'}>
                                                    <i class="fas fa-check"></i>
                                                        <h6>Finish</h6>
                                                    </li>
                                                </ul> 
                                            </form>
                                            {
                                                this.props.match.params.step == 1 ?
                                                <VendorInformation {...this.props}></VendorInformation>
                                                : null
                                            }
                                            {
                                                this.props.match.params.step == 2 ?
                                                <SelectServices {...this.props}></SelectServices>
                                                : null
                                            }
                                            {
                                                this.props.match.params.step == 3 ?
                                                <InsuranceCertificate {...this.props}></InsuranceCertificate>
                                                : null
                                            }
                                            {
                                                this.props.match.params.step == 4   ?
                                                <SignUpRequest {...this.props}></SignUpRequest>
                                                : null
                                            }
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

export default SignUp;