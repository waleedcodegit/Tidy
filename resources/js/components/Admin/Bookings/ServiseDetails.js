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
            id:this.props.match.params.id
        }
    }
    componentDidMount(){
        Axios.post('/api/get_booking_by_id',{id:this.props.match.params.id}).then(res=>{
            console.log(res.data);
            this.setState({
                booking:res.data.data,
                name:res.data.data.service.name,
                type:res.data.data.service.type,
                residential_type:res.data.data.service.residential_type,
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
                                <h3 className="panel-title">Service Details</h3>
                            </div>
                            <div className="panel-body">
                           
                                                         <table className="table table-hover table-light table-borderless">
                                                         <thead>
                                                             <tr>
                                                                 <th>Service Name</th>
                                                                 {/* <th>Date</th>
                                                                 <th>Time</th> */}
                                                                 <th>Type</th>
                                                                 <th>Residential Type</th>
                                                                 <th>Price</th>
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
                                                                        <td>${this.state.booking.booking_totals}</td>
                                                                        {/* <td><span className={this.state.booking.payment_status == 1 ? "paid-cls": "due-cls"}>{this.state.booking.payment_status == 1 ? 'Paid' : 'Due Payment'}</span></td> */}
                                                                        {/* <td>
                                                              <Link to ={`/admin/service-details/${this.state.booking.service.id}`}> 
                                                            <button className="btn btn-success"> Details</button>
                                                            </Link> 
                                                            </td> */}
                                                                    </tr>
                                                           
                                                             
                                                         </tbody>
                                                     </table>
                                                    
                                                     
                               
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default ServiseDetails;