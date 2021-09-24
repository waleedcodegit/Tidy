import React, { Component } from 'react';
import Signup from './Signup';
import VendorFaqs from './Faqs';

class  VendorSignup extends Component {
    render() { 
        return (
            <div className="container-fluid my-5">
                <div className="row "> 
                    <div className="col-lg-8 col-sm-12 col-md-8">
                        <Signup {...this.props}></Signup>
                    </div>
                    <div className="col-md-4 col-lg-4">
                        <VendorFaqs></VendorFaqs>
                    </div>  
                </div>
            </div>
        );
    }
}
 
export default VendorSignup;