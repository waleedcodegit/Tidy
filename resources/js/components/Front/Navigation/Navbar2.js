import React, { Component } from 'react';
import {Navbar , Nav , NavDropdown}  from 'react-bootstrap';
import {img_baseurl} from '../../Configs/Api';
import {connect} from 'react-redux';
import Axios from 'axios';

class Navbar2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
        };
    }
     
    open_link(link){
        console.log(123);
        this.props.changeModal(true);
    }

    componentDidMount(){
        Axios.get(`/api/category`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    category: res.data.categories
                })
            } 
        })
    }
    logout(){
        window.localStorage.setItem('cus_token','');
        window.location.reload();
    }

    render() {
        return (
            <div>
                <Navbar  bg="light" expand="lg" >
                    <div className="container-fluid">
                    <div class="header-logo">
                    <a href="/"><img className="logo" src={img_baseurl+"site-logo.png"} alt="TidyHome"/></a>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav ">
                    <Nav className="ml-auto ml-5 ">
                        
                    <Nav.Link href="/"><span className="text-center"><img src="https://img.icons8.com/ios/24/000000/home--v2.png"/></span>
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
                        {
                            this.state.category.map((data,index)=>{
                                return(
                                    <NavDropdown.Item onClick={()=>{

                                    window.localStorage.setItem('service',data.id);
                                    window.open('/service/'+data.slug,'_self');
                                    } } ><a  target="self">{data.name}</a></NavDropdown.Item>
                                )
                            })
                        }
                        
                        {/* <NavDropdown.Item onClick={()=>{this.props.changeModal(true)}}><a target="blank">Business Services</a></NavDropdown.Item> */}
                      
                    </NavDropdown>
                    </Nav.Link>
                    <Nav.Link href="#home">
                        <span><img src="https://img.icons8.com/ios/24/000000/about.png"/></span>
                        <br></br>
                        <p className="nav_link"> About Us</p>
                    </Nav.Link>
                    <Nav.Link href="/book-service">
                        <span><img src="https://img.icons8.com/windows/24/000000/add-ticket.png"/></span>
                        <br></br>
                        <p className="nav_link"> Book Now </p></Nav.Link>
                    <Nav.Link href="/gift-card">
                        <span><img src="https://img.icons8.com/dotty/24/000000/gift-card.png"/></span>
                        <br></br>
                        <p className="nav_link"> Gift Card </p></Nav.Link>

                    <Nav.Link target="blank" href={"/vendor-signup"}><button className="btn  vendor_btn">Became a Vendor</button></Nav.Link>
                    
                        
                        {
                                this.props.user.is_login ? 
                                <div>
                                    <ul class="nav">
                                        <li class="dropdown  my_account_dropdown">
                                            <a class="dropdown-toggle drop_a" data-toggle="dropdown" href="#">
                                            My Account
                                            </a>
                                            <ul style={{width:'153px'}} class=" card  card-dropdown display_none animate_auth_modal dropdown-menu" role="menu">
                                            <li><a href="#" style={{fontWeight:'700'}}>{this.props.user.data.first_name}</a></li>
                                            <li ><a href="/profile">Profile</a></li>
                                            <li ><a href="/message-admin">Messages</a></li>
                                            <li class="divider"></li>
                                            <li onClick={this.logout.bind(this)}><a href="#">Logout</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <>
                                <Nav.Link href="/login">
                    <button className="btn btn-info login_btn">Login</button>
                        </Nav.Link>
                                </>
                            }
                    <Nav.Link href="#home"></Nav.Link>
                    
                    </Nav>
                    
                </Navbar.Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        modal:state.services_modal,
        user:state.user
    }
}
const mapDistpatchToProps = (dispatch) =>{
    return{
        changeModal:(modal)=>{dispatch({type:'CHANGE_SERVICES_MODAL',payload:modal})}
    }
}
export default connect(mapStateToProps,mapDistpatchToProps)(Navbar2);