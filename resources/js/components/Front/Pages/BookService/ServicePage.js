import Axios from 'axios';
import React, { Component } from 'react';
import { img_baseurl } from '../../../Configs/Api';

class ServicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service : {},
            category: {}
        };
    }
     componentDidMount(){
         Axios.post('/api/get_service_content_by_slug',{slug:this.props.match.params.slug}).then(res=>{
             console.log(res)
            this.setState({
                service:res.data,
                category:res.data.service
            })
         })
     }
    render() {
        return (

            <div>
            {
                this.state.service ?
                
                <div>
                    <section className="clean-section">
                        <div className="container">
                            <div className="blog-wrap row">
                                <div className="col-lg-8 col-sm-12 sm-padding">
                                    <div className="clean-sec">
                                        <h3>{this.state.category.name}</h3>
                                        <p dangerouslySetInnerHTML={{__html:this.state.service.description}}>
                                        </p>
                                        <a onClick={()=>{
                                        window.localStorage.setItem('service',this.state.category.if);
                                        window.open('/book-service/','_self')
                                        }} className="bk-book">Book Now</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <div className="clean-sec-img">
                                        <img src={img_baseurl+this.state.service.image} alt className="clean-s-img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="clean-include">
                        <div  dangerouslySetInnerHTML={{__html:this.state.service.included_text}} className="container">
                            
                        </div>
                    </section>
                    <section className="choose-tidyhome">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h2>Why Choose TidyHome</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="tidyhome-catgeory">
                                        <img src="/images/trusted.png" />
                                        <h3>Trusted Professionals</h3>
                                        <p>All TidyHome professionals are experience-backed, verified and background-checked.</p>
                                        <ul>
                                            <li>Police Checked</li>
                                            <li>ABN Verified</li>
                                            <li>Interviewed</li>
                                            <li>Service Tested</li>
                                            <li>Insured</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="tidyhome-catgeory">
                                        <img src="/images/100%-guarantee.png" />
                                        <h3>Satisfaction Guarantee</h3>
                                        <p>Your happiness is our top priority. Our professionals will ensure you are satisfied before they leave. We do our best to reach your satisfaction level.</p>
                                        <ul>
                                            <li>Upfront Pricing</li>
                                            <li>If you’re not 100% happy, we’ll clean again without any extra charges.</li>
                                            <li>Your feedback matters to us. The customer rating is what makes us trustworthy</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="tidyhome-catgeory">
                                        <img src="/images/eco-friendly.png" />
                                        <h3>Eco-Friendly Products</h3>
                                        <p>Being environmentally conscious is not all about plastic bags; it’s about making everyday choices to ensure a healthy environment. In TidyHome, we make sure that no harm is caused to the environment during our service.</p>
                                        <ul>
                                            <li>100% Environmentally Friendly Products.</li>
                                            <li>ComFitted to Making Our Surroundings Healthier.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                :
                null
            }
            </div>
        );
    }
}

export default ServicePage;