import React, { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';
import Axios from 'axios';

class BeYourOwnBoss extends Component {

    constructor(props) {
        super(props);
        this.state = {
            services : {}
        };
    }

    componentDidMount(){
        Axios.get('/api/edit-content').then(res=>{
            console.log(res)
           this.setState({
               services : res.data.data.services
           })
        })
    }

    render() {
        return (
            <section className="about-section padding">
                <div className="container" dangerouslySetInnerHTML={{__html:this.state.services}}>
                </div>
            </section>
        );
    }
}

export default BeYourOwnBoss;