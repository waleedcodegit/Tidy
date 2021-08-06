import Axios from 'axios';
import React , { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';
import Swal from 'sweetalert2';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email_title:'',
            email_content: ''
            
        };
    }

    componentDidMount() {
        Axios.get(`/api/email/${this.props.match.params.id}/edit`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    email_title: res.data.email.email_title,
                    email_content: res.data.email.email_content
                })
            }
        })
    }

    getEmailTitle(event) {
        this.setState({
            email_title: event.target.value
        })
    }

    getEmailContent(event) {
        this.setState({
            email_content: event.target.value
        })
    }

    updateHoliday(event) {
        
        event.preventDefault();
        let senderData = {
            email_title: this.email.email_title,
            email_content: this.email.email_content,
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
        Axios.put(`/api/email/${this.props.match.params.id}`, senderData , Configs).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                this.props.history.push('/admin/emails');
                Swal.fire({
                    icon: 'success',
                    title: 'Emails Added Successfully',
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
                            <h3 className="panel-title">Edit Email</h3>
                            </div>
                            <div className="panel-body">
                            <div className="panel">
                                <form encType="multipart/form-data">
                                <div className="panel-body">
                                    
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="price">Email:</label>
                                                <input onChange={this.getEmailTitle.bind(this)} type="text" className="form-control" id="title" value={this.email.email_title} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="price">Date:</label>
                                                <input onChange={this.getEmailContent.bind(this)} type="date" className="form-control" id="date" value={this.state.email_content} />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="panel-footer text-right">
                                    <button onClick={this.updateHoliday.bind(this)} type="submit" className="btn btn-primary">Submit</button>
                                </div>
                                </form>
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