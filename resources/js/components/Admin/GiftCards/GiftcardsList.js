import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
class GiftCardsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gift_cards: [],
        }
    }
    componentDidMount(){
        Axios.post(`/api/get_gift_cards`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            this.setState({
                gift_cards: res.data
            })
        })
    }
    render(){
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Gift Cards List</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Code</th>
                                            <th>Amount (AUD)</th>
                                            <th>Usage</th>
                                            <th>Recipient Email</th>
                                            <th>Sender Email</th>
                                            <th>Delivery Date</th>
                                            <th>Email Status</th>
                                            {/* <th>Usage</th>
                                            <th>Usage</th>
                                            <th>Usage</th> */}

                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.gift_cards.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{data.code}</td>
                                                            <td>{data.amount}</td>
                                                            <td>{data.usage}</td>
                                                            <td>{data.recipient_email}</td>
                                                            <td>{data.sender_email}</td>
                                                            <td>{data.delivery_date}</td>
                                                            <td>{data.email_status}</td>
                                                            {/* <td>{data.title}</td>
                                                            <td>{data.title}</td> */}
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.gift_cards.length == 0 ? 
                                                        <tr><td colSpan="8">No records founded</td></tr>:null
                                            }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default GiftCardsList;