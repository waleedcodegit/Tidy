import Axios from 'axios';
import React , { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Edit extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            sms_title:'',
            sms_content: ''
            
        };
        this.handleChange = this.handleChange.bind(this)
    
    }

    componentDidMount() {  
        Axios.get(`/api/edit-sms/${this.props.match.params.id}`).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    sms_title: res.data.data.sms_title,
                    sms_content: res.data.data.sms_content
                    
                })
            }
        })
    }

    getSmsTitle(event) {
        this.setState({
            sms_title: event.target.value
        })
    }

    handleChange(value){
        
        this.setState({
            sms_content:value
        })
    }

    updateSms(event) {
        
        event.preventDefault();
        let senderData = {
            sms_title: this.state.sms_title,
            sms_content: this.state.sms_content,
            id: this.props.match.params.id
        }
        this.setState({
            loading: true
        })
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        Axios.put(`/api/sms/${this.props.match.params.id}`, senderData , Configs).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                this.props.history.push('/admin/sms');
                Swal.fire({
                    icon: 'success',
                    title: 'Sms update Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    render() { 
        return ( 
            <div id="page-content">
                    <div className="row">
                        <div className="col-sm-12">
                        <div className="panel panel-bordered">
                            <div className="panel-heading">
                            <h3 className="panel-title">Edit SMS</h3>
                            </div>
                            <div className="panel-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="price">SMS Title</label>
                                    <input onChange={this.getSmsTitle.bind(this)} type="text" className="form-control" id="email_title" value={this.state.sms_title}/>
                                   
                                </div>
                            </div>
                           
                            
                                 
                                   
                         </div>
                         <label htmlFor="price">SMS Content</label>
                             <ReactQuill onChange={this.handleChange} value={this.state.sms_content}/>
                           

                                <div className="panel-footer text-right">
                                    <button onClick={this.updateSms.bind(this)} type="submit" className="btn btn-primary">Submit</button>
                                </div>
                                
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
         );
    }
}
 
export default Edit;