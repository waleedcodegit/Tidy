import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { img_baseurl } from '../../../Configs/Api';
import toast from 'react-hot-toast';

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            image: '',
            policeidimg: '',
            email: '',
            phone: '',
            address: '',
            service: '',
            serviceprice:'',
            dob:'',
            work:'',
            loading:true,
        }
    }

    componentDidMount() {
        Axios.get(`/api/employee/${this.props.match.params.id}/edit`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    name: res.data.employee.name,
                    username: res.data.employee.username,
                    password: res.data.employee.password_string,
                    image: res.data.employee.image,
                    policeidimg: res.data.employee.policeidimg,
                    email: res.data.employee.email,
                    phone: res.data.employee.phone,
                    address: res.data.employee.address,
                    service: res.data.employee.service,
                    serviceprice: res.data.employee.serviceprice,
                    dob: res.data.employee.dob,
                    work: res.data.employee.work,
                    loading:false,
                })
            }
        })
    }

    getName(event){
        this.setState({
            name: event.target.value
        })
    }

    getUsername(event){
        this.setState({
            username: event.target.value
        })
    }

    getPassword(event){
        this.setState({
            password: event.target.value
        })
    }
    getEmail(event){
        this.setState({
            email: event.target.value
        })
    }
    getPhone(event){
        this.setState({
            phone: event.target.value
        })
    }
    getAddress(event){
        this.setState({
            address: event.target.value
        })
    }
    getService(event){
        this.setState({
            service: event.target.value
        })
    }
    getServicePrice(event){
        this.setState({
            serviceprice: event.target.value
        })
    }
    getDateofbirth(event){
        this.setState({
            dob: event.target.value
        })
    }
    getWork(event){
        this.setState({
            work: event.target.value
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

    createEmployee(event) {
        event.preventDefault();
        let senderData = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            image: this.state.image,
            policeidimg: this.state.policeidimg,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            service: this.state.service,
            serviceprice: this.state.serviceprice,
            dob: this.state.dob,
            work: this.state.work,
            id: this.props.match.params.id
        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        Axios.put(`/api/employee/${this.props.match.params.id}`, senderData , Configs).then(res=>{
            if(res.data.status == 200){
                toast.success('Employee Updated Successfully',{position: "bottom-center"});
                this.props.history.push('/vendor/employee-list');
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Employee Updated Successfully',
                //     showConfirmButton: false,
                //     timer: 1500
                // })
            } else {
                toast.error('res.data.msg',{position: "bottom-center"});
                
            }
        })
    }
    getPoliceid(event) {
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
                    policeidimg: images[0]
                })
            }, error => { console.error(error); });
        }
    }

    render(){
      return (
        <div>
        {
          this.state.loading ?
         
              <div id="displayspinner text-center mt-5 " className="text-center" style={{ display: 'block', }}>
                  <div className="spinner-border  ml-2 text-dark spinner_format" role="status">
                      <span className="sr-only">Loading...</span>
                  </div>
              </div>
              :
          <section className="section">
            <div className="section-body">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4>Employees</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" onChange={this.getName.bind(this)} value={this.state.name} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="text" class="form-control" onChange={this.getEmail.bind(this)} value={this.state.email} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>User Name</label>
                                    <input type="text" class="form-control" onChange={this.getUsername.bind(this)} value={this.state.username} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="text" class="form-control" onChange={this.getPhone.bind(this)} value={this.state.phone} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Address</label>
                                    <input type="text" class="form-control" onChange={this.getAddress.bind(this)} value={this.state.address} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Service</label>
                                    <input type="text" class="form-control" onChange={this.getService.bind(this)} value={this.state.service} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Service Price</label>
                                    <input type="text" class="form-control" onChange={this.getServicePrice.bind(this)} value={this.state.serviceprice} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Date of Birth</label>
                                    <input type="text" class="form-control" onChange={this.getDateofbirth.bind(this)} value={this.state.dob} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="text" class="form-control" onChange={this.getPassword.bind(this)} value={this.state.password}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Work</label>
                                    <input type="text" class="form-control" onChange={this.getWork.bind(this)} value={this.state.work}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Image</label>
                                    <input type="file" class="form-control" onChange={this.getImage.bind(this)} />
                                </div>
                                <img src={img_baseurl+this.state.image}></img>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Police Id</label>
                                    <input type="file" class="form-control" onChange={this.getPoliceid.bind(this)} />
                                </div>
                                <img src={img_baseurl+this.state.policeidimg}></img>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-right">
                        <button onClick={this.createEmployee.bind(this)} class="btn btn-primary mr-1" type="submit">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    }
     </div>

        );
    }
}
export default Index;
