import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import { img_baseurl } from '../../Configs/Api';
class ManageServiceContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            services_content: [],
        }
    }
    componentDidMount(){
        Axios.post(`/api/get_all_service_content`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            this.setState({
                services_content: res.data
            })
        })
    }
    
    deleteManageService(id) {
    let data = {
        id: id
    }
    Axios.post('/api/delete-manageservice',data).then(res=>{
        Swal.fire({
            icon: 'success',
            title: 'Successfully Deleted',
            showConfirmButton: false,
            timer: 1500
        })
        this.componentDidMount();
    })
}
    render(){
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Manage Services Content</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellSpacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Image</th>
                                            <th>Service</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.services_content.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>
                                                                <img src={img_baseurl+data.image } style={{width:'100px'}}></img>
                                                            </td>
                                                            <td>{data.service.name}</td>
                                                            <td>
                                                                <Link to={`/admin/edit-service-content/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link> </td>
                                                                <td><button onClick={this.deleteManageService.bind(this, data.id)} className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td>
                                                           
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.services_content.length == 0 ? 
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

export default ManageServiceContent;