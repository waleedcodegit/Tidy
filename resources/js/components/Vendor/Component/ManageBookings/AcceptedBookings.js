import React, {Component} from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

class AcceptedBookings extends Component{

    constructor(props) {
        super(props);
        this.state = {
            AcceptedBookings: [],
            loading: true,
            vendor_id: this.props.vendor.data.vendor_id,
        };
    }

    componentDidMount(){
        Axios.post('/api/accepted-bookings',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>
            {
                console.log(res);
            // if(res.data.status == true){
                this.setState({
                    AcceptedBookings: res.data.AcceptedBookings,
                    loading:false
                })
            // }
        })
    }

    render(){
        return(
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
                        <h2>Accepted Bookings</h2>
                        <div className="row">
                            {
                                this.state.AcceptedBookings.map((data,index)=>{
                                    return(
                                        <div className="card col-sm-12">
                                <div className="col-sm-12">
                                    <div>
                                        <div className="card-content col-sm-12">
                                        <h3>{data.service.name}</h3>
                                        <h4><button onClick={()=>{window.open('/vendor/vendor-booking-details/'+data.information.booking_id,'_blank')}} 
                                                    key={index} style={{cursor:'pointer'}} 
                                                    className="btn btn-outline-success ml-auto">Manage Booking</button></h4>
                                        <div className="divid-line"/>
                                            <div className="card-detail-left">
                                                <ul>
                                                <li>Name:</li>
                                                              <li>Email:</li>
                                                              <li>Phone:</li>
                                                               <li>Booking Type: </li>
                                                               <li>Residential Type:</li>
                                                               <li>Address:</li>
                                                               <li>Price: </li>
                                                </ul>
                                            </div>
                                            <div className="card-detail-right">
                                                <ul>
                                                       <li>{data.customer.first_name+ ' '+data.customer.last_name}</li>
                                                           <li>{data.customer.email}</li>
                                                            <li>{data.customer.phone}</li>
                                                               <li>{data.booking_type == 1 ? "One Time" : "Recurring"}</li>
                                                               <li>{data.information.resident_type}</li>
                                                               <li>{data.information.location_address}</li>
                                                               <li>${data.booking_totals}</li>
                                                </ul>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                                    )
                                }
                                )}
                                      {
                                            this.state.AcceptedBookings.length == 0 ? 
                                            <h1 style={{margin:'auto', height:'70vh', display:'flex', alignItems: 'center', justifyContent: 'center'}}>No Data Founded</h1>:null
                                        }
                            
                        </div>
                    </div>
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
export default connect(mapStateToProps)(AcceptedBookings);