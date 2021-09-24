import React, { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';
import Axios from 'axios';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            footer_content : {}
        };
    }

    componentDidMount(){
        Axios.get('/api/edit-content').then(res=>{
            console.log(res)
           this.setState({
               footer_content : res.data.data.footer_content
           })
        })
    }

    render() {
        return (
            <section class="about-section padding" >
                <div class="footer_" dangerouslySetInnerHTML={{__html:this.state.footer_content}}>
                </div>
            </section>
        );
    }
}

export default Footer;