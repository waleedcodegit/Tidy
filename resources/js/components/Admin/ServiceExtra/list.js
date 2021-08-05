import React , {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

class ServiceExtraList extends Component {
    constructor(props){
        super(props);
        this.state = {
            serviceExtras: []
        }
    }

    componentDidMount() {
        Axios.get('/api/service-extra',{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    serviceExtras: res.data.serviceExtra
                })
            }
        })
    }
    deleteServiceExtra(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-serviceextra',data).then(res=>{
            Swal.fire({
                icon: 'success',
                title: 'Successfully Deleted',
                showConfirmButton: false,
                timer: 1500
            })
            this.componentDidMount();
        })
    }
    render() {
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Service Extras List</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.serviceExtras.map((data,index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.title}</td>
                                                        <td>{data.price}</td>
                                                        <td><Link to={`/admin/edit-service-extra/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                        <td><button onClick={this.deleteServiceExtra.bind(this, data.id)} className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td>
                                                       
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            this.state.serviceExtras.length == 0 ? 
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

export default ServiceExtraList;