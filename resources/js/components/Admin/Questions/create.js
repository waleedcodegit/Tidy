import Axios from 'axios';
import React , { Component } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id:'',
            title: '',
            categories: [],
            loading:false,
        };
    }

    componentDidMount(){
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

    getCategory(event) {
        this.setState({
            category_id: event.target.value
        })
    }

    getQuestion(event) {
        this.setState({
            title: event.target.value
        })
    }

    createQuestion(event) {
        this.setState({ loading : true});
        event.preventDefault();
        let senderData = {
            category_id: this.state.category_id,
            title: this.state.title,
        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        this.setState({
            loading: true
        })
        Axios.post('/api/question', senderData , Configs).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                toast.success('Question Added Successfully',{position: "bottom-center"});
                this.props.history.push('/admin/list-question');
            //     Swal.fire({
            //         icon: 'success',
            //         title: 'Question Added Successfully',
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
            // } else {
            //     Swal.fire({
            //         icon: 'error',
            //         title: res.data.msg,
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
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
            <div className="row">
                <div className="col-sm-12">
                <div className="panel panel-bordered">
                    <div className="panel-heading">
                    <h3 className="panel-title">Questions</h3>
                    </div>
                    <div className="panel-body">
                    <div className="panel">
                        <form encType="multipart/form-data">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                    <label htmlFor="type">Categories:</label>
                                        <select className="form-control" name="category_id" onChange={this.getCategory.bind(this)}>
                                                <option value="">Select</option>
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
                                        <label htmlFor="price">Question:</label>
                                        <input onChange={this.getQuestion.bind(this)} type="text" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer text-right">
                            <button onClick={this.createQuestion.bind(this)} type="submit" disabled={loading} className="btn btn-primary">
                            { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                    { loading && <span > Loading...</span>}
                                     { !loading && <span >Submit</span>}
                                            </button>
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