import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <section className="widget-section padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 sm-padding">
                            <div className="widget-content">
                                <h4>Discover</h4>
                                <ul className="waidget-links">
                                    <li><a href="#">How it works</a></li>
                                    <li><a href="#">Services for business</a></li>
                                    <li><a href="#">Earn money</a></li>
                                    <li><a href="#">New users FAQ</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 sm-padding">
                            <div className="widget-content">
                                <h4>Company</h4>
                                <ul className="widget-links">
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Careers</a></li>
                                    <li><a href="#">Media enquiries</a></li>
                                    <li><a href="#">Community guidelines</a></li>
                                    <li><a href="#">Tasker principles</a></li>
                                    <li><a href="#">Terms & conditions</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Contact us</a></li>
                                    <li><a href="#">Privacy policy</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 sm-padding">
                            <div className="widget-content">
                                <h4>Popular Categories</h4>
                                <ul className="widget-links">
                                    <li><a href="#">Handyman Services</a></li>
                                    <li><a href="#">Cleaning Services</a></li>
                                    <li><a href="#">Delivery Services</a></li>
                                    <li><a href="#">Removalists</a></li>
                                    <li><a href="#">Gardening Services</a></li>
                                    <li><a href="#">Automotive</a></li>
                                    <li><a href="#">Assembly Services</a></li>
                                    <li><a href="#">All Services</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 sm-padding">
                            <div className="widget-content">
                                <h4>Popular Locations</h4>
                                <ul className="widget-links">
                                    <li><a href="#">Services in Adelaide</a></li>
                                    <li><a href="#">Services in Brisbane</a></li>
                                    <li><a href="#">Services in Canberra</a></li>
                                    <li><a href="#">Services in Melbourne</a></li>
                                    <li><a href="#">Services in Perth</a></li>
                                    <li><a href="#">Services in Sydney</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-footer">
                        <div className="row">
                            <div className="col-lg-4 col-sm-6 ">
                                <div className="widget-content">
                                    <p>Copyright 2020 Services. All Rights Reserved.</p>
                                </div>
                            </div>
                            <div className="col-lg-5">

                            </div>

                            <div className="col-lg-3 col-sm-6 ">
                                <div className="social-links">
                                    <ul>
                                        <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
                                        <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
                                        <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                                        <li><a href="#"><i className="fab fa-youtube-square"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        );
    }
}

export default Footer;