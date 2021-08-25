import Axios from 'axios';
import React , { Component } from 'react';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service:'',
            image: '',
            categories: [],
            description:'',
            included_text:'',
            whychoose:''
        };
    }

    componentDidMount(){
        Axios.get(`/api/category`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    categories: res.data.categories
                })
            } 
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
            included_text: event
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
        
        event.preventDefault();
        this.setState({
            loading: true
        })
        Axios.post('/api/create_services_content', this.state).then(res=>{
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
    }

    render() {
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
                                        <select className="form-control" name="category_id" onChange={this.service.bind(this)}>
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
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="price">Description Image:</label>
                                        <input onChange={this.image_uploader.bind(this)} type="file"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="price">Service Description:</label>
                                        <textarea 
                                         style={{height:'300px',width:'100%'}}
                                        onChange={this.description.bind(this)}
                                             />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="price">Whats Included:</label>
                                        <textarea 
                                         style={{height:'300px',width:'100%'}}
                                        onChange={this.included_text.bind(this)}
                                             />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Why Choose TidyHome:</label>
                                        <textarea 
                                         style={{height:'300px',width:'100%'}}
                                        onChange={this.whychoose.bind(this)}
                                             />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="panel-footer text-right">
                            <button onClick={this.createContent.bind(this)} type="submit" className="btn btn-primary">Submit</button>
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

export default Create;