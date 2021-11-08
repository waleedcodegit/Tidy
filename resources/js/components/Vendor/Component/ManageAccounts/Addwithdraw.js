import Axios from 'axios';
import { data } from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

class Addwithdraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            withdraw:"",
            wallet:"",
            vendor_id:"",
            booking_id:"",
            id:this.props.match.params.id,
            serviceBookings: [],
            vendor_id:this.props.vendor.data.vendor_id,

        };
    }

    componentDidMount(){
        Axios.post('/api/get_vendor_wallet',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
            {
                console.log(res);
                this.setState({
                    wallet: res.data.vendorwallet.wallet,
                    })
                
        })
        Axios.post('/api/get_vendor_booking_requests',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
            {
                // console.log(res);
                this.setState({
                    serviceBookings: res.data,
                    vendor_id:this.props.vendor.data.vendor_id,
                })
                
        })
        // Axios.post('/api/get_vendor_wallet',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
        //     {
        //         console.log(res);
        //         this.setState({
        //             wallet: res.data.vendorwallet.wallet,
        //             vendor_id:this.props.vendor.data.vendor_id,
        //             booking_id:this.props.match.params.id
        //         })
                
        // })
       
        }

        getWithdraw(event) {
        this.setState({
            withdraw: event.target.value
        })
    }

    AddWithdraw(event) {
        
        event.preventDefault();
        if(this.state.wallet  >=  this.state.withdraw){
            let senderData = {
                vendor_id: this.state.vendor_id,
                withdraw:this.state.withdraw,
                wallet: this.state.wallet,
            }
            let Configs = {
                headers: {
                    token: window.localStorage.getItem('testapistring')
                }
            }
            // console.log(senderData);
            Axios.post('/api/add_withdraw', senderData , Configs).then(res=>{
                if(res.data.status == 200){
                    this.props.history.push('/vendor/vendor_wallet');
                    Swal.fire({
                        icon: 'success',
                        title: 'Done',
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
        } else {
            this.props.history.push('/vendor/vendor_wallet');
            Swal.fire({
                icon: 'error',
                title: 'Insufcient Balance in your wallet',
                showConfirmButton: false,
                timer: 1500
            })
        
    }
}
    

    render() {
        return (
            <div>
                <section className="section">
                    <div className="section-body">
                        <h2>Request Withdraw </h2>
                        <div className="row">
                        <div className="card col-sm-12">
                                        <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="name">Enter Amount</label>
                                        <input value={this.state.withdraw} onChange={this.getWithdraw.bind(this)} className="form-control"  type="text"></input>
                                    </div>
                                    
                                    <div className="col-sm-12">
                                    <div className="form-group">
                                    <Link to={`/vendor/add_withdraw`}> <button 
                            onClick={this.AddWithdraw.bind(this)} 
                            type="submit" className="btn btn-primary">Submit</button></Link>
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
export default connect(mapStateToProps)(Addwithdraw);