import React, {Component} from 'react';
import Axios from 'axios';

class AcceptedBookings extends Component{

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         AcceptedBookings: [],
    //     };
    // }

    // componentDidMount(){
    //     Axios.post('/api/accept-booking').then(res=>
    //         {
    //             console.log(res);
    //         if(res.data.status == true){
    //             this.setState({
    //                 AcceptedBookings: res.data.data,
    //             })
    //         }
    //     })
    // }

    render(){
        return(
            <div>
                <section className="section">
                    <div className="section-body">
                        <h2>Accepted Bookings</h2>
                        <div className="row">
                            <div className="card col-sm-12">
                                <div className="col-sm-12">
                                    <div>
                                        <div className="card-content col-sm-12">
                                        <h3>Accepted Bookings</h3>
                                        <div className="divid-line"/>
                                            <div className="card-detail-left">
                                                <ul>
                                                    <li>Booking Type: </li>
                                                    <li>Customer:</li>
                                                    <li>Price:</li>
                                                </ul>
                                            </div>
                                            <div className="card-detail-right">
                                                <ul>
                                                    <li>One Time</li>
                                                    <li>Zeeshan</li>
                                                    <li>$999</li>
                                                </ul>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default AcceptedBookings;