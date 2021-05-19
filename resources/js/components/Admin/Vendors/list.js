import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

class VendorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vendors: [],
            id: ''
        }
    }

    componentDidMount() {
        Axios.get('/api/vendor-list' , { headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res => {
            if(res.data.status == true) {
                this.setState({
                    vendors: res.data.data
                })
            }
        });
    }

    render() {
        return(
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Vendor List</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>DOB</th>
                                            <th>Australian Business #</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.vendors.map((data,index) =>{
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{data.first_name}</td>
                                                        <td>{data.last_name}</td>
                                                        <td>{data.email}</td>
                                                        <td>{data.phone}</td>
                                                        <td>{data.dob}</td>
                                                        <td>{data.australian_business_number}</td>
                                                        <td>{data.status}</td>
                                                        <td><Link to={`/admin/vendor-info/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-eye"> </i></button></Link></td>
                                                    </tr>
                                                )
                                            })
                                        }

                                        {
                                            this.state.vendors.length == 0 ? 
                                            <tr><td colSpan="9">No records founded</td></tr>:null
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

export default VendorList;