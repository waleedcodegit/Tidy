import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
class SignUpRequest extends Component {
    render() {
        return (
            <>
             
            <div className="row animated zoomInUp">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <div className="panel">
                            <div className="text-center" >
                                <img  className="img_success" 
                                    src={`/images/success-icon.png`} 
                                     />
                            </div>
                            <div className="text-center success_text">
                                <h2>Success!</h2>
                                <h4>Thank You for submitting your request. 
                                    We will review your request and you will be contacted by one of our staff.</h4>
                            </div>
                        </div>
                    </div>
                    <div  className="col-sm-3"></div>
                </div>
                </>
        );
    }
}

export default SignUpRequest;
