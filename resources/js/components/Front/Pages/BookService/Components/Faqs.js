import Axios from 'axios';
import React, { Component } from 'react';
 
class BookingFaqs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faqs:[]
        };
    }
    componentDidMount(){
        Axios.post('/api/get_faqs_by_type',{type:2}).then(res=>{
            console.log(res);
            this.setState({
                faqs:res.data
            })
        })
    } 
    render() { 
        return (
            <div className="content">
            <h1>FAQs</h1>
            {/* __________________________ SECTIONS ___________________________ */} 
            {/* <h3>OUR BOOKS &amp; MATERIALS</h3> */}
            <div className="faq-sec">
                {
                    this.state.faqs.map((data,index)=>{
                        return(
                            <div>
                            <input type="checkbox" id={"question1"+index+1} name="q" className="questions" />
                            <label htmlFor={"question1"+index+1} className="question">
                                <div className="plus ">+</div>
                               {data.question}
                            </label>
                            <div className="answers">
                                <p> {data.answer} </p>
                            </div>
                            </div>

                        )
                    })
                }   
            </div>
            </div>

        );
    }
}
 
export default BookingFaqs;