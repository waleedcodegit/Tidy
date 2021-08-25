import React, { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';
import Axios from 'axios';

class OntheGo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            get_leads : {}
        };
    }

    componentDidMount(){
        Axios.get('/api/edit-content').then(res=>{
            console.log(res)
           this.setState({
               get_leads : res.data.data.get_leads
           })
        })
    }

    render() {
        return (
            <section className="work-pro-section ">
                <div className="container" dangerouslySetInnerHTML={{__html:this.state.get_leads}}>
                </div>
            </section>
        );
    }
}

export default OntheGo;