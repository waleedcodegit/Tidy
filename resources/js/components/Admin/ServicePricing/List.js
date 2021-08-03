import React , {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

class ServiceList extends Component {
    constructor(props){
        super(props);
        this.state = {
            services: []
        }
    }

    componentDidMount() {
        Axios.get('/api/service-price',{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    services: res.data.service_pricings
                })
            }
        })
    }

    render() {
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Service List</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Category</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.services.map((data,index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.category.name}</td>
                                                        <td>{data.title}</td>
                                                        <td>{data.price}</td>
                                                        <td><Link to={`/admin/edit-service/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                        <td><button className="btn btn-outline-success"> <i  className="fa fa-trash"> </i></button></td>
                                                    
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            this.state.services.length == 0 ? 
                                            <tr><td colSpan="5">No records founded</td></tr>:null
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

export default ServiceList;