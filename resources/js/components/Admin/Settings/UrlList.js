import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

class Index extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            url: [],
        }
        
    }

    componentDidMount(){
        Axios.get(`/api/urlmetas`).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    url: res.data.url
                })
                
            } 
        })
    }

    deleteUrl(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-url',data).then(res=>{
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
                            <h3 className="panel-title">URL META LIST</h3>
                        </div>
                        
                        <div className="panel-body">
                        <div className="mb-2">
                            <Link to={`/admin/url-meta`}><button className="btn btn-primary btn-outline-success">Add New URL</button></Link>
                        </div>
                            <table id="demo-dt-basic" style={{marginTop:6}} className="table table-striped table-bordered mt-2" cellSpacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Sr</th>
                                        <th>URL Path</th>
                                        <th>URL Title</th>
                                        <th>URL Description</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {
                                            this.state.url.map((data,index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.path}</td>
                                                        <td>{data.title}</td>
                                                        <td>{data.description}</td>
                                                        <td><Link to={`/admin/url-edit/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                        <td><button onClick={this.deleteUrl.bind(this, data.id)} className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td> 
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                                    this.state.url.length == 0 ? 
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
 
export default Index;