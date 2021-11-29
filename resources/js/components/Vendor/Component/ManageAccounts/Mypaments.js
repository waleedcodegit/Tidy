import Axios from 'axios';
import { data } from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

class Mypaments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vendorpayment:[],
            vendor_id:"",
            id:this.props.match.params.id,
            Vendorwithdrawrequest: [],
            vendor_id:this.props.vendor.data.vendor_id,
            loading:true,

        };
    }

    componentDidMount(){
        Axios.post('/api/get_vendor_payment',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
            {
                console.log(res);
                this.setState({
                    vendorpayment: res.data.vendorpayment,
                    vendor_id:this.props.vendor.data.vendor_id,
                    booking_id:this.props.match.params.id,
                    loading:false,
                })
                
        })
        Axios.post('/api/get_withdraw_amount_request',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    Vendorwithdrawrequest: res.data.Vendorwithdrawrequest,
                    loading:false,
                })
            //    this.props.history.push('/admin/service_check_list'); 
            } 
        })
       
        }

    // getQuotePrice(event) {
    //     this.setState({
    //         price: event.target.value
    //     })
    // }
    // getProposal(event) {
    //     this.setState({
    //         proposal: event.target.value
    //     })
    // }
    // createQuote(event) {
        
    //     event.preventDefault();
    //     let senderData = {
    //         vendor_id: this.state.vendor_id,
    //         booking_id: this.props.match.params.id,
    //         price:this.state.price,
    //         proposal:this.state.proposal
    //     }
    //     let Configs = {
    //         headers: {
    //             token: window.localStorage.getItem('testapistring')
    //         }
    //     }
    //     // console.log(senderData);
    //     Axios.post('/api/create_quote', senderData , Configs).then(res=>{
    //         if(res.data.status == 200){
    //             this.props.history.push('/vendor/bookings-feed');
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Create Quote Successfully',
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
    

    render() {
        return (
            <div>
                 {
          this.state.loading ?
         
              <div id="displayspinner text-center mt-5 " className="text-center" style={{ display: 'block', position:'center' }}>
                  <div className="spinner-border  ml-2 text-dark spinner_format" role="status">
                      <span className="sr-only">Loading...</span>
                  </div>
              </div>
              :
                <section className="section">
                    <div className="section-body">
                        <h2>My Payments </h2>
                    </div>

                <div className="row">
                        <div className="card col-sm-12">
                                        <div className="col-sm-12">
                       
                            <table id="demo-dt-basic" style={{marginTop:6}} className="table table-striped table-bordered mt-2" cellSpacing="0" width="100%">
                                
                                    <tr>
                                        <th>Sr</th>
                                        <th>Date</th>
                                        <th>Payment Id</th>
                                        <th>Service Id</th>
                                        <th>Payment</th>
                                    </tr>
                                        {
                                            this.state.vendorpayment.map((data,index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.date}</td>
                                                        <td>{data.payment_id}</td>
                                                        <td>{data.service_id}</td>
                                                        <td>${data.payment}</td>
                                                        
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
                        </section>}
    
    
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        vendor:state.vendor
    }
}
export default connect(mapStateToProps)(Mypaments);