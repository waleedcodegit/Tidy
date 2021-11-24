import Axios from 'axios';
import { data } from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';

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
            loading:false,

        };
    }

    componentDidMount(){
        Axios.post('/api/get_vendor_wallet',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
            {
                console.log(res);
                this.setState({
                    wallet: res.data.vendorwallet.wallet,
                    loading:false,
                    })
                
        })
        Axios.post('/api/get_vendor_booking_requests',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
            {
                // console.log(res);
                this.setState({
                    serviceBookings: res.data,
                    vendor_id:this.props.vendor.data.vendor_id,
                    loading:false,
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
        this.setState({ loading : true});
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
                    toast.success('Added WithDraw',{position: "bottom-center"});
                    
                //     Swal.fire({
                //         icon: 'success',
                //         title: 'Done',
                //         showConfirmButton: false,
                //         timer: 1500
                //     })
                // } else {
                //     Swal.fire({
                //         icon: 'error',
                //         title: res.data.msg,
                //         showConfirmButton: false,
                //         timer: 1500
                //     })
                }
            })
        } else {
            this.props.history.push('/vendor/vendor_wallet');
            toast.error('Insufcient Balance in your wallet',{position: "bottom-center"});
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Insufcient Balance in your wallet',
            //     showConfirmButton: false,
            //     timer: 1500
            // })
            setTimeout(() => {
                this.setState({ loading : false});
              }, 2000);
    }
}
    

    render() {
        const {loading} = this.state;
        return (
            <div>
                 {
              this.state.loading ?
         
              <div id="displayspinner text-center mt-5 " className="text-center" style={{ display: 'block', }}>
                  <div className="spinner-border  ml-2 text-dark spinner_format" role="status">
                      <span className="sr-only">Loading...</span>
                  </div>
              </div>
              :
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
                            type="submit" className="btn btn-primary"
                            disabled={loading}>
                                  { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                    { loading && <span > Loading...</span>}
                                     { !loading && <span >Submit</span>}
                               </button></Link>
                                    </div>
                                </div>
                                </div>
                               
                       
                        </div>
                    </div></div>
                </section>
    }
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