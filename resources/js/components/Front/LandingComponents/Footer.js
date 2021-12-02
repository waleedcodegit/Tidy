import React, { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';
import Axios from 'axios';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            footer_content : {},
            loading:true,
        };
    }

    componentDidMount(){
        Axios.get('/api/edit-content').then(res=>{
            console.log(res)
           this.setState({
               footer_content : res.data.data.footer_content,
               loading:false,
           })
        })
    }

    render() {
        return (
            <div>
{
                this.state.loading  ?
                <div id="displayspinner" style={{ display: 'block', marginLeft: '48%', marginTop: '20%',marginBottom: '20%' }}>
                <div className="spinner-border  ml-2 text-dark spinner_format"  role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
                    : 
            <section class="about-section padding" >
                <div class="footer_" dangerouslySetInnerHTML={{__html:this.state.footer_content}}>
                </div>
            </section>
    }
            </div>
        );
    }
}

export default Footer;