import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            emails: [],
        }
        
    }
    componentDidMount(){
        Axios.get(`/api/emails`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    emails: res.data.emails
                })
            } 
        })
    }
   
    deleteEmail(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-email',data).then(res=>{
            toast.success('Email Delete Successfully',{position: "bottom-center"});
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
        const renderHTML = (escapedHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Emails Lists</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellSpacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>Email Title</th>
                                            
                                           
                                            <th>Email Content</th>
                                            
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.emails.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            
                                                            <td>{data.email_title}</td>
                                                             <td>{renderHTML(data.email_content)}</td>
                                                            
                                                            <td>
                                                            <Link to={`/admin/edit-email/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                                <td><button onClick={this.deleteEmail.bind(this, data.id)} className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td>
                                                            
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.emails.length == 0 ? 
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

export default Index;