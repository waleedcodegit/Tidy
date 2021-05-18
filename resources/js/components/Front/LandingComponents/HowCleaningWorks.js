import React, { Component } from 'react';

class HowCleaningWorks extends Component {
    render() {
        return (
            <div className="cta-section padding">
                <div className="container">
                    <div className="section-heading dark-background text-center wow fadeInUp tab-des" data-wow-delay="100ms">

                <h2>Watch how <span>CLEANING WORKS</span></h2>
                    <div className="heading-img"><img src="/img/heading-bg.png" alt=""/></div>

                </div>
                    <div className="row">
                    <div className="col-md-1"></div>
                        <div className="col-md-10">
                        <div className="video-bottom">
                            <a href="#"> <i className="fa fa-play-circle video-icn" aria-hidden="true"></i></a>
                            <img src="/img/video-img.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    
                    </div>

                </div>
                </div>
        );
    }
}

export default HowCleaningWorks;