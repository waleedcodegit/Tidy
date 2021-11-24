import Axios from 'axios';
import React, { Component } from "react";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'

class UrlMeta extends Component {

    constructor(props){
        super(props);
        this.state = { 
            path : "",
            title : "",
            description : ""
         }
    }

    getPath(e){
        
        this.setState({
            path:e.target.value
        })
    }

    getTitle(e){
        
        this.setState({
            title: e.target.value
        })
    }

    getDescription(e){
        
        this.setState({
            description: e.target.value
        })
    }

    save(e){
        e.preventDefault();
        Axios.post('/api/create-url-meta',this.state).then(res=>{
            if(res.data.status == 200){
                toast.success('URL Added Successfully',{position: "bottom-center"});
                this.props.history.push('/admin/url-meta-list');
            //     Swal.fire({
            //         icon: 'success',
            //         title: 'URL Added Successfully',
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
            // }else{
            //     this.setState({
            //         error_string:res.data.msg
            //     })
            }
        })
    }
    
    render() { 
        return ( 
            <div id="page-content">
                <div className="panel">
                <div className="panel-heading">
                    <h3 className="panel-title">Url's Meta</h3>
                </div>
                    <div className="panel-body">
                        <div className="row col-sm-12">
                            <div className="col-sm-6">
                                <div className="fom-group">
                                    <label htmlFor="URL Path">Path</label>
                                    <input onChange={this.getPath.bind(this)} type="text" className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="fom-group">
                                    <label htmlFor="URL Title">Title</label>
                                    <input onChange={this.getTitle.bind(this)} type="text" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div className="row col-sm-12">
                            <div className="col-sm-12">
                                <div className="fom-group">
                                    <label htmlFor="URL Description">Description</label>
                                    <input onChange={this.getDescription.bind(this)} type="text" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer text-right col-sm-12">
                        <button onClick={this.save.bind(this)} type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>

                
            </div>
         );
    }
}
 
export default UrlMeta;