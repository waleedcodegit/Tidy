import React, { Component } from 'react';
import BookingForm from './Components/BookingForm';
import Faqs from './Components/Faqs';

class  BookService extends Component {
    render() { 
        return (
            <div className="container-fluid my-5">
                <div className="row "> 
                    <div className="col-lg-8 col-sm-12 col-md-8">
                        <BookingForm></BookingForm>
                    </div>
                    <div className="col-md-4 col-lg-4">
                        <Faqs></Faqs>
                    </div>  
                </div>
            </div>
        );
    }
}
 
export default BookService;