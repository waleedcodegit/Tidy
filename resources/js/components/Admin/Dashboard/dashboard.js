import Axios from 'axios';
import React, { Component } from 'react';
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            customers: '',
            vendors: '',
            bookings: '',
            employees: '',
            total_payments: '',
            sub_services: '',
            services: '',
        }
    }
        
        componentDidMount(){
            Axios.post('/api/customers-count').then(res=>
                {
                    console.log(res);
                if(res.data.status == 200){
                    this.setState({
                      customers: res.data.data,
                    })
                }
            })
            Axios.post('/api/vendor-count',).then(res=>
                {
                    console.log(res);
                if(res.data.status == 200){
                    this.setState({
                        vendors: res.data.data,
                    })
                }
            })
            Axios.post('/api/bookings-count').then(res=>
                {
                    console.log(res);
                if(res.data.status == 200){
                    this.setState({
                        bookings: res.data.data,
                    })
                }
            })
            Axios.post('/api/employees-count').then(res=>
                {
                    console.log(res);
                if(res.data.status == 200){
                    this.setState({
                        employees: res.data.data,
                    })
                }
            })
            Axios.post('/api/services-count').then(res=>
                {
                    console.log(res);
                if(res.data.status == 200){
                    this.setState({
                        services: res.data.data,
                    })
                }
            })
            Axios.post('/api/sub-services-count').then(res=>
                {
                    console.log(res);
                if(res.data.status == 200){
                    this.setState({
                        sub_services: res.data.data,
                    })
                }
            })
            Axios.post('/api/total-payments').then(res=>
                {
                    console.log(res);
                if(res.data.status == 200){
                    this.setState({
                        total_payments: res.data.data,
                    })
                }
            })
        }
    
    render() {
        return (
           
<>
 <div id="page-content" style={{marginTop: '150px'}}>
 <div className="row">
    <div className="col-md-3">
      <div className="panel panel-warning panel-colorful media middle pad-all">
        <div className="media-left">
          <div className="pad-hor">
            <i className="demo-pli-file-word icon-3x" />
          </div>
        </div>
        <div className="media-body">
          <p className="text-2x mar-no text-semibold">{this.state.customers}</p>
          <p className="mar-no">Customers</p>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="panel panel-info panel-colorful media middle pad-all">
        <div className="media-left">
          <div className="pad-hor">
            <i className="demo-pli-file-zip icon-3x" />
          </div>
        </div>
        <div className="media-body">
          <p className="text-2x mar-no text-semibold">{this.state.vendors}</p>
          <p className="mar-no">Vendors</p>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="panel panel-mint panel-colorful media middle pad-all">
        <div className="media-left">
          <div className="pad-hor">
            <i className="demo-pli-camera-2 icon-3x" />
          </div>
        </div>
        <div className="media-body">
          <p className="text-2x mar-no text-semibold">{this.state.bookings}</p>
          <p className="mar-no">Bookings</p>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="panel panel-danger panel-colorful media middle pad-all">
        <div className="media-left">
          <div className="pad-hor">
            <i className="demo-pli-video icon-3x" />
          </div>
        </div>
        <div className="media-body">
          <p className="text-2x mar-no text-semibold">{this.state.employees}</p>
          <p className="mar-no">Employees</p>
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-md-3">
      <div className="panel panel-warning panel-colorful media middle pad-all">
        <div className="media-left">
          <div className="pad-hor">
            <i className="demo-pli-file-word icon-3x" />
          </div>
        </div>
        <div className="media-body">
          <p className="text-2x mar-no text-semibold">{this.state.services}</p>
          <p className="mar-no">Services</p>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="panel panel-info panel-colorful media middle pad-all">
        <div className="media-left">
          <div className="pad-hor">
            <i className="demo-pli-file-zip icon-3x" />
          </div>
        </div>
        <div className="media-body">
          <p className="text-2x mar-no text-semibold">{this.state.sub_services}</p>
          <p className="mar-no">Sub Services</p>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="panel panel-mint panel-colorful media middle pad-all">
        <div className="media-left">
          <div className="pad-hor">
            <i className="demo-pli-camera-2 icon-3x" />
          </div>
        </div>
        <div className="media-body">
          <p className="text-2x mar-no text-semibold">${this.state.total_payments}</p>
          <p className="mar-no">Total Payments</p>
        </div>
      </div>
    </div>
    {/* <div className="col-md-3">
      <div className="panel panel-danger panel-colorful media middle pad-all">
        <div className="media-left">
          <div className="pad-hor">
            <i className="demo-pli-video icon-3x" />
          </div>
        </div>
        <div className="media-body">
          <p className="text-2x mar-no text-semibold">241</p>
          <p className="mar-no">Videos</p>
        </div>
      </div>
    </div> */}
  </div>
 
</div>
<div>
 
 
        </div>     
         </>
                               
            
            
        );
    }
}

export default Dashboard;