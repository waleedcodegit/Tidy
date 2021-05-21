import Axios from 'axios';
import { data } from 'jquery';
import React, { Component } from 'react';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btn_loading:false,
            services:[],
            error_string:''

        };
    }
    componentDidMount(){
        Axios.post('/api/get-services').then(res=>{
            this.setState({
                services:res.data.data
            })
        })
    }
    submit_services(){
        let payload = {
            services:this.state.services,
            vendor_id:this.props.match.params.vendor_id
        }
        let check = false;
        this.state.services.map((data,index)=>{
            if(data.check){
                check = true;
            }
        })
        if(check){
            this.setState({
                btn_loading:true
            })
            Axios.post('/api/save_vendor_services',payload).then(res=>{
                this.setState({
                    btn_loading:false
                })
                this.props.history.push('/vendor-signup/3/'+this.props.match.params.vendor_id);
                console.log(res);
            })
        }else{
            this.setState({
                error_string:'Please Selct at least One Service'
            })
        }
       
    }
    SelectService(index){
        let temp = this.state.services;
        temp[index].check = !temp[index].check;
        this.setState({
            services:temp
        })
    }
    render() {
        return (
            <div >
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="text-center center_title">Select Services</h3>
                            </div>
                          
                                <div className="panel-body">
                                <div className="row">
                                {
                                        this.state.services.map((data,index)=>{
                                            return(
                                                <div onClick={this.SelectService.bind(this,index)} key={index} className="p-2">
                                                    <button className={!data.check ? "btn btn-outline-info" : "btn btn-success"}>
                                                    {data.check ?
                                                        <i className="fas fa-check"></i>
                                                        :null
                                                    }
                                                    {data.name}</button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                   
                                 </div>
                                {
                                    this.state.error_string != '' ?
                                    <p className="text-danger text-center">{this.state.error_string}</p>
                                    :null
                                }
                              
                                <div className="panel-footer text-center">
                                    <button onClick={this.submit_services.bind(this)} className="btn btn-success  col-sm-12 " type="submit">
                                    {
                                        this.state.btn_loading ? 
                                        <div id="displayspinner" style={{ display: 'block',}}>
                                                                    <div className="spinner-border  ml-2 text-light spinner_format"  role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                </div>
                                            :<>Continue...</>
                                    }
                                    </button>
                                </div>
                            
                            {/*===================================================*/}
                            {/*End Block Styled Form */}
                        </div>
                    </div>
                    <div className="col-sm-1"></div>
                </div>

            </div>
        );
    }
}

export default SignUp;