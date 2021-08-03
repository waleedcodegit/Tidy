import Axios from 'axios';
import React , { Component } from 'react';
import img_baseurl from '../../Configs/Api';
import Swal from 'sweetalert2';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            state_id: '',
            states: [],
            lat:0,
            long:0
        };
    }

    componentDidMount(){
        Axios.get(`/api/state`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    states: res.data.states
                })
            } 
        })
        Axios.get(`/api/city/${this.props.match.params.id}/edit`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    name: res.data.cities.name,
                    state_id:res.data.cities.state_id,
                    lat:res.data.cities.lat,
                    long:res.data.cities.long
                })
            }
        })
    }

    getName(event) {
        this.setState({
            name: event.target.value
        })
    }

    getState(event) {
        this.setState({
            state_id: event.target.value
        })
    }
    lat(event) {
        this.setState({
            lat: event.target.value
        })
    }
    long(event) {
        this.setState({
            long: event.target.value
        })
    }
    createCity(event) {
        
        event.preventDefault();
        let senderData = {
            name: this.state.name,
            state_id: this.state.state_id,
            lat:this.state.lat,
            long:this.state.long,
            id:this.props.match.params.id
        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        // console.log(senderData);
        Axios.put(`/api/city/${this.props.match.params.id}`, senderData , Configs).then(res=>{
            if(res.data.status == 200){
                this.props.history.push('/admin/list-city');
                Swal.fire({
                    icon: 'success',
                    title: 'City Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    render() {
        return (

            <div id="page-content">
            <div className="row">
                <div className="col-sm-12">
                <div className="panel panel-bordered">
                    <div className="panel-heading">
                    <h3 className="panel-title">City</h3>
                    </div>
                    <div className="panel-body">
                    <div className="panel">
                        <form encType="multipart/form-data">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                    <label htmlFor="state_id">States:</label>
                                        <select value={this.state.state_id}  className="form-control" name="state_id" onChange={this.getState.bind(this)}>
                                            <option value="">Select</option>
                                            { 
                                                this.state.states.map((data,index)=>{
                                                    return(
                                                        <option key={index} value={data.id}>{data.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input value={this.state.name}  onChange={this.getName.bind(this)} type="text" className="form-control" id="name" placeholder="Enter Name"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="name">Latitude</label>
                                        <input value={this.state.lat}  onChange={this.lat.bind(this)} type="text" className="form-control" id="name" placeholder="Enter Name"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="name">Longitude</label>
                                        <input value={this.state.long}  onChange={this.long.bind(this)} type="text" className="form-control" id="name" placeholder="Enter Name"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer text-right">
                            <button onClick={this.createCity.bind(this)} type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Create;