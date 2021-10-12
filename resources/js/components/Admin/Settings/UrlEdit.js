import Axios from 'axios';
import React, { Component } from "react";
import Swal from 'sweetalert2'

class UrlEdit extends Component {

    constructor(props){
        super(props);
        this.state = { 
            path : "",
            title : "",
            description : ""
         }
    }

    componentDidMount() {  
        Axios.get(`/api/edit-url/${this.props.match.params.id}`).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    path: res.data.data.path,
                    title: res.data.data.title,
                    description: res.data.data.description,
                    
                })
            }
        })
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

    updateUrl(e) {
        
        e.preventDefault();
        let senderData = {
            path: this.state.path,
            title: this.state.title,
            description: this.state.description,
            id: this.props.match.params.id
        }
        
        Axios.post(`/api/update-url/${this.props.match.params.id}`, senderData).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                // this.props.history.push('/admin/sms');
                Swal.fire({
                    icon: 'success',
                    title: 'URL update Successfully',
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
                <div className="panel">
                <div className="panel-heading">
                    <h3 className="panel-title">Url's Meta</h3>
                </div>
                    <div className="panel-body">
                        <div className="row col-sm-12">
                            <div className="col-sm-6">
                                <div className="fom-group">
                                    <label htmlFor="URL Path">Path</label>
                                    <input onChange={this.getPath.bind(this)} value={this.state.path} type="text" className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="fom-group">
                                    <label htmlFor="URL Title">Title</label>
                                    <input onChange={this.getTitle.bind(this)} value={this.state.title} type="text" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div className="row col-sm-12">
                            <div className="col-sm-12">
                                <div className="fom-group">
                                    <label htmlFor="URL Description">Description</label>
                                    <input onChange={this.getDescription.bind(this)} value={this.state.description} type="text" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer text-right col-sm-12">
                        <button onClick={this.updateUrl.bind(this)} type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>

                
            </div>
         );
    }
}
 
export default UrlEdit;