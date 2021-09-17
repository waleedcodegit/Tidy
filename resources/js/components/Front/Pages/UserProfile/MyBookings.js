import Axios from 'axios';
import React, { Component } from 'react';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';

class MyBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings:[],
            nodata:false
        };
    }
     componentDidMount(){
         toast.loading('Loading Bookings',{position:'bottom-center',style:{
             background:'#8BBBDF',
             color:'#fff'
         }});
        Axios.post('/api/get_customer_bookings',{customer_id:this.props.user.data.id}).then(res=>{
            console.log(res);
            toast.remove();
            if(res.data.status == 200){
                this.setState({
                    bookings:res.data.bookings
                })
            }else{
                this.setState({
                    nodata:true
                })
            }
        })
     }
    render() {
        return (
            <div className="tab-pane fade active in show" id="services" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="row">
                                                {
                                                    this.state.bookings.map((data,index)=>{
                                                        return(
                                                            <div onClick={()=>{window.open('/booking-details/'+data.id,'_blank')}} key={index} style={{cursor:'pointer'}} className="col-sm-12 padding-15">
                                                                <div className="blog-item profile-shadow">
                                                                    <div className="card-content">
                                                                        <h3>{data.sub_service ? data.sub_service.name : data.sub_service.name}</h3>
                                                                        <h4> {data.date}</h4>
                                                                        <div className="divid-line" />
                                                                        <div className="card-detail-left">
                                                                            <ul>
                                                                                <li>Booking Type</li>
                                                                                <li>Vendor</li>
                                                                                <li>Price</li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="card-detail-right">
                                                                            <ul>
                                                                                <li>{data.booking_type == 1 ? 'One Time' : 'Recurring'}</li>
                                                                                <li>Stephany Wikins</li>
                                                                                <li><span>$ {data.booking_totals}</span></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                
                                               
                                            </div>
                                            <ul className="pagination-wrap text-right mt-30">
                                                <li><a href="#"><i className="ti-arrow-left" /></a></li>
                                                <li><a href="#">1</a></li>
                                                <li><a href="#" className="active">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li><a href="#"><i className="ti-arrow-right" /></a></li>
                                            </ul>
                                        </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(MyBookings);
