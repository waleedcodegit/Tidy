import Axios from 'axios';
import React, { Component } from 'react';
import Swal from 'sweetalert2';
class AddFaqs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question:'',
            answer:'',
            error_string:'',
            type:'',
            loading:false,
        };
    }
    question(e){
        this.setState({
            question:e.target.value
        })
    }
    answer(e){
        this.setState({
            answer:e.target.value
        })
    }
    faq_type(e){
        this.setState({
            type:e.target.value
        })
    }
    save(e){
        this.setState({ loading : true});
        e.preventDefault();
        Axios.post('/api/add_faq',this.state).then(res=>{
            
            if(res.data.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Faq Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                }) 
                this.props.history.push('/admin/faqs')
            }else{
                this.setState({
                    error_string:res.data.msg
                })
            }
        })
        setTimeout(() => {
            this.setState({ loading : false});
          }, 2000);
    }
    render() {
        const {loading} = this.state;
        return (
            <div id="page-content">
                <div className="panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">Frequently Asked Question's</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="price">Faq Question</label>
                                    <input onChange={this.question.bind(this)} type="text" className="form-control" id="price"/>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="price">Faq Answer</label>
                                    <textarea onChange={this.answer.bind(this)} type="text" className="form-control" id="price"/>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="price">Type</label>
                                    <select onChange={this.faq_type.bind(this)} type="text" className="form-control" id="price">\
                                    <option>Select Type</option>
                                    <option value="1">Faq Page</option>
                                    <option value="2">Service Booking</option>
                                    <option value="3">Vendor SignUp</option>
                                    {/* <option value="1">Faq Page</option> */}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.error_string != ''?
                            <p className="text-danger text-center">{this.state.error_string}</p>
                            :null
                        }
                        <div className="panel-footer text-right">
                            <button

                                onClick={this.save.bind(this)} type="submit" disabled={loading} className="btn btn-primary">
                                { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                    { loading && <span > Loading...</span>}
                                     { !loading && <span >Save</span>}
                                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddFaqs;