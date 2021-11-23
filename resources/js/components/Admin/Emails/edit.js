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
            email_title:'',
            email_content: '',
            loading:false,
            
        };
        this.handleChange = this.handleChange.bind(this)
    
    }

    componentDidMount() {  
        Axios.get(`/api/edit-email/${this.props.match.params.id}`).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    email_title: res.data.data.email_title,
                    email_content: res.data.data.email_content 
                    
                })
            }
        })
    }

    getEmailTitle(event) {
        this.setState({
            email_title: event.target.value
        })
    }

    handleChange(value){
        
        this.setState({
            email_content:value
        })
    }

    updateEmail(event) {
        this.setState({ loading : true});
        event.preventDefault();
        let senderData = {
            email_title: this.state.email_title,
            email_content: this.state.email_content,
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
        Axios.put(`/api/emails/${this.props.match.params.id}`, senderData , Configs).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                this.props.history.push('/admin/emails');
                Swal.fire({
                    icon: 'success',
                    title: 'Email update Successfully',
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
        setTimeout(() => {
            this.setState({ loading : false});
          }, 2000);
    }

    render() {
        const {loading} = this.state;
        return (
                <div id="page-content">
                    <div className="row">
                        <div className="col-sm-12">
                        <div className="panel panel-bordered">
                            <div className="panel-heading">
                            <h3 className="panel-title">Edit Email</h3>
                            </div>
                            <div className="panel-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="price">Email Title</label>
                                    <input onChange={this.getEmailTitle.bind(this)} type="text" className="form-control" id="email_title" value={this.state.email_title}/>
                                   
                                </div>
                            </div>
                           
                            
                                 
                                   
                         </div>
                         <label htmlFor="price">Email Content</label>
                             <ReactQuill onChange={this.handleChange}  id="email_content" value={this.state.email_content}/>
                           

                                <div className="panel-footer text-right">
                                    <button onClick={this.updateEmail.bind(this)} type="submit" disabled={loading} className="btn btn-primary">
                                    { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                    { loading && <span > Loading...</span>}
                                     { !loading && <span >Update</span>}
                                            </button>
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