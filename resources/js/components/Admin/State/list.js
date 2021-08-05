import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            states: [],
        }
    }
    componentDidMount(){
        Axios.get(`/api/state`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    states: res.data.states
                })
            } 
        })
    }
    deleteState(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-state',data).then(res=>{
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
                                <h3 className="panel-title">State Lists</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.states.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{data.name}</td>
                                                            <td>
                                                                <Link to={`/admin/edit-state/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                                <td><button onClick={this.deleteState.bind(this, data.id)} className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td>
                                                          
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.states.length == 0 ? 
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

export default Index;