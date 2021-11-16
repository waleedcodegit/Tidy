import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            subcategory: [],
            
        }
    }
    componentDidMount(){
        Axios.get(`/api/subcategory`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    subcategory: res.data.subcategory,
                   
                })
            } 
        })
    }
    deletesubCategory(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-subcategory',data).then(res=>{
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
                                <h3 className="panel-title">SubCategory Lists</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.subcategory.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{data.name}</td>
                                                            <td>{data.price}</td>
                                                            <td>
                                                                <Link to={`/admin/edit-subcategory/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                                <td><button  onClick={this.deletesubCategory.bind(this, data.id)}className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td>
                                                            
                                                            
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.subcategory.length == 0 ? 
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