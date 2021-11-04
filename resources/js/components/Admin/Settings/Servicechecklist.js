import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

class Servicechecklist extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            servicecheck: [],
        }
        
    }

    componentDidMount(){
        Axios.post(`/api/service_check_list`).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    servicecheck: res.data.servicecheck
                })
               this.props.history.push('/admin/service_check_list'); 
            } 
        })
    }

    deleteServiceCheck(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-service_check',data).then(res=>{
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
        return ( <div>
            <div id="page-content">
                    <div className="panel">
                        <div className="panel-heading">
                            <h3 className="panel-title">SERVICE CHECK LIST</h3>
                        </div>
                        
                        <div className="panel-body">
                        <div className="mb-2">
                            <Link to={`/admin/add_service_check`}><button className="btn btn-primary btn-outline-success">Add Service Check</button></Link>
                        </div>
                            <table id="demo-dt-basic" style={{marginTop:6}} className="table table-striped table-bordered mt-2" cellSpacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Sr</th>
                                        <th>Type</th>
                                        <th>Item</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {
                                            this.state.servicecheck.map((data,index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.type}</td>
                                                        <td>{data.item}</td>
                                                        <td><Link to={`/admin/edit_service_check/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                        <td><button onClick={this.deleteServiceCheck.bind(this, data.id)} className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td> 
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                                    this.state.servicecheck.length == 0 ? 
                                                    <tr><td colSpan="5">No records founded</td></tr>:null
                                        }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> );
    }
}
 
export default Servicechecklist;