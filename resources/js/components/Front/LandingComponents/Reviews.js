import React, { Component } from 'react';
import $ from 'jquery';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
     
    render() {
        return (
            <section className="testimonial-section bg-grey padding">
                <div className="dots"></div>
                <div className="container">
                <div className="section-heading-rev text-center mb-40 wow fadeInUp" data-wow-delay="100ms">
                <h2>Live reviews <span>NEAR YOU</span></h2>
                    <div className="heading-img"><img src="/img/heading-bg.png" alt=""/></div>
                </div>
                <Carousel
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                // ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                >
                    <div className="testi-item align-items-center testi-content">

                    <img src="/img/testi-1.jpg" alt="img"/>
                    <ul className="rattings">
                    <li><i className="fa fa-star"></i></li>
                    <li><i className="fa fa-star"></i></li>
                    <li><i className="fa fa-star"></i></li>
                    <li><i className="fa fa-star"></i></li>
                    <li><i className="fa fa-star"></i></li>
                    </ul>
                    <div className="testi-content">
                    <p>"Thank you for guiding us through the construction process, understanding, and always ready to accommodate our needs. We love our new space and know that it was built by the very best!"</p>
                    <h3>Kyle Frederick</h3>

                    <span>Director</span>
                    </div>
                    <i className="fa fa-quote-right"></i>
                    </div>
                    <div className="testi-item align-items-center testi-content">

                    <img src="/img/testi-1.jpg" alt="img"/>
                    <ul className="rattings">
                    <li><i className="fa fa-star"></i></li>
                    <li><i className="fa fa-star"></i></li>
                    <li><i className="fa fa-star"></i></li>
                    <li><i className="fa fa-star"></i></li>
                    <li><i className="fa fa-star"></i></li>
                    </ul>
                    <div className="testi-content">
                    <p>"Thank you for guiding us through the construction process, understanding, and always ready to accommodate our needs. We love our new space and know that it was built by the very best!"</p>
                    <h3>Kyle Frederick</h3>

                    <span>Director</span>
                    </div>
                    <i className="fa fa-quote-right"></i>
                    </div>
                    <div className="testi-item align-items-center testi-content">
                        <img src="/img/testi-2.jpg" alt="img"/>
                            <ul className="rattings">
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        </ul>
                        <div className="testi-content">
                        <p>"Thank you for guiding us through the construction process, understanding, and always ready to accommodate our needs. We love our new space and know that it was built by the very best!"</p>
                        <h3>Valentin Lacoste</h3>

                        <span>Director</span>
                        </div>
                        <i className="fa fa-quote-right"></i>
                        </div>
                        <div className="testi-item align-items-center testi-content">
                        <img src="/img/testi-3.jpg" alt="img"/>
                            <ul className="rattings">
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        </ul>
                        <div className="testi-content">
                        <p>"Thank you for guiding us through the construction process, understanding, and always ready to accommodate our needs. We love our new space and know that it was built by the very best!"</p>
                        <h3>José Carpio</h3>

                        <span>Director</span>
                        </div>
                        <i className="fa fa-quote-right"></i>
                        </div>
                </Carousel>;
                </div>
                </section>
        );
    }
}

export default Reviews; 