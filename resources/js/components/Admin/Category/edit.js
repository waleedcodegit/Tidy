import Axios from 'axios';
import React , { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';
import Swal from 'sweetalert2';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            type: '',
            image: '',
            display: false,
            loading:false
        };
    }

    componentDidMount() {
        Axios.get(`/api/category/${this.props.match.params.id}/edit`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    name: res.data.category.name,
                    type: res.data.category.type,
                    image: res.data.category.image
                })
            }
        })
    }

    category(event) {
        this.setState({
            name: event.target.value
        })
    }

    getType(event) {
        this.setState({
            type: event.target.value
        })
    }

    getImage(event) {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const promises = files.map(file => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }))
            });
            Promise.all(promises).then(images => {
                this.setState({
                    image: images[0]
                })
            }, error => { console.error(error); });
        }
    }

    updatecategory(event) {
        this.setState({ loading : true});
        event.preventDefault();
        let senderData = {
            name: this.state.name,
            type: this.state.type,
            image: this.state.image,
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
        Axios.put(`/api/category/${this.props.match.params.id}`, senderData , Configs).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                this.props.history.push('/admin/list-category');
                Swal.fire({
                    icon: 'success',
                    title: 'Category Update Successfully',
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
                            <h3 className="panel-title">Edit Category</h3>
                            </div>
                            <div className="panel-body">
                            <div className="panel">
                                <form encType="multipart/form-data">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                            <label htmlFor="type">Type:</label>
                                                <select className="form-control" name="type" value={this.state.type || ""} onChange={this.getType.bind(this)}>
                                                    <option value="home">Home</option>
                                                    <option value="bussiness">Bussiness</option>
                                                </select>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label htmlFor="price">Name:</label>
                                                <input onChange={this.category.bind(this)} type="text" className="form-control" id="price" value={this.state.name || ""} placeholder="Enter Price" name="price"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <span className="pull-left btn btn-primary btn-file">
                                                    Upload Image <input type="file" onChange={this.getImage.bind(this)} />
                                                </span>
                                            </div>
                                            <br></br>
                                            <br></br>
                                            <img style={{width: "30%"}} src={img_baseurl+this.state.image}></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-footer text-right">
                                    <button onClick={this.updatecategory.bind(this)} type="submit" disabled={loading} className="btn btn-primary">
                                    { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                    { loading && <span > Loading...</span>}
                                     { !loading && <span >Update</span>}
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