import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
class ServiseDetails extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            booking:{},
            service:{},
            name:'',
            residential_type:'',
            type:'',
            subcategory:[],
            id:this.props.match.params.id
        }
    }
    componentDidMount(){
        Axios.post('/api/get_service_by_id',{id:this.props.match.params.id}).then(res=>{
            console.log(res);
            this.setState({
                subcategory:res.data.category.subcategory,
                name:res.data.category.name,
                type:res.data.category.type,
                residential_type:res.data.category.residential_type,
                loading:false
            })
        })
    }
    deleteCity(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-city',data).then(res=>{
            Swal.fire({
                icon: 'success',
                title: 'Successfully Deleted',
                showConfirmButton: false,
                timer: 1500
            })
            this.componentDidMount();
        })
    }

    render(){
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title" >Service Details</h3>
                            </div>
                            <div className="panel-body">
                           
                            <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                                         <thead>
                                                             <tr>
                                                                 <th>Service Name</th>
                                                                 {/* <th>Date</th>
                                                                 <th>Time</th> */}
                                                                 <th>Type</th>
                                                                 <th>Residential Type</th>
                                                                 {/* <th>Price</th> */}
                                                                 {/* <th>Payment Status</th> */}
                                                                 {/* <th>Action</th> */}
                                                             </tr>
                                                         </thead>
                                                         <tbody>
                                                         
                                                                    <tr>
                                                                        <td>{this.state.name}</td>
                                                                        {/* <td>{this.state.booking.date}</td>
                                                                        <td>{this.state.booking.time}</td> */}
                                                                        <td>{this.state.type}</td>
                                                                        <td>{this.state.residential_type == 1? 'HOME':'Busines'}</td>
                                                                        {/* <td>${this.state.booking.booking_totals}</td> */}
                                                                        {/* <td><span className={this.state.booking.payment_status == 1 ? "paid-cls": "due-cls"}>{this.state.booking.payment_status == 1 ? 'Paid' : 'Due Payment'}</span></td> */}
                                                                        {/* <td>
                                                              <Link to ={`/admin/service-details/${this.state.booking.service.id}`}> 
                                                            <button className="btn btn-success"> Details</button>
                                                            </Link> 
                                                            </td> */}
                                                                    </tr>
                                                           
                                                             
                                                         </tbody>
                                                
                                                     </table>
                                                     <div className="panel-heading">
                                                  <h3 className="panel-title" >Sub Services</h3>
                                                      </div>
                                                      <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                     <thead>
                                        <tr>
                                        <th>Sr</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Service Name</th>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.subcategory.map((data,index)=>{
                                                return(
                                                        <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.name}</td>
                                                           <td>${data.price}</td>
                                                           <td>{this.state.name}</td>
                                                              
                                                        
                                                    </tr>
                                                 )
                                            })
                                        }
                                        {
                                            this.state.subcategory.length == 0 ? 
                                            <tr><td colSpan="7">No Sub Service Avalibale</td></tr>:null
                                        }
                                    </tbody>
                                                     </table>
                                                    
                                                     
                                                     </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
        );
    }
}

export default ServiseDetails;