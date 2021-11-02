import React, {Component} from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

class AcceptedBookings extends Component{

    constructor(props) {
        super(props);
        this.state = {
            AcceptedBookings: [],
            vendorId: this.props.vendor.data.vendor_id,
        };
    }

    componentDidMount(){
        Axios.post('/api/accepted-bookings',{vendorId:this.props.vendor.data.vendor_id}).then(res=>
            {
                console.log(res);
            if(res.data.status == true){
                this.setState({
                    AcceptedBookings: res.data.data,
                })
            }
        })
    }

    render(){
        return(
            <div>
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
                                        <h4><button onClick={()=>{window.open('/vendor/vendor-booking-details/'+data.service_id,'_blank')}} key={index} style={{cursor:'pointer'}} className="btn btn-outline-success ml-auto">Manage Booking</button></h4>
                                        <div className="divid-line"/>
                                            <div className="card-detail-left">
                                                <ul>
                                                    <li>Booking Type: </li>
                                                    <li>Residential Type:</li>
                                                    <li>Price:</li>
                                                </ul>
                                            </div>
                                            <div className="card-detail-right">
                                                <ul>
                                                    <li>{data.booking_type == 1 ? "One Time" : "Recurring"}</li>
                                                    <li>{data.service.type}</li>
                                                    <li>{data.booking_totals}</li>
                                                </ul>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                                    )
                                }
                                )}
                            
                        </div>
                    </div>
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
export default connect(mapStateToProps)(AcceptedBookings);