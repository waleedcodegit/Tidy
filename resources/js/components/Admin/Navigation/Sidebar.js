import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_visible:false,
            nav_item_visible:0,
            nav_item_active: {
                main: 0,     
            },
            active_sub_item: 0
        }
    }
    
    componentDidMount(){
        
        $(document).ready( function() {
            var temp = false;
            $('.navbar-top-links').on('click', function(){
               if(temp){
                    $('nav').removeClass('nav_mobile');
                    temp = false;
               }else{
                    $('nav').addClass('nav_mobile');
                    temp = true;
               }
                
            });
        });

    }
    change_visible_item(id){
        let temp = 0;
        if(id == this.state.nav_item_visible){
            temp = 0;
        }else if(id != this.state.nav_item_visible){
            temp = id;
        }
        this.setState({
            nav_item_visible:temp
        })
    }
    active_item(_main) {
        
        let item = {
            main:_main
        }
        this.setState({
            nav_item_active: item,
        })
    }

    active_sub_item(_sub) {
        this.setState({
            active_sub_item: _sub,
        })
    }
    render() {
        return (
            <div>
                <nav id="mainnav-container">
                    <div id="mainnav">
                        <div id="mainnav-menu-wrap">
                            <div className="nano">
                                <div className="nano-content">
                                    <div id="mainnav-profile" className="mainnav-profile">
                                        <div className="profile-wrap text-center">
                                            <div className="pad-btm">
                                                {/* <img className="img-circle img-md" src=""
                                                    alt="Profile Picture" /> */}
                                            </div>
                                            <a href="#profile-nav" className="box-block" data-toggle="collapse" aria-expanded="false">
                                                <p className="mnp-name">Tidy Home</p>
                                                <span className="mnp-desc">admin@admin.com</span>
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <ul id="mainnav-menu" className="list-group">
                                        <li className="list-header">Navigation</li>
                                        {/* <li onClick={this.active_item.bind(this, 1)} className={this.state.nav_item_active.main == 1 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,1)}>
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Dashboard</span>
                                            </a>
                                        </li> */}

                                        <li onClick={this.active_item.bind(this, 2)} className={this.state.nav_item_active.main == 2 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,2)}>
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Category</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 2 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-category">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/list-category">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                            
                                        </li>

                                        <li onClick={this.active_item.bind(this, 3)} className={this.state.nav_item_active.main == 3 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,3)}>
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Sub Category</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 3 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-subcategory">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/list-subcategory">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                            
                                        </li>

                                        {/* <li onClick={this.active_item.bind(this, 4)} className={this.state.nav_item_active.main == 4 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,4)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Services Princing</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 4 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-service">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/list-service">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li> */}

                                        <li onClick={this.active_item.bind(this, 5)} className={this.state.nav_item_active.main == 5 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,5)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Manage Customer</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 5 ?
                                                <ul >
                                                    {/* <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-customer">Create</Link></li> */}
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/customer-list">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>

                                        <li onClick={this.active_item.bind(this, 6)} className={this.state.nav_item_active.main == 6 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,6)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Manage Vendor</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 6 ?
                                                <ul >
                                                    {<li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-vendor">Create</Link></li> }
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/vendor-list">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>
                                        <li onClick={this.active_item.bind(this, 26)} className={this.state.nav_item_active.main == 25 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,26)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Bookings</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 26 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/pending-bookings">Pending Bookings</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>
                                        <li onClick={this.active_item.bind(this, 22)} className={this.state.nav_item_active.main == 22 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,22)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Messages</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 22 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/vendor-messages">Vendor Messages</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/customer-messages">Customer Messages</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>
                                        <li onClick={this.active_item.bind(this, 23)} className={this.state.nav_item_active.main == 23 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,23)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Manage Pages</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 23 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-page">Create Page</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/manage-pages">Pages List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>
                                        <li onClick={this.active_item.bind(this, 7)} className={this.state.nav_item_active.main == 7 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,7)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Setting</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 7 ?
                                                <ul > 
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/setting-list">List</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/home-content">Home Content</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/url-meta-list">Url Metas List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>

                                        <li onClick={this.active_item.bind(this, 8)} className={this.state.nav_item_active.main == 8 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,8)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Holidays</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 8 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-holiday">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/list-holidays">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>
                                       
                                        <li onClick={this.active_item.bind(this, 20)} className={this.state.nav_item_active.main == 20 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,20)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Service Content</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 20 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-service-content">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/manage-services-content">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>
                                        <li onClick={this.active_item.bind(this, 9)} className={this.state.nav_item_active.main == 9 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,9)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Questions</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 9 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-question">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/list-question">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>

                                        <li onClick={this.active_item.bind(this, 13)} className={this.state.nav_item_active.main == 13 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,13)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Manage Faqs</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 13 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/add-faq">Add Faq</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/faqs">Faq List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>
                                        <li onClick={this.active_item.bind(this, 10)} className={this.state.nav_item_active.main == 10 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,10)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >State</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 10 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-state">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/list-state">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>

                                        <li onClick={this.active_item.bind(this, 11)} className={this.state.nav_item_active.main == 11 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,11)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >City</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 11 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-city">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/list-city">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>

                                        <li onClick={this.active_item.bind(this, 12)} className={this.state.nav_item_active.main == 12 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,12)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Extra Service</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 12 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-service-extra">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/list-service-extra">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>

                                        <li onClick={this.active_item.bind(this, 14)} className={this.state.nav_item_active.main == 14 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,14)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Gift Cards</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 14 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/gift-cards">GIft Cards List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>
                                        <li onClick={this.active_item.bind(this, 15)} className={this.state.nav_item_active.main == 15 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,15)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Emails</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 15 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-emails">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/emails">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>
                                        <li onClick={this.active_item.bind(this, 24)} className={this.state.nav_item_active.main == 24 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,24)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >SMS</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 24 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-sms">Create</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 2)} className={this.state.active_sub_item == 2 ? "active-link" : ""}><Link to="/admin/sms">List</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>
                                        <li onClick={this.active_item.bind(this, 25)} className={this.state.nav_item_active.main == 25 ? "active-sub" : ""}>
                                            <a onClick={this.change_visible_item.bind(this,25)} >
                                                <i className="demo-pli-home"></i>
                                                <span className="menu-title" 
                                                >Reviews</span>
                                                <i className="arrow"></i>
                                            </a>
                                            {
                                                this.state.nav_item_visible == 25 ?
                                                <ul >
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/create-review">User Review</Link></li>
                                                    <li onClick={this.active_sub_item.bind(this, 1)} className={this.state.active_sub_item == 1 ? "active-link" : ""}><Link to="/admin/list-reviews">List Reviews</Link></li>
                                                </ul>
                                                :null
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Sidebar;