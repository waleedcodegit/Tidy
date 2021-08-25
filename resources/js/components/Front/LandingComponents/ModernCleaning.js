import React, { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';
import Axios from 'axios';

class ModernCleaning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modern_lives : {}
        };
    }

    componentDidMount(){
        Axios.get('/api/edit-content').then(res=>{
            console.log(res)
           this.setState({
               modern_lives : res.data.data.modern_lives
           })
        })
    }

    render() {
        return (
            <section className="about-section padding">
              <div className="container" dangerouslySetInnerHTML={{__html:this.state.modern_lives}}>
                </div>  
            </section>
        );
    }
}

export default ModernCleaning;