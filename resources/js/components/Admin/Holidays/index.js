import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            holidays: [],
        }
    }
    componentDidMount(){
        Axios.get(`/api/holiday`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    holidays: res.data.holidays
                })
            } 
        })
    }
    deleteHoliday(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-holiday',data).then(res=>{
            toast.success('Holiday Deleted Successfully',{position: "bottom-center"});
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
                                <h3 className="panel-title">Holiday Lists</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Title</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.holidays.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{data.title}</td>
                                                            <td>{data.date}</td>
                                                            <td><Link to={`/admin/edit-holiday/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                            <td><button  onClick={this.deleteHoliday.bind(this, data.id)} className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.holidays.length == 0 ? 
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