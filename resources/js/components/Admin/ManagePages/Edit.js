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
            page_title: '',
            content:'',
            error_string:'',
            id:this.props.match.params.id
        };
    }

    componentDidMount(){
        Axios.post('/api/get_page_by_id',{id:this.props.match.params.id}).then(res=>{
            this.setState({
                page_title:res.data.page_title,
                content: JSON.parse(res.data.content)
            })
        })
    }

    title(event) {
        this.setState({
            page_title: event.target.value
        })
    }

    content(event) {
        this.setState({
            content: event
        })
    }
  


    UpdatePage(event) {
        
        event.preventDefault();
    
        Axios.post('/api/update_page', this.state).then(res=>{
           
            if(res.data.status == 200){
                toast.success('Page Update Successfully')
                this.props.history.push('/admin/manage-pages');
               
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
                    <h3 className="panel-title">Edit Page</h3>
                    </div>
                    <div className="panel-body">
                    <div className="panel">
                        <form encType="multipart/form-data">
                        <div className="panel-body">
                            <div className="row">
                                
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="price">Page Title</label>
                                        <input value={this.state.page_title} className="form-control" onChange={this.title.bind(this)} type="text"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="price">Page Content:</label>
                                        <ReactQuill 
                                        value={this.state.content}
                                        onChange={this.content.bind(this)}
                                             />
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        {
                            this.state.error_string != '' ?
                            <p className="text-center text-danger">{this.state.error_string}</p>
                            :
                            null
                        }
                        <div className="panel-footer text-right">
                            <button onClick={this.UpdatePage.bind(this)} type="submit" className="btn btn-primary">Update</button>
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