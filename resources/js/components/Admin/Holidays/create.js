import Axios from 'axios';
import React , { Component } from 'react';
import img_baseurl from '../../Configs/Api';
import Swal from 'sweetalert2';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            date: '',
            display: false,
            loading:false
        };
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

    createcategory(event) {
        
        event.preventDefault();
        let senderData = {
            title: this.state.title,
            date: this.state.date        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        this.setState({
            loading: true
        })
        Axios.post('/api/holiday', senderData , Configs).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                this.props.history.push('/admin/list-holidays');
                Swal.fire({
                    icon: 'success',
                    title: 'Holiday Added Successfully',
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
                    <h3 className="panel-title">Holiday</h3>
                    </div>
                    <div className="panel-body">
                    <div className="panel">
                        <form encType="multipart/form-data">
                        <div className="panel-body">
                            
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="price">Title:</label>
                                        <input onChange={this.getTitle.bind(this)} type="text" className="form-control" id="title" />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="price">Date:</label>
                                        <input onChange={this.getDate.bind(this)} type="date" className="form-control" id="date" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer text-right">
                            <button onClick={this.createcategory.bind(this)} type="submit" className="btn btn-primary">Submit</button>
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