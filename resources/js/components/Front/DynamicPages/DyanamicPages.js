import React, { Component } from 'react';
import Axios from 'axios';

class DynamicPages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page_content : {}
        };
    }

    componentDidMount(){
        let path = {
            slug: this.props.match.params.slug
        }
        Axios.post('/api/get-content', path).then(res=>{
            console.log(res)
           this.setState({
               page_content : res.data.content
           })
        })
    }

    render() {
        return (
            <section class="about-section padding" >
                <div class="Content_" dangerouslySetInnerHTML={{__html:this.state.page_content}}>
                </div>
            </section>
        );
    }
}

export default DynamicPages;