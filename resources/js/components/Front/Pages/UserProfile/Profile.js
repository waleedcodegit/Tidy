import React, { Component } from 'react';
import { connect } from 'react-redux';
import { img_baseurl } from '../../../Configs/Api';
import EditProfile from './EditProfile';
import MessageAdmin from './MessageAdmin';
import MyBookings from './MyBookings';
import PaymentCards from './PaymentCards';

class Profile extends Component {
    
    
    render() {
        return (
            <div>

                {/* <section className="page-header padding">
                    <div className="container">
                        <div className="page-content text-center">
                            <h2>Profile</h2>
                        </div>
                    </div>
                </section> */}
                {
                    this.props.user.is_login ?

                <section className="blog-section padding pr-sec">
                    <div className="container">
                        <div className="blog-wrap row">
                            <div className="col-lg-4 padding-15">
                                <div className="sidebar-wrap">
                                    <div className="blog-item profile-shadow">
                                        <div className="profile-image">
                                            <img src={img_baseurl+this.props.user.data.image} alt="post" className="profile-thumb" />
                                        </div>
                                        <div className="profile-content">
                                            <h3>{this.props.user.data.first_name} {this.props.user.data.last_name}</h3>
                                            {/* <p>Business Man</p> */}
                                            <div className="divid-line" />
                                            <div className="detail-left">
                                                <ul>
                                                    <li>From</li>
                                                    <li>Member since</li>
                                                    <li>Phone</li>
                                                </ul>
                                            </div>
                                            <div className="detail-right">
                                                <ul>
                                                    <li>Australia</li>
                                                    <li>July 2016</li>
                                                    <li>{this.props.user.data.phone}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 sm-padding">
                                <div className="cycle-tab-container">
                                    <ul className="nav nav-tabs">
                                        <li className="cycle-tab-item ">
                                            <a className="nav-link active" role="tab" data-toggle="tab" href="#services" aria-expanded>
                                            <img src="https://img.icons8.com/ios/16/000000/dot-logo.png "></img> Services
                                             </a>
                                        </li>
                                        <li className="cycle-tab-item">
                                            <a className="nav-link" role="tab" data-toggle="tab" href="#message">
                                            <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/16/000000/external-message-chat-flatart-icons-outline-flatarticons-4.png"/> Messages</a>
                                        </li>
                                        <li className="cycle-tab-item">
                                            <a className="nav-link" role="tab" data-toggle="tab" href="#profile">
                                            <img src="https://img.icons8.com/material-outlined/16/000000/edit--v1.png"/> Edit Profile</a>
                                        </li>
                                        
                                        <li className="cycle-tab-item">
                                            <a className="nav-link" role="tab" data-toggle="tab" href="#payment">
                                            <img src="https://img.icons8.com/ios/16/000000/bank-card-back-side.png"/> Payment Card</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <MyBookings></MyBookings>
                                        <MessageAdmin></MessageAdmin>
                                        <EditProfile></EditProfile>
                                       <PaymentCards></PaymentCards>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <>
                {
                    this.props.user.is_login == false && this.props.user.is_apicall == true ?
                    <div id="displayspinner" className="text-center" style={{ display: 'block', marginTop: '20%',marginBottom: '20%' }}>
                            <h1>Sorry, you are not logged in.</h1>
                            <h4>Please Log In</h4>
                            <br></br>

                            {/* <button className="btn btn-success" onClick={()=>{window.open('/login','_slef')}}>Login</button> */}
                    </div>
                    :  <div id="displayspinner" style={{ display: 'block', marginLeft: '48%', marginTop: '20%',marginBottom: '20%' }}>
                            <div className="spinner-border  ml-2 text-dark spinner_format"  role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                </div>
                }
                </>
               
                }
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(Profile);