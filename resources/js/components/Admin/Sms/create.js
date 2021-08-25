import Axios from 'axios';
import React, { Component } from "react";
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class CreateSms extends Component {

    constructor(props){
        super(props);
        this.state = { 
            sms_title : "",
            sms_content : ""
         }
    }

    sms_title(e){
        
        this.setState({
            sms_title:e.target.value
        })
    }

    handleSmsContent(value){
        
        this.setState({
            sms_content:value
        })
    }

    save(e){
        e.preventDefault();
        Axios.post('/api/create-sms',this.state).then(res=>{
            
            if(res.data.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: 'SMS Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                }) 
                this.props.history.push('/admin/sms')
            }else{
                this.setState({
                    error_string:res.data.msg
                })
            }
        })
    }
    
    render() { 
        return ( 
            <div id="page-content">
                <div className="panel">
                <div className="panel-heading">
                    <h3 className="panel-title">SMS</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="fom-group">
                                <label htmlFor="Sms Title">SMS Title</label>
                                <input onChange={this.sms_title.bind(this)} type="text" className="form-control" id="sms_title"></input>
                            </div>

                        </div>
                    </div>

                    <label htmlFor="Sms Content">SMS Content</label>
                    <ReactQuill onChange={this.handleSmsContent.bind(this)} id="sms-content"></ReactQuill>

                    {
                            this.state.error_string != ''?
                            <p className="text-danger text-center">{this.state.error_string}</p>
                            :null
                    }
                </div>

                <div className="panel-footer text-right">
                    <button onClick={this.save.bind(this)} type="submit" className="btn btn-primary">Save</button>
                </div>
                </div>
            </div>
         );
    }
}
 
export default CreateSms;