import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Switch,BrowserRouter,Route} from 'react-router-dom';
import Admin_Login from './Admin/Login/Login'; 
import AdminIndex from './Admin/index';
import FrontIndex from './Front/Container/Index';
import VendorIndex from './Vendor/Index/Index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './Redux/reducer';
import DefaultPage from './Front/Pages/Default/DefaultPage';
import { Toaster } from 'react-hot-toast';

const store = createStore(reducer);
class Index extends Component{ 

    constructor(props) {
        super(props);
        this.state = {
            paths:['/book-service','/signup','/login','/vendor-signup','/vendor-login','/gift-card','/profile','/service/:slug'
            ,'/message-admin','/forgot-password','/reset-password','/vendor-forget-password','/vendor-reset-password' 
        ]
        };
        
    }
     
    render(){
        return (
            <BrowserRouter>

                <div id="main-div">



                <Switch>
                    {
                        this.state.paths.map((data,index)=>{
                            return(
                                <Route key={index} path={data}  component={FrontIndex}/>
                            )
                        })
                    } 
                    <Route exact path="/"  component={FrontIndex}/>
                    
                    <Route exact path="/admin-login" component={Admin_Login} />
                    <Route path="/admin"  component={AdminIndex}/>
                    <Route path="/vendor"  component={VendorIndex}/>
                    <Route   component={DefaultPage}/>
                    </Switch>
            <Toaster></Toaster>

                </div>
            </BrowserRouter>
        );
    }
}
export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Provider store={store}> <Index /></Provider>, document.getElementById('root'));
}