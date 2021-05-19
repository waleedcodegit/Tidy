import Axios from 'axios';
import React , { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';
import Swal from 'sweetalert2';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            date: '',
            display: false,
            loading:false
        };
    }

    componentDidMount() {
        Axios.get(`/api/holiday/${this.props.match.params.id}/edit`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    title: res.data.holiday.title,
                    date: res.data.holiday.date
                })
            }
        })
    }

    getTitle(event) {
        this.setState({
            title: event.target.value
        })
    }

    getDate(event) {
        this.setState({
            date: event.target.value
        })
    }

    updateHoliday(event) {
        
        event.preventDefault();
        let senderData = {
            title: this.state.title,
            date: this.state.date,
            id: this.props.match.params.id
        }
        this.setState({
            loading: true
        })
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        Axios.put(`/api/holiday/${this.props.match.params.id}`, senderData , Configs).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                this.props.history.push('/admin/list-holidays');
                Swal.fire({
                    icon: 'success',
                    title: 'Category Added Successfully',
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
                            <h3 className="panel-title">Edit Holiday</h3>
                            </div>
                            <div className="panel-body">
                            <div className="panel">
                                <form encType="multipart/form-data">
                                <div className="panel-body">
                                    
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="price">Title:</label>
                                                <input onChange={this.getTitle.bind(this)} type="text" className="form-control" id="title" value={this.state.title} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="price">Date:</label>
                                                <input onChange={this.getDate.bind(this)} type="date" className="form-control" id="date" value={this.state.date} />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="panel-footer text-right">
                                    <button onClick={this.updateHoliday.bind(this)} type="submit" className="btn btn-primary">Submit</button>
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