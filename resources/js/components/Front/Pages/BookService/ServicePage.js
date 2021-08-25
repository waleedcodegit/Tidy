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
                        <div className="container" dangerouslySetInnerHTML={{__html:this.state.service.whychoose}}>
                                         
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