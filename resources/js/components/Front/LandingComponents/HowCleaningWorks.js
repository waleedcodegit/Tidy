import axios from 'axios';
import React, { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';

class HowCleaningWorks extends Component {

    constructor(props){
        super(props);
        this.state = {
            how_cleaning_works : '',
        }
    }

    componentDidMount(){
        axios.get('/api/edit-content').then(res => {
            this.setState({
                how_cleaning_works : res.data.data.how_cleaning_works
            })
        })

    }

    render() {
        return (
            <section className="testimonial-section bg-grey padding">
                <div className="container" dangerouslySetInnerHTML={{__html:this.state.how_cleaning_works}}>
                </div>
            </section>
        );
    }
}

export default HowCleaningWorks;