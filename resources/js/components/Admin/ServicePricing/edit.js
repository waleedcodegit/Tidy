import React , {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cat_id: '',
            title: '',
            price: '',
            categories: []
        };
    }

    componentDidMount() {
        Axios.get(`/api/category`, {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    categories: res.data.categories
                })
            }
        })
        Axios.get(`/api/service-price/${this.props.match.params.id}/edit`, {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }).then(res=> {
            if(res.data.status == 200) {
                this.setState({
                    cat_id: res.data.service_pricings.category.id,
                    title: res.data.service_pricings.title,
                    price: res.data.service_pricings.price
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

    getCategory(event) {
        this.setState({
            cat_id: event.target.value
        })
    }

    upload(event) {
        event.preventDefault();
        let data = {
            id: this.props.match.params.id,
            cat_id: this.state.cat_id,
            title: this.state.title,
            price: this.state.price
        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }

        Axios.put(`/api/service-price/${this.props.match.params.id}`, data, Configs).then(res=>{
            if(res.data.status == 200) {
                toast.success('Update ServicePricing Successfully',{position: "bottom-center"});
                this.props.history.push('/admin/list-service');
            // } else {
            //     Swal.fire({
            //         icon: 'error',
            //         title: res.data.msg,
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
            }
        })
    }

    render() {
        return(
            <div id="page-content">
                <div className="row">
                    <div className="col-sm-12">
                    <div className="panel panel-bordered">
                        <div className="panel-heading">
                        <h3 className="panel-title">Service Pricing</h3>
                        </div>
                        <div className="panel-body">
                        <div className="panel">
                            <form encType="multipart/form-data">
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="cat_id">Category:</label>
                                            <select className="form-control" name="cat_id" value={this.state.cat_id} onChange={this.getCategory.bind(this)}>
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
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="price">Price:</label>
                                            <input onChange={this.getPrice.bind(this)} value={this.state.price} type="text" className="form-control" id="price" placeholder="Enter Price" name="price"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer text-right">
                                <button onClick={this.upload.bind(this)} type="submit" className="btn btn-primary">Submit</button>
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