import React, { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';
class BeYourOwnBoss extends Component {
    render() {
        return (
            <section className="about-section padding">
                <div className="container-fluid">
                <div className="row about-wrap">
                <div className="col-lg-12 sm-padding">
                <div className="section-heading dark-background text-center wow fadeInUp tab-des" data-wow-delay="100ms">

                <h2>How can you provide your <span>services</span></h2>
                    <div className="heading-img"><img src={img_baseurl+"heading-bg.png"} alt=""/></div>
                    <p>Be Your Own Boss.</p>
                </div>
                    
                </div>


                    <div className="padding_fluid container-fluid">
                    <div className="row top-margin">
                        
                    <div className="col-md-3 sm-padding ">
                                <div className="sec-bg">
                            
                            <div className="cln-sec testi-content2">
                                <img src={img_baseurl+"team.png"} alt=""/>
                                            <h3>Sign up as a business</h3>
                                        
                                            <p>Lorem ipsum, or lipsum as it is
                                            sometimes known, is dummy text
                                            used in laying out print, graphic or
                                            web designs. </p>
                                            
                            </div>
                    </div>
                    </div>
                        <div className="col-md-3 sm-padding">
                                <div className="sec-bg">
                            
                            <div className="cln-sec testi-content2">
                                <img src={img_baseurl+"shedule.png"} alt=""/>
                                            <h3>You choose your schedule and area   </h3>
                                        
                                            <p>Lorem ipsum, or lipsum as it is
                                            sometimes known, is dummy text
                                            used in laying out print, graphic or
                                            web designs. </p>
                                            
                            </div>
                            </div>
                    </div>
                        <div className="col-md-3 sm-padding ">
                                
                            <div className="sec-bg">
                            <div className="cln-sec testi-content2">
                                <img src={img_baseurl+"location.png"} alt=""/>
                                            <h3>You get jobs based on your area and schedule</h3>
                                        
                                            <p>Lorem ipsum, or lipsum as it is
                                            sometimes known, is dummy text
                                            used in laying out print, graphic or
                                            web designs. </p>
                                            
                            </div>
                    </div>
                    </div>
                    <div className="col-md-3 sm-padding ">
                                
                                <div className="sec-bg">
                                <div className="cln-sec testi-content2">
                                    <img src={img_baseurl+"paids.png"} alt=""/>
                                                <h3>Get paid weekly</h3>
                                            
                                                <p>Lorem ipsum, or lipsum as it is
                                                sometimes known, is dummy text
                                                used in laying out print, graphic or
                                                web designs. </p>
                                                
                                </div>
                        </div>
                        </div> 
                </div>
                    

                </div>
                </div>
                </div>
                </section>
        );
    }
}

export default BeYourOwnBoss;