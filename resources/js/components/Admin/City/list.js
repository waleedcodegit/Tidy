import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cities: [],
        }
    }
    componentDidMount(){
        Axios.get(`/api/city`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    cities: res.data.cities
                })
            } 
        })
    }

    render(){
        return (
            <div>
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">City Lists</h3>
                            </div>
                            <div className="panel-body">
                                <table id="demo-dt-basic" className="table table-striped table-bordered" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Sr</th>
                                            <th>State</th>
                                            <th>City</th>
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.cities.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{data.state_name.name}</td>
                                                            <td>{data.name}</td>
                                                            <td>{data.lat}</td>
                                                            <td>{data.long}</td>
                                                            <td>
                                                                <Link to={`/admin/edit-city/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                        this.state.cities.length == 0 ? 
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