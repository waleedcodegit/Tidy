import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import { img_baseurl } from '../../Configs/Api';
import toast from 'react-hot-toast';
class ManagePagesContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pages: [],
        }
    }
    componentDidMount(){
        Axios.post(`/api/get_pages`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            this.setState({
                pages: res.data
            })
        })
    }
    
    deleteManageService(id) {
    let data = {
        id: id
    }
    Axios.post('/api/delete_page_by_id',data).then(res=>{
        toast.success('Page Deleted Successfully',{position: "bottom-center"});
        this.componentDidMount();
    })
}
    render(){
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Manage Pages</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Page Title</th>
                                            <th>Slug</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.pages.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>
                                                              {data.page_title}
                                                            </td>
                                                            <td>{data.slug}</td>
                                                            <td>
                                                                <Link to={`/admin/edit-page/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link> </td>
                                                                <td><button onClick={this.deleteManageService.bind(this, data.id)} className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td>
                                                           
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.pages.length == 0 ? 
                                                        <tr><td colSpan="4">No records founded</td></tr>:null
                                            }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default ManagePagesContent;