import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Main from './Main';
class VendorIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDropDown:false,
            notifications:[]
        };
        console.log(this.props);
    }
    ProfileDropDown(){
        console.log(this.state)
        this.setState({
            profileDropDown: !this.state.profileDropDown
        },function(){
            console.log(this.state.profileDropDown)
        })
    }
    componentDidMount(){
        setTimeout(()=>{
            Axios.post('/api/get_vendor_notifications',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>{
                this.setState({
                    notifications:res.data
                })
            })
        },5000)
    }
    render() { 
        return (
            <div id="app container-fluid">
                <div className="main-wrapper main-wrapper-1">
                    <div className="navbar-bg" />
                    <nav className="navbar navbar-expand-lg main-navbar sticky">
                    <div className="form-inline ">
                        <ul className="navbar-nav mr-3">
                        <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg
                                                    collapse-btn"> <i data-feather="align-justify" /></a></li>
                    
                        </ul>
                    </div>
                    <ul className="navbar-nav navbar-right" style={{marginLeft:'70%'}}>
                        
                    
                        <li className="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg"><i data-feather="bell" className="bell" />
                        </a>
                        <div className="dropdown-menu dropdown-list dropdown-menu-right pullDown">
                            <div className="dropdown-header">
                            Notifications
                            <div className="float-right">
                                <a href="#">Mark All As Read</a>
                            </div>
                            </div>
                            <div className="dropdown-list-content dropdown-list-icons">
                            {
                                this.state.notifications.map((data,index)=>{
                                    return(
                                        <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-success text-white"> <i className="fas
                                                                fa-check" />
                                            </span> <span className="dropdown-item-desc"> <b>{data.title}</b>  <span className="time">12
                                                Hours
                                                Ago</span>
                                            </span>
                                        </a> 
                                    )
                                })
                            }
                            {
                                this.state.notifications.length == 0 ?
                                <a href="#" className="dropdown-item text-center">  <span className="dropdown-item-desc"> <b> You have no Notifications!</b></span>
                                            
                                        </a> 
                                        :
                                        null
                            }
                          
                            </div>
                            <div className="dropdown-footer text-center">
                            <a href="#">View All <i className="fas fa-chevron-right" /></a>
                            </div>
                        </div>
                        </li>
                        {/* <li  ><a onClick={this.ProfileDropDown.bind(this)}   className="nav-link  nav-link-lg nav-link-user"> <img alt="image" src="/vendor-assets/img/user.png" className="user-img-radious-style" /> <span className="d-sm-none d-lg-inline-block" /></a>
                        <div className={this.state.profileDropDown ? "dropdown-menu dropdown-menu-right pullDown show " : "dropdown-menu dropdown-menu-right pullDown"}>
                        {/* <div className="dropdown-menu dropdown-menu-right pullDown"> 
                            
                            <div className="dropdown-title">Hello Sarah Smith</div>
                            <a href="profile.html" className="dropdown-item has-icon"> <i className="far
                                                        fa-user" /> Profile
                            </a> <a href="timeline.html" className="dropdown-item has-icon"> <i className="fas fa-bolt" />
                            Activities
                            </a> <a href="#" className="dropdown-item has-icon"> <i className="fas fa-cog" />
                            Settings
                            </a>
                            <div className="dropdown-divider" />
                            <a href="auth-login.html" className="dropdown-item has-icon text-danger"> <i className="fas fa-sign-out-alt" />
                            Logout
                            </a>
                        </div>
                        </li> */}
                    </ul>
                    </nav>
                    <div className="main-sidebar sidebar-style-2">
                    <aside id="sidebar-wrapper">
                        <div className="sidebar-brand">
                        <a href="index.html"> <img alt="image" src="/images/site-logo.png" className="header-logo" /> <span className="logo-name">Tidy Vendor Dashboard</span>
                        </a>
                        </div>
                        <ul className="sidebar-menu">
                        <li className="menu-header">Main</li>
                        <li className="dropdown active">
                            <Link href="index.html" className="nav-link"><i data-feather="monitor" /><span>Dashboard</span></Link>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="briefcase" /><span>Manage Bookings</span></a>
                            <ul className="dropdown-menu">
                            
                            <li><Link className="nav-link" to="/vendor/bookings-feed">Bookings Feed</Link></li>
                            <li><Link  className="nav-link" to="/vendor/accepted-bookings">My Bookings</Link></li>
                           
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="command" /><span>Manage Accounts</span></a>
                            <ul className="dropdown-menu">
                            <li><Link className="nav-link" to="/vendor">Wallet</Link></li>
                            <li><Link className="nav-link" to="/vendor">Withdraw Request</Link></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="mail" /><span>Messages</span></a>
                            <ul className="dropdown-menu">
                                <li><Link className="nav-link" to="/vendor/message-admin">Message Admin</Link></li>
                                <li><Link className="nav-link" to="/vendor/customer-messages">Customer Messages</Link></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="mail" /><span>Manage Employees</span></a>
                            <ul className="dropdown-menu">
                                <li><Link className="nav-link" to="/vendor/employee-list">Employees</Link></li>
                                <li><Link className="nav-link" to="/vendor/create-employee">Add Employee</Link></li>
                            </ul>
                        </li>
                        {/* <li className="menu-header">UI Elements</li> */}
                        <li className="dropdown">
                            <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="copy" /><span>Settings</span></a>
                            <ul className="dropdown-menu">
                            <li><Link to={'/vendor/profile'} className="nav-link"> Profile</Link></li>
                            {/* <li><a className="nav-link" href="/vendor">Accounts</a></li> */}
                            </ul>
                        </li>
                        
                    
                    
                    </ul>
                        
                    </aside>
                    </div>
                    {/* Main Content */}
                    <div className="main-content">
                    {
                        this.props.vendor.is_login ? 
                        <Main></Main>
                        :
                        <div className="text-center">
                            <img  style={{marginTop:'5%'}} src="/images/spinner.gif"></img>
                        </div>
                    }
                    
                    
                    </div>
                    {/* <footer className="main-footer">
                    <div className="footer-left">
                        <a href="templateshub.net">Tidy Home</a>
                    </div>
                    <div className="footer-right">
                    </div>
                    </footer> */}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        vendor:state.vendor
    }
}
export default connect(mapStateToProps)(VendorIndex);