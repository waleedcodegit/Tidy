import Axios from 'axios';
import React , { Component } from 'react';
import Swal from 'sweetalert2';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
        };
    }

    componentDidMount() {
        Axios.get(`/api/state/${this.props.match.params.id}/edit`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    name: res.data.states.name
                })
            }
        })
    }

    getName(event) {
        this.setState({
            name: event.target.value
        })
    }

    updateState(event) {
        event.preventDefault();
        let senderData = {
            name: this.state.name,
            id: this.props.match.params.id
        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        Axios.put(`/api/state/${this.props.match.params.id}`, senderData , Configs).then(res=>{
            if(res.data.status == 200){
                this.props.history.push('/admin/list-state');
                Swal.fire({
                    icon: 'success',
                    title: 'State Added Successfully',
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
                            <h3 className="panel-title">Edit State</h3>
                            </div>
                            <div className="panel-body">
                            <div className="panel">
                                <form encType="multipart/form-data">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="price">Name:</label>
                                                <input onChange={this.getName.bind(this)} type="text" className="form-control" value={this.state.name || ""}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-footer text-right">
                                    <button onClick={this.updateState.bind(this)} type="submit" className="btn btn-primary">Submit</button>
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

export default Edit;