import Axios from 'axios';
import React , { Component } from 'react';
import Swal from 'sweetalert2';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question:'',
            answer: '',
            display: false,
            loading:false,
            typo:''
        };
    }

    componentDidMount() {  
        Axios.get(`/api/faq-detail/${this.props.match.params.id}`).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    question: res.data.data.question,
                    answer: res.data.data.answer,
                    type:res.data.data.type
                })
            }
        })
    }

    getQuestion(event) {
        this.setState({
            question: event.target.value
        })
    }

    getAnswer(event) {
        this.setState({
            answer: event.target.value
        })
    }
    faq_type(event) {
        this.setState({
            type: event.target.value
        })
    }

    updateFaq(event) { 
        event.preventDefault();
        let senderData = {
            question: this.state.question,
            answer: this.state.answer,
            id: this.props.match.params.id,
            type:this.state.type
        }
        this.setState({
            loading: true
        })
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        Axios.post(`/api/faq-update`, senderData , Configs).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                this.props.history.push('/admin/faqs');
                Swal.fire({
                    icon: 'success',
                    title: 'Update Successfully',
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
                            <h3 className="panel-title">Edit Faq</h3>
                            </div>
                            <div className="panel-body">
                            <div className="panel">
                                <form encType="multipart/form-data">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="question">Question:</label>
                                                <input onChange={this.getQuestion.bind(this)} type="text" className="form-control" id="question" value={this.state.question || ""} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="answer">Answer:</label>
                                                <input onChange={this.getAnswer.bind(this)} type="text" className="form-control" id="answer" value={this.state.answer || ""} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="price">Type</label>
                                            <select value={this.state.type || ""} onChange={this.faq_type.bind(this)} type="text" className="form-control" id="price">\
                                            <option>Select Type</option>
                                            <option value="1">Faq Page</option>
                                            <option value="2">Service Booking</option>
                                            <option value="3">Vendor SignUp</option>
                                            {/* <option value="1">Faq Page</option> */}
                                            </select>
                                        </div>
                            </div>
                                    </div>
                                </div>
                                <div className="panel-footer text-right">
                                    <button onClick={this.updateFaq.bind(this)} type="submit" className="btn btn-primary">Submit</button>
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