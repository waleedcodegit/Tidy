import React, { Component } from 'react';
import Navbar from '../Navigation/Navbar2';
import Footer from '../LandingComponents/Footer';
import Landing from '../LandingComponents/Index';
import Login from '../Auth/Login';
import Signup from '../Auth/CustomerSignUp'
import { Switch,BrowserRouter,Route} from 'react-router-dom';
import TopHeader from '../LandingComponents/TopHeader';
import VendorSignUp from '../../Vendor/Auth/Signup';
import VendorLogin from '../../Vendor/Auth/login';
import BookService from '../Pages/BookService/BookService';

import '../index.css'
import GiftCard from '../Pages/GiftCard.js/GiftCard';
import Axios from 'axios';
import { connect } from 'react-redux';
import Profile from '../Pages/UserProfile/Profile';
import ServicePage from '../Pages/BookService/ServicePage';
import MessageAdmin from '../Pages/Messages/MessageAdmin';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      
    }
    componentDidMount(){
        Axios.post('/api/customer_check_auth',{token:window.localStorage.getItem('cus_token')}).then(res=>{
            if(res.data.status == 200){
                this.props.changeUser({is_login:true,data:res.data.customer,is_apicall:true})
            }else{
                this.props.changeUser({is_login:false,data:[],is_apicall:true})
            }
        })
    }
    render() { 
        return (
            <div className="front-app">
                
                {/* <Route path="/" component={TopHeader}></Route> */}
                <Navbar  {...this.props}></Navbar>
                <Route exact path="/" component={Landing}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route path="/services/:name?" component={Landing}></Route>
                <Route exact path="/vendor-signup" component={VendorSignUp}></Route>
                <Route exact path="/vendor-login" component={VendorLogin}></Route>
                <Route  path="/book-service" component={BookService}></Route>
                <Route  path="/gift-card" component={GiftCard}></Route>
                <Route  path="/profile" component={Profile}></Route>
                <Route  path="/service/:slug" component={ServicePage}></Route>

                <Route  path="/message-admin" component={MessageAdmin}></Route>

                <Footer></Footer>
            </div>
        );
    }
}
 const mapDispatchToProps = (disptach) => {
    return{
        changeUser:(user)=>{disptach({type:'CHANGE_USER', payload:user})}
    }
}
 
export default connect(null,mapDispatchToProps)(Index);
