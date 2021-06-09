import Axios from 'axios';
import React , { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';
import Swal from 'sweetalert2';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            category_id: '',
            categories: [],
        };
    }

    componentDidMount() {
        Axios.get(`/api/question/${this.props.match.params.id}/edit`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    title: res.data.question.title,
                    category_id: res.data.question.category_id,
                })
            }
        })

        Axios.get(`/api/category`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    categories: res.data.categories
                })
            } 
        })
    }

    getQuestion(event) {
        this.setState({
            title: event.target.value
        })
    }

    getCategory(event) {
        this.setState({
            category_id: event.target.value
        })
    }

    updateQuestion(event) { 
        event.preventDefault();
        let senderData = {
            title: this.state.title,
            category_id: this.state.category_id,
            id: this.props.match.params.id
        }
        console.log(this.props.match.params.id);
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        Axios.put(`/api/question/${this.props.match.params.id}`, senderData , Configs).then(res=>{
            if(res.data.status == 200){
                this.props.history.push('/admin/list-question');
                Swal.fire({
                    icon: 'success',
                    title: 'Question Added Successfully',
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
                            <h3 className="panel-title">Edit Question</h3>
                            </div>
                            <div className="panel-body">
                            <div className="panel">
                                <form encType="multipart/form-data">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="category_id">Service:</label>
                                                <select className="form-control" name="category_id" value={this.state.category_id} onChange={this.getCategory.bind(this)}>
                                                    {   
                                                        this.state.categories.map((data,index)=>{
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
                                                <label htmlFor="price">Name:</label>
                                                <input onChange={this.getQuestion.bind(this)} type="text" className="form-control" value={this.state.title || ""}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-footer text-right">
                                    <button onClick={this.updateQuestion.bind(this)} type="submit" className="btn btn-primary">Submit</button>
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