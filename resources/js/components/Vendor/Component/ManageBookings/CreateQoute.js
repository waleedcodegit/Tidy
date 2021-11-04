import Axios from 'axios';
import { data } from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class BookingsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price:"",
            proposal:"",
            vendor_id:"",
            booking_id:"",
            id:this.props.match.params.id,
            serviceBookings: [],
            vendor_id:this.props.vendor.data.vendor_id,

        };
    }

    componentDidMount(){
        Axios.post('/api/get_vendor_booking_requests',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
            {
                // console.log(res);
                this.setState({
                    serviceBookings: res.data,
                    vendor_id:this.props.vendor.data.vendor_id,
                    booking_id:this.props.match.params.id
                })
                
        })
       
        }

    getQuotePrice(event) {
        this.setState({
            price: event.target.value
        })
    }
    getProposal(event) {
        this.setState({
            proposal: event.target.value
        })
    }
    createQuote(event) {
        
        event.preventDefault();
        let senderData = {
            vendor_id: this.state.vendor_id,
            booking_id: this.props.match.params.id,
            price:this.state.price,
            proposal:this.state.proposal
        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        // console.log(senderData);
        Axios.post('/api/create_quote', senderData , Configs).then(res=>{
            if(res.data.status == 200){
                this.props.history.push('/vendor/bookings-feed');
                Swal.fire({
                    icon: 'success',
                    title: 'Create Quote Successfully',
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
                        <h2>Create Qoute </h2>
                        <div className="row">
                        <div className="card col-sm-12">
                                        <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="name">Qoute Price</label>
                                        <input value={this.state.price} onChange={this.getQuotePrice.bind(this)} className="form-control"  type="text"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Proposal</label>
                                        <textarea value={this.state.proposal} onChange={this.getProposal.bind(this)} className="form-control"  type="text"></textarea>
                                    </div>
                                    <div className="col-sm-12">
                                    <div className="form-group">
                                    <button 
                            onClick={this.createQuote.bind(this)} 
                            type="submit" className="btn btn-primary">Submit</button>
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