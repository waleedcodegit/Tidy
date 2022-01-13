import React, { Component } from 'react';
import Axios from 'axios';

class DynamicPages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page_content : {},
            loading:true
        };
    }

    componentDidMount(){
        let path = {
            slug: this.props.match.params.slug
        }
        Axios.post('/api/get-content', path).then(res=>{
            console.log(res)
           this.setState({
               page_content : res.data.content,
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
                <div class="Content_" dangerouslySetInnerHTML={{__html:JSON.parse(this.state.page_content)}}>
                </div>
            </section>
    }
    </div>
        );
    }
}

export default DynamicPages;