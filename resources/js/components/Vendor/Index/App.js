import React, { Component } from 'react';
 
class VendorIndex extends Component {
    render() { 
        return (
    <div id="app">
        <div className="main-wrapper main-wrapper-1">
            <div className="navbar-bg" />
            <nav className="navbar navbar-expand-lg main-navbar sticky">
            <div className="form-inline ">
                <ul className="navbar-nav mr-3">
                <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg
                                            collapse-btn"> <i data-feather="align-justify" /></a></li>
              
                </ul>
            </div>
            <ul className="navbar-nav navbar-right" style={{marginLeft:'65%'}}>
                
              
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
                    <a href="#" className="dropdown-item dropdown-item-unread"> <span className="dropdown-item-icon bg-primary text-white"> <i className="fas
                                                        fa-code" />
                        </span> <span className="dropdown-item-desc"> Template update is
                        available now! <span className="time">2 Min
                            Ago</span>
                        </span>
                    </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-info text-white"> <i className="far
                                                        fa-user" />
                        </span> <span className="dropdown-item-desc"> <b>You</b> and <b>Dedik
                            Sugiharto</b> are now friends <span className="time">10 Hours
                            Ago</span>
                        </span>
                    </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-success text-white"> <i className="fas
                                                        fa-check" />
                        </span> <span className="dropdown-item-desc"> <b>Kusnaedi</b> has
                        moved task <b>Fix bug header</b> to <b>Done</b> <span className="time">12
                            Hours
                            Ago</span>
                        </span>
                    </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-danger text-white"> <i className="fas fa-exclamation-triangle" />
                        </span> <span className="dropdown-item-desc"> Low disk space. Let's
                        clean it! <span className="time">17 Hours Ago</span>
                        </span>
                    </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-info text-white"> <i className="fas
                                                        fa-bell" />
                        </span> <span className="dropdown-item-desc"> Welcome to Otika
                        template! <span className="time">Yesterday</span>
                        </span>
                    </a>
                    </div>
                    <div className="dropdown-footer text-center">
                    <a href="#">View All <i className="fas fa-chevron-right" /></a>
                    </div>
                </div>
                </li>
                <li className="dropdown"><a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user"> <img alt="image" src="/vendor-assets/img/user.png" className="user-img-radious-style" /> <span className="d-sm-none d-lg-inline-block" /></a>
                <div className="dropdown-menu dropdown-menu-right pullDown">
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
                </li>
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
                    <a href="index.html" className="nav-link"><i data-feather="monitor" /><span>Dashboard</span></a>
                </li>
                <li className="dropdown">
                    <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="briefcase" /><span>Manage Bookings</span></a>
                    <ul className="dropdown-menu">
                    <li><a className="nav-link" href="/vendor">New Bookings</a></li>
                    <li><a className="nav-link" href="/vendor">Accepted Bookings</a></li>
                    <li><a className="nav-link" href="/vendor">Pending Bookings</a></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="command" /><span>Manage Accounts</span></a>
                    <ul className="dropdown-menu">
                    <li><a className="nav-link" href="/vendor">Wallet</a></li>
                    <li><a className="nav-link" href="/vendor">Withdraw Request</a></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="mail" /><span>Messages</span></a>
                    <ul className="dropdown-menu">
                    <li><a className="nav-link" href="/vendor">Inbox</a></li>
                    <li><a className="nav-link" href="/vendor">Compose</a></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="mail" /><span>Manage Employees</span></a>
                    <ul className="dropdown-menu">
                    <li><a className="nav-link" href="/vendor">Employees</a></li>
                    <li><a className="nav-link" href="/vendor">Add Employee</a></li>
                    </ul>
                </li>
                {/* <li className="menu-header">UI Elements</li> */}
                <li className="dropdown">
                    <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="copy" /><span>Settings</span></a>
                    <ul className="dropdown-menu">
                    <li><a className="nav-link" href="/vendor">Profile</a></li>
                    <li><a className="nav-link" href="/vendor">Accounts</a></li>
                    </ul>
                </li>
                
               
               
              </ul>
                
            </aside>
            </div>
            {/* Main Content */}
            <div className="main-content">
            <section className="section">
                <div className="row ">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-statistic-4">
                        <div className="align-items-center justify-content-between">
                        <div className="row ">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="card-content">
                                <h5 className="font-15">New Booking</h5>
                                <h2 className="mb-3 font-18">258</h2>
                                <p className="mb-0"><span className="col-green">10%</span> Increase</p>
                            </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                                <img src="/vendor-assets/img/banner/1.png" alt />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-statistic-4">
                        <div className="align-items-center justify-content-between">
                        <div className="row ">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="card-content">
                                <h5 className="font-15"> Customers</h5>
                                <h2 className="mb-3 font-18">1,287</h2>
                                <p className="mb-0"><span className="col-orange">09%</span> Decrease</p>
                            </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                                <img src="/vendor-assets/img/banner/2.png" alt />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-statistic-4">
                        <div className="align-items-center justify-content-between">
                        <div className="row ">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="card-content">
                                <h5 className="font-15">Wallet</h5>
                                <h2 className="mb-3 font-18">128</h2>
                                <p className="mb-0"><span className="col-green">18%</span>
                                Increase</p>
                            </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                                <img src="/vendor-assets/img/banner/3.png" alt />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-statistic-4">
                        <div className="align-items-center justify-content-between">
                        <div className="row ">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="card-content">
                                <h5 className="font-15">Revenue</h5>
                                <h2 className="mb-3 font-18">$48,697</h2>
                                <p className="mb-0"><span className="col-green">42%</span> Increase</p>
                            </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                                <img src="/vendor-assets/img/banner/4.png" alt />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-12 col-sm-12 col-lg-12">
                    <div className="card ">
                    <div className="card-header">
                        <h4>Revenue chart</h4>
                        <div className="card-header-action">
                        <div className="dropdown">
                            <a href="#" data-toggle="dropdown" className="btn btn-warning dropdown-toggle">Options</a>
                            <div className="dropdown-menu">
                            <a href="#" className="dropdown-item has-icon"><i className="fas fa-eye" /> View</a>
                            <a href="#" className="dropdown-item has-icon"><i className="far fa-edit" /> Edit</a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item has-icon text-danger"><i className="far fa-trash-alt" />
                                Delete</a>
                            </div>
                        </div>
                        <a href="#" className="btn btn-primary">View All</a>
                        </div>
                    </div>
                   
                </div>
                </div>
                </div>
                </section>
            
            </div>
            <footer className="main-footer">
            <div className="footer-left">
                <a href="templateshub.net">Tidy Home</a>
            </div>
            <div className="footer-right">
            </div>
            </footer>
        </div>
        </div>
        );
    }
}
 
export default VendorIndex;