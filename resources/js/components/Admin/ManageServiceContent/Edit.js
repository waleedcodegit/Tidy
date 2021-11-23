import Axios from 'axios';
import React , { Component } from 'react';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import { img_baseurl } from '../../Configs/Api';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import Editor from 'react-simple-code-editor';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service:'',
            image: 'noimage.png',
            categories: [],
            description:'',
            included_text:'',
            id:this.props.match.params.id,
            whychoose:'',
            loading:false,
        };
    }

    componentDidMount(){
        this.editorInstance  

        Axios.get(`/api/category`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    categories: res.data.categories,

                })
            } 
        })

        Axios.post('/api/get_service_content_by_id',{id:this.props.match.params.id}).then(res=>{
            this.setState({
                service:res.data.service_id,
                image:res.data.image,
                description:res.data.description,
                included_text:res.data.included_text,
                whychoose:res.data.whychoose
            })
        })
    }

    whychoose(e){
        this.setState({
            whychoose:e.target.value
        })
    }
    service(event) {
        this.setState({
            service: event.target.value
        })
    }

    description(event) {
        this.setState({
            description: event
        })
    }
    included_text(event) {
        this.setState({
            included_text: event.target.value
        })
    }
    image_uploader(event) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('token', window.localStorage.getItem('al'));
        let Configs = {
            headers: {
                token: window.localStorage.getItem('al'),
                'content-type': false,
                'mime-type': "multipart/form-data",
            },
            onUploadProgress: progressEvent => {
                this.setState({
                    btn2_prg: Math.round((progressEvent.loaded * 100) / progressEvent.total)
                })
            }
        }
        this.setState({
            loading: true,
        })
        Axios.post('/api/image_upload', formData, Configs).then(res => {

            if (res.data.status == 200) {
                toast.success('Image Uploaded.');
                this.setState({
                    image:res.data.url,
                    loading:false
                })
            } else {
                toast.error(res.data.msg);
                this.setState({
                    loading:false
                })
            }
        })

    }

    createContent(event) {
        this.setState({ loading : true});
        event.preventDefault();
        this.setState({
            loading: true
        })
        Axios.post('/api/update_services_content', this.state).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                toast.success('Service Content Created Successfully')
                this.props.history.push('/admin/manage-services-content');
               
            } else {
                toast.error('Error - '+res.data.msg)
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
                    <h3 className="panel-title">Add Service Content</h3>
                    </div>
                    <div className="panel-body">
                    <div className="panel">
                        <form encType="multipart/form-data">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                    <label htmlFor="type">Select Service:</label>
                                        <select value={this.state.service} className="form-control" name="category_id" onChange={this.service.bind(this)}>
                                                <option value="">Select</option>
                                                {
                                                    
                                                    this.state.categories.map((data,index)=>{
                                                        return(
                                                            <option key={index} value={data.id}>{data.name}</option>
                                                        )
                                                    })
                                                }

                                        </select> 
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label htmlFor="price">Description Image:</label>
                                        <input  onChange={this.image_uploader.bind(this)} type="file"></input>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="panel panel-bordered px-1">
                                        <img src={img_baseurl+this.state.image} style={{width:'100%'}}></img>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="price">Service Description:</label>

                                        <ReactQuill 
                                        value={this.state.description}
                                        onChange={this.description.bind(this)}
                                             />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="price">Whats Included:</label>
                                        {/* <Editor
                                            value={this.state.included_text}
                                            onValueChange={this.included_text.bind(this)}
                                            highlight={code => highlight(code, languages.js)}
                                            padding={10}
                                            style={{
                                            fontFamily: '"Fira code", "Fira Mono", monospace',
                                            fontSize: 12,
                                            }}
                                        />
                                        <ReactQuill 
                                        value={this.state.included_text}
                                        onChange={this.included_text.bind(this)}
                                             /> */}
                                        <textarea
                                        value={this.state.included_text}
                                        onChange={this.included_text.bind(this)}
                                        style={{height:'300px',width:'100%'}}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                    <label htmlFor="price">Why Choose TidyHome:</label>
                                    <textarea
                                        value={this.state.whychoose}
                                        onChange={this.whychoose.bind(this)}
                                        style={{height:'300px',width:'100%'}}
                                    ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer text-right">
                            <button onClick={this.createContent.bind(this)} type="submit" disabled={loading} className="btn btn-primary">
                            { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                    { loading && <span > Loading...</span>}
                                     { !loading && <span >Update</span>}
                                            </button>
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