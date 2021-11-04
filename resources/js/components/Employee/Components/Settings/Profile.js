import React, {Component} from "react";
import { connect } from 'react-redux';
import Axios from 'axios';
import {img_baseurl, MAP_PLACES_API_KEY} from '../../../Configs/Api';
import Swal from 'sweetalert2';

class EmpProfile extends Component{

    constructor(props){
        super(props);
        this.state={
            f_name:'',
            e_username:'',
            employee:[],
            id:this.props.employee.id,
        }
        console.log(props);
    }

    componentDidMount() {
        Axios.post('/api/get-employee-info/'+this.props.employee.data.employee_id).then(res=>{
            if(res.data.status == 200){
                this.setState({
                    employee: res.data.data,
                    f_name: res.data.data.name,
                    e_username: res.data.data.username
                })
            }
        })
    }

    getName(e){
        this.setState({
            f_name: e.target.value
        })
    }

    getUsername(e){
        this.setState({
            e_username: e.target.value
        })
    }

    // getImage(event) {
    //     if (event.target.files) {
    //         const files = Array.from(event.target.files);
    //         const promises = files.map(file => {
    //             return (new Promise((resolve, reject) => {
    //                 const reader = new FileReader();
    //                 reader.addEventListener('load', (ev) => {
    //                     resolve(ev.target.result);
    //                 });
    //                 reader.addEventListener('error', reject);
    //                 reader.readAsDataURL(file);
    //             }))
    //         });
    //         Promise.all(promises).then(images => {
    //             this.setState({
    //                 image: images[0]
    //             })
    //         }, error => { console.error(error); });
    //     }
    // }

    update(e){
        e.preventDefault();
        Axios.post('/api/update-employee-profile', this.state).then(res=>{
            if(res.data.status){
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else{
                this.setState({
                    error_string:res.data.message
                })
            }
            
        })
    }

    render(){
        return(
            <section className="section">
                <div className="section-body">
                    <div className="row mt-sm-4">
                        <div className="col-12 col-md-4 col-lg-4">
                            <div className="card author-box">
                                <div className="card-body">
                                    <div className="author-box-center">
                                        <img alt="image" src={img_baseurl + this.state.employee.image} className="rounded-circle author-box-picture" />
                                        <div className="clearfix" />
                                        <div className="author-box-name">
                                            <a href="#">{this.state.employee.name}</a>
                                        </div>
                                        <div className="author-box-job">USERNAME : {this.state.employee.username}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 col-lg-8">
                            <div className="card">
                                <div className="padding-20">
                                    <ul className="nav nav-tabs" id="myTab2" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="profile-tab2" data-toggle="tab" href="#settings" role="tab" aria-selected="true">Edit Profile</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content tab-bordered" id="myTab3Content">
                                    <div className="tab-pane show active fade" id="settings" role="tabpanel" aria-labelledby="profile-tab2">
                                            <form >
                                                <div className="card-header">
                                                    <h4>Edit Profile</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>First Name</label>
                                                            <input onChange={this.getName.bind(this)} value={this.state.f_name || ''} type="text" className="form-control" defaultValue="John" />
                                                            <div className="invalid-feedback">
                                                                Please fill in the first name
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-6 col-12">
                                                            <label>User Name</label>
                                                            <input onChange={this.getUsername.bind(this)} value={this.state.e_username || ''} type="text" className="form-control" defaultValue="Deo" />
                                                            <div className="invalid-feedback">
                                                                Please fill in the User Name to change
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer text-right">
                                                    <button onClick={this.update.bind(this)} className="btn btn-primary">Save Changes</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        employee:state.employee
    }
}
export default connect(mapStateToProps)(EmpProfile);