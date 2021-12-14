import axios from 'axios';
import React, { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';

class HowCleaningWorks extends Component {

    constructor(props){
        super(props);
        this.state = {
            how_cleaning_works : '',
            loading:true,
        }
    }

    componentDidMount(){
        axios.get('/api/edit-content').then(res => {
            this.setState({
                how_cleaning_works : res.data.data.how_cleaning_works,
                loading:false
            })
        })
        axios.post('/api/get_app_status')

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
           
            <section className="testimonial-section bg-grey padding">
                <div className="container" dangerouslySetInnerHTML={{__html:this.state.how_cleaning_works}}>
                </div>
            </section>
    }
             </div>
                
        );
    }
}

export default HowCleaningWorks;