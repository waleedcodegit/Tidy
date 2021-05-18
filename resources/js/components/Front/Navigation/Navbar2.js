import React, { Component } from 'react';
import {Navbar , Nav , NavDropdown}  from 'react-bootstrap';
import { vendor_base } from '../../Configs/baseurls';
class Navbar2 extends Component {
    open_link(link){
        window.open(link,'_self');
    }
    render() {
        return (
            <div>
                <Navbar  bg="light" expand="lg" >
                    <div className="container-fluid">
                    <div class="header-logo">
                    <a href="#"><img className="logo" src="/img/site-logo.png" alt="Indico"/></a>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav ">
                    <Nav className="ml-auto ml-5 ">
                        
                    <Nav.Link href="#home"><span className="text-center"><img src="https://img.icons8.com/ios/24/000000/home--v2.png"/></span>
                    <br></br><p className="nav_link">Home</p></Nav.Link>
                    <Nav.Link href="#home">
                        <span><img src="https://img.icons8.com/ios/24/000000/how-quest.png"/></span>
                        <br></br>
                        <p className="nav_link">How it Works</p>
                    </Nav.Link>
                    <Nav.Link >
                        <span><img src="https://img.icons8.com/ios/24/000000/dot-logo.png"/></span>
                        <br></br>
                        <NavDropdown title="Services" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={this.open_link.bind(this,'/services/home')} ><a href="/services/home" target="blank">Home Services</a></NavDropdown.Item>
                        <NavDropdown.Item onClick={this.open_link.bind(this,'/services/business')}><a href="/services/business" target="blank">Business Services</a></NavDropdown.Item>
                      
                    </NavDropdown>
                    </Nav.Link>
                    <Nav.Link href="#home">
                        <span><img src="https://img.icons8.com/ios/24/000000/about.png"/></span>
                        <br></br>
                        <p className="nav_link"> About Us</p>
                    </Nav.Link>
                    <Nav.Link href="/customer-signup">
                        <span><img src="https://img.icons8.com/ios/24/000000/add-user-male.png"/></span>
                        <br></br>
                        <p className="nav_link"> Customer SignUp </p></Nav.Link>
                    <Nav.Link target="blank" href={vendor_base+"signup"}><button className="btn  vendor_btn">Became a Vendor</button></Nav.Link>
                    <Nav.Link href="/login">
                    <button className="btn btn-info login_btn">Login</button>
                        </Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    
                    </Nav>
                    
                </Navbar.Collapse>
                    </div>
                
                </Navbar>
            </div>
        );
    }
}

export default Navbar2;