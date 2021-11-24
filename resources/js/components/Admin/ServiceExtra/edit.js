import React , {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            price: '',
            categories:[],
            cat_id:0,
            loading:false,
        };
    }

    componentDidMount() {
        Axios.get(`/api/category`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    categories: res.data.categories
                })
            } 
        })
        Axios.get(`/api/service-extra/${this.props.match.params.id}/edit`, {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }).then(res=> {
            if(res.data.status == 200) {
                this.setState({
                    title: res.data.service_extras.title,
                    price: res.data.service_extras.price,
                    cat_id:res.data.service_extras.category_id
                })
            }
        })
    }

    getTitle(event) {
        this.setState({
            title: event.target.value
        })
    }

    getPrice(event) {
        this.setState({
            price: event.target.value
        })
    }

    upload(event) {
        this.setState({ loading : true});
        event.preventDefault();
        let data = {
            id: this.props.match.params.id,
            title: this.state.title,
            price: this.state.price,
            category:this.state.cat_id
        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }

        Axios.put(`/api/service-extra/${this.props.match.params.id}`, data, Configs).then(res=>{
            if(res.data.status == 200) {
                toast.success('Update ServiceExtra Successfully',{position: "bottom-center"});
                this.props.history.push('/admin/list-service-extra');
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
    getCategory(event) {
        this.setState({
            cat_id: event.target.value
        })  
    }
    render() {
        const {loading} = this.state;
        return(
            <div id="page-content">
                <div className="row">
                    <div className="col-sm-12">
                    <div className="panel panel-bordered">
                        <div className="panel-heading">
                        <h3 className="panel-title">Service Extra</h3>
                        </div>
                        <div className="panel-body">
                        <div className="panel">
                            <form encType="multipart/form-data">
                            <div className="panel-body">
                                <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="cat_id">Category:</label>
                                        <select className="form-control" name="cat_id" value={this.state.cat_id}  onChange={this.getCategory.bind(this)}>
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
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="title">Title:</label>
                                            <input onChange={this.getTitle.bind(this)} value={this.state.title || ""} type="text" className="form-control" id="title" placeholder="Enter Title" name="title" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="price">Price:</label>
                                            <input onChange={this.getPrice.bind(this)} value={this.state.price} type="text" className="form-control" id="price" placeholder="Enter Price" name="price"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer text-right">
                                <button onClick={this.upload.bind(this)} type="submit" disabled={loading} className="btn btn-primary">
                                { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                    { loading && <span > Loading...</span>}
                                     { !loading && <span >Save</span>}
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

export default Edit;