import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            category: [],
            search_string:''
        }
    }
    componentDidMount(){
        Axios.get(`/api/category`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    category: res.data.categories
                })
            } 
        })
    }
    deleteCategory(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-category',data).then(res=>{
            toast.success('Category Delete Successfully',{position: "bottom-center"});
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Successfully Deleted',
            //     showConfirmButton: false,
            //     timer: 1500
            // })
            this.componentDidMount();
        })
    }
    search(e){
        this.setState({
            search_string:e.target.value
        })
    }
    search_records(){
        // let senderdata = {
        //     string:this.state.search_string
        // }
        // Axios.post('/api/search_orders',senderdata).then(res=>{
        //     this.setState({
        //         orders:res.data
        //     })
        // })
    }
    render(){
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Category Lists</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.category.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{data.name}</td>
                                                            <td>{data.type}</td>
                                                            <td><Link to={`/admin/edit-category/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                            <td><button onClick={this.deleteCategory.bind(this, data.id)} className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td>
                                                       
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.category.length == 0 ? 
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