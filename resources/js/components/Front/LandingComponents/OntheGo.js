import React, { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';
import Axios from 'axios';

class OntheGo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            get_leads : {},
            loading:true,
        };
    }

    componentDidMount(){
        Axios.get('/api/edit-content').then(res=>{
            console.log(res)
           this.setState({
               get_leads : res.data.data.get_leads,
               loading:false
           
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
            <section className="work-pro-section ">
                <div className="container" dangerouslySetInnerHTML={{__html:this.state.get_leads}}>
                </div>
            </section>
            } 
            </div>
        );
    }
}

export default OntheGo;