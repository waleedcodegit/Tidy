import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../Index/App';

class EmployeeMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display:false
        };
    }
    componentDidMount(){
        let payload = {
            token:window.localStorage.getItem('et')
        }
        Axios.post('/api/employee_check_auth',payload).then(res=>{
            if(res.data.status == 200){
                this.props.changeVendor({is_login:true,data:res.data.employee});
                this.setState({
                    display:true
                })
            }else{
                window.open('/employee-login','_self')
            }
        })
    } 
    render() { 
        return (
            <div>
            <div className={this.state.display ? '':'opacityZero'} >
                <App {...this.props}></App>
            </div>
            
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        changeVendor:(employee)=>{dispatch({type:'CHANGE_EMPLOYEE',payload:employee})}
    }
}
export default connect(null,mapDispatchToProps)( EmployeeMain);