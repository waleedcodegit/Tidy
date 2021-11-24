import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cities: [],
            loading:true,
        }
    }
    componentDidMount(){
        Axios.get(`/api/city`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    cities: res.data.cities,
                    loading:false,
                })
            } 
        })
    }
    deleteCity(id) {
        let data = {
            id: id
        }
        Axios.post('/api/delete-city',data).then(res=>{
            toast.success('City Deleted Successfully',{position: "bottom-center"});
            
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
                 {
                    this.state.loading ?
                   
                        <div id="displayspinner text-center mt-5 " className="text-center" style={{ display: 'block', }}>
                            <div className="spinner-border  ml-2 text-dark spinner_format" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
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
                                            {/* <th>City</th> */}
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                            <th>Actions</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                this.state.cities.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            {/* <td>{data.state_name.name}</td> */}
                                                            <td>{data.name}</td>
                                                            <td>{data.lat}</td>
                                                            <td>{data.long}</td>
                                                            <td>
                                                                <Link to={`/admin/edit-city/${data.id}`}><button className="btn btn-outline-success"> <i  className="fa fa-pencil"> </i></button></Link></td>
                                                                <td><button onClick={this.deleteCity.bind(this, data.id)} className="btn btn-outline-danger"> <i  className="fa fa-trash"> </i></button></td>
                                                            
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
    }
                </div>
        );
    }
}

export default Index;