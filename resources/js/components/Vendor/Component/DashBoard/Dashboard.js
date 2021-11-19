import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import { img_baseurl } from '../../../Configs/Api';
import { connect } from 'react-redux';

 
class DashBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            customers: '',
            bookings: '',
            customers: '',
            wallet:'',
            payments:'',
            // loading:true,
         vendor_id: this.props.vendor.data.vendor_id,
        }
    }
    
componentDidMount(){
    Axios.post('/api/customers-list-count',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
      {
          console.log(res);
      if(res.data.status == 200){
          this.setState({
            customers: res.data.data,
            // loading:false,
          })
      }
  })
  Axios.post('/api/bookings-list-count',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
    {
        console.log(res);
    if(res.data.status == 200){
        this.setState({
            bookings: res.data.data,
            loading:false,
        })
    }
})
Axios.post('/api/get_vendor_wallet',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
    {
        console.log(res);
    if(res.data.status == 200){
        this.setState({
            wallet: res.data.vendorwallet.wallet,
        })
    }
})
Axios.post('/api/get_vendor_payments',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
    {
        console.log(res);
    if(res.data.status == 200){
        this.setState({
           payments: res.data.data,
           loading:false,
        })
    }
})
 }
    render() { 
        return (
            <div>
                 {/* {
                    this.state.loading ?
                   
                        <div id="displayspinner text-center mt-5 " className="text-center" style={{ display: 'block', }}>
                            <div className="spinner-border  ml-2 text-dark spinner_format" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        : */}
            <section class="section">
                <div class="row ">
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="card">
                    <div class="card-statistic-4">
                        <div class="align-items-center justify-content-between">
                        <div class="row ">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="col-sm-12">
                                   <h2 style={{color: "red"}}>{this.state.bookings}</h2>
                                   <h4 style={{color: "red"}}>Your Booking</h4>
                                    <div className="col-sm-12">
                                    
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div class="banner-img">
                                <img src="/vendor-assets/img/banner/1.png" alt />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="card">
                    <div class="card-statistic-4">
                        <div class="align-items-center justify-content-between">
                        <div class="row ">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="col-sm-12">
                                   <h2 style={{color: "red"}}>{this.state.customers}</h2>
                                   <h4 style={{color: "red"}}>Customers</h4>
                                    <div className="col-sm-12">
                           </div> 
                            </div> 
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div class="banner-img">
                                <img src="/vendor-assets/img/banner/2.png" alt />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="card">
                    <div class="card-statistic-4">
                        <div class="align-items-center justify-content-between">
                        <div class="row ">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="col-sm-12">
                                   <h2 style={{color: "red"}}>${this.state.wallet}</h2>
                                   <h4 style={{color: "red"}}>Wallet</h4>
                                    <div className="col-sm-12">
                           </div> 
                            </div> 
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div class="banner-img">
                            <img src="/vendor-assets/img/banner/3.png" alt />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="card">
                    <div class="card-statistic-4">
                        <div class="align-items-center justify-content-between">
                        <div class="row ">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="col-sm-12">
                                   <h2 style={{color: "red"}}>${this.state.payments}</h2>
                                   <h4 style={{color: "red"}}>Revenue</h4>
                                    <div className="col-sm-12">
                           </div> 
                            </div> 
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div class="banner-img">
                                <img src="/vendor-assets/img/banner/4.png" alt />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
               
                </div>
              
                
                <div class="row">
                <div class="col-12 col-sm-12 col-lg-12">
                    <div class="card ">
                    <div class="card-header">
                        <h4>Revenue chart</h4>
                        <div class="card-header-action">
                        <div class="dropdown">
                            <a href="#" data-toggle="dropdown" class="btn btn-warning dropdown-toggle">Options</a>
                            <div class="dropdown-menu">
                            <a href="#" class="dropdown-item has-icon"><i class="fas fa-eye" /> View</a>
                            <a href="#" class="dropdown-item has-icon"><i class="far fa-edit" /> Edit</a>
                            <div class="dropdown-divider" />
                            <a href="#" class="dropdown-item has-icon text-danger"><i class="far fa-trash-alt" />
                                Delete</a>
                            </div>
                        </div>
                        <a href="#" class="btn btn-primary">View All</a>
                        </div>
                    </div>
                   
                </div>
                </div>
                </div>
                </section>
    {/* } */}
    </div>
        );
    }
}
 
const mapStateToProps = (state) =>{
    return{
        vendor:state.vendor
    }
  }
  export default connect(mapStateToProps)(DashBoard);