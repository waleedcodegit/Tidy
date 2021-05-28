import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../Index/App';

class VendorMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display:false
        };
    }
    componentDidMount(){
        let payload = {
            token:window.localStorage.getItem('vt')
        }
        Axios.post('/api/vendor_check_auth',payload).then(res=>{
            if(res.data.status == 200){
                this.props.changeVendor(res.data.vendor);
                this.setState({
                    display:true
                })
            }else{
                window.open('/vendor-login','_self')
            }
        })
    } 
    render() { 
        return (
            <div>
            {
                this.state.display ?
                <App {...this.props}></App>
                :
                <div className="text-center">
                    <img  style={{marginTop:'25%'}} src="/images/spinner.gif"></img>
                </div>
            }
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        changeVendor:(vendor)=>{dispatch({type:'CHANGE_VENDOR',payload:vendor})}
    }
}
export default connect(null,mapDispatchToProps)( VendorMain);