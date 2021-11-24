import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question: [],
        }
    }
    componentDidMount(){
        Axios.get(`/api/question`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    question: res.data.question
                })
            } 
        })
    }
    deletequestion(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-question',data).then(res=>{
            toast.success('Question Delete Successfully',{position: "bottom-center"});
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Successfully Deleted',
            //     showConfirmButton: false,
            //     timer: 1500
            // })
            this.componentDidMount();
        })
    }
    render(){
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Questions List</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Service</th>
                                            <th>Question</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.question.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{data.service.name}</td>
                                                            <td>{data.title}</td>
                                                            <td>
                                                                <Link to={`/admin/edit-question/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                                <td><button onClick={this.deletequestion.bind(this, data.id)}  className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td>
                                                            
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.question.length == 0 ? 
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