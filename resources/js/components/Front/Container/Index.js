import React, { Component } from 'react';
import Navbar from '../Navigation/Navbar2';
import Footer from '../LandingComponents/Footer';
import Landing from '../LandingComponents/Index';
import { Switch,BrowserRouter,Route} from 'react-router-dom';
import TopHeader from '../LandingComponents/TopHeader';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log('Container-iNDEX');
    }
     
    render() { 
        return (
            <div>
                
                {/* <Route path="/" component={TopHeader}></Route> */}
                <Navbar></Navbar>
                <Route exact path="/" component={Landing}></Route>
                <Route  path="/services/:name?" component={Landing}></Route>
                <Footer></Footer>

            </div>
        );
    }
}
 
export default Index;   	