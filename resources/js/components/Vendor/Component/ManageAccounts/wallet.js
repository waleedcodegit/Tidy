import Axios from 'axios';
import { data } from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

class wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet:"",
            vendor_id:"",
            id:this.props.match.params.id,
            Vendorwithdrawrequest: [],
            vendor_id:this.props.vendor.data.vendor_id,
        };
    }
    componentDidMount(){
        Axios.post('/api/get_vendor_wallet',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
            {
                this.setState({
                    wallet: res.data.vendorwallet.wallet,
                    vendor_id:this.props.vendor.data.vendor_id,
                    booking_id:this.props.match.params.id
                })
                
        })
        Axios.post('/api/get_withdraw_amount_request',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    Vendorwithdrawrequest: res.data.Vendorwithdrawrequest
                })
            } 
        })
        }
    render() {
        return (
            <div>
                <section className="section">
                    <div className="section-body">
                        <h2>Wallet </h2>
                        <div className="row">
                        <div className="card col-sm-12" >
                                        <div className="col-sm-12">
                                   <h2 style={{color: "red"}}>${this.state.wallet}</h2>
                                   <h4 style={{color: "red"}}>Your Wallet</h4>
                                    <div className="col-sm-12">
                                    <div className="form-group">
                                    <Link to={`/vendor/add_withdraw/${this.props.vendor.data.vendor_id}`}><button  className="btn btn-primary">Request Withdraw</button></Link>
                                    </div>
                                </div>
                                </div>
                        </div>
                    </div>
                    </div>

                </section>
                <div className="row">
                        <div className="card col-sm-12">
                                        <div className="col-sm-12">
                       
                            <table id="demo-dt-basic" style={{marginTop:6}} className="table table-striped table-bordered mt-2" cellSpacing="0" width="100%">
                                
                                    <tr>
                                        <th>Sr</th>
                                        <th>Date</th>
                                        <th>Withdraw Amount</th>
                                        <th>Strip Response</th>
                                        <th>Status</th>
                                    </tr>
                                        {
                                            this.state.Vendorwithdrawrequest.map((data,index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.date}</td>
                                                        <td>${data.withdraw_amount}</td>
                                                        <td>{data.strip_response}</td>
                                                        <td>{data.status == 0 ? "Pending": "Sucseed"}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                                    this.state.Vendorwithdrawrequest.length == 0 ? 
                                                    <tr><td colSpan="5">No records founded</td></tr>:null
                                        }
                                
                            </table>
                        </div>
                        </div>
                        </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        vendor:state.vendor
    }
}
export default connect(mapStateToProps)(wallet);