import Axios from 'axios';
import { data } from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class BookingsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote:"",
            proposal:"",
            vendor_id:"",
            booking_id:"",
            id:this.props.match.params.id,
            serviceBookings: [],
            vendor_id:this.props.vendor.data.vendor_id,

        };
    }

    componentDidMount(){
        Axios.post('/api/get_vendor_quote_by_id',{id:this.props.match.params.id}).then(res=>
            {
                console.log(res.data.vendorQuote.quote);
                this.setState({
                    quote: res.data.vendorQuote.quote,
                    proposal: res.data.vendorQuote.proposal,
                    vendor_id:this.props.vendor.data.vendor_id,
                    id:this.props.match.params.id,
                    
                })
                
        })
       
        }

    getQuotePrice(event) {
        this.setState({
            quote: event.target.value
        })
    }
    getProposal(event) {
        this.setState({
            proposal: event.target.value
        })
    }
    // UpdateQuote(event) {
        
    //     event.preventDefault();
    //     let senderData = {
    //         vendor_id: this.state.vendor_id,
    //         booking_id: this.props.match.params.id,
    //         quote:this.state.quote,
    //         proposal:this.state.proposal
    //     }
    //     let Configs = {
    //         headers: {
    //             token: window.localStorage.getItem('testapistring')
    //         }
    //     }
    //     // console.log(senderData);
    //     Axios.post(`/api/update_quote/${this.props.match.params.id}`, senderData , Configs).then(res=>{
    //         if(res.data.status == 200){
    //             this.props.history.push('/vendor/bookings-feed');
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Update Quote Successfully',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //         } else {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: res.data.msg,
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //         }
    //     })
    // }
    UpdateQuote(event) {
        
        event.preventDefault();
        let senderData = {
            vendor_id: this.state.vendor_id,
            booking_id: this.props.match.params.id,
            quote:this.state.quote,
            proposal:this.state.proposal,
            id:this.props.match.params.id
        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        // console.log(senderData);
        Axios.post('/api/update_quote', senderData , Configs ).then(res=>{
            if(res.data.status == 200){
                this.props.history.push('/vendor/bookings-feed');
                Swal.fire({
                    icon: 'success',
                    title: 'Update Quote Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    

    render() {
        return (
            <div>
                <section className="section">
                    <div className="section-body">
                        <h2>Edit Qoute </h2>
                        <div className="row">
                        <div className="card col-sm-12">
                                        <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="name">Qoute Price</label>
                                        <input value={this.state.quote} onChange={this.getQuotePrice.bind(this)} className="form-control"  type="text"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Proposal{this.props.match.params.id}</label>
                                        <textarea value={this.state.proposal} onChange={this.getProposal.bind(this)} className="form-control"  type="text"></textarea>
                                    </div>
                                    <div className="col-sm-12">
                                    <div className="form-group">
                                    <button 
                            onClick={this.UpdateQuote.bind(this)} 
                            type="submit" className="btn btn-primary">Update</button>
                                    </div>
                                </div>
                                </div>
                               
                       
                        </div>
                    </div></div>
                </section>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        vendor:state.vendor
    }
}
export default connect(mapStateToProps)(BookingsFeed);