import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
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
            work:'',
            dob:'',
            phonenumber:'',
            loading:false,
        }
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
    phonenumber(event){
        this.setState({
            phonenumber: event.target.value
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
    getWork(event){
        this.setState({
            work: event.target.value
        })
    }
    getDateofbirth(event){
        this.setState({
            dob: event.target.value
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

    createEmployee(event) {
        this.setState({ loading : true});
        event.preventDefault();
        let senderData = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            service: this.state.service,
            serviceprice: this.state.serviceprice,
            token: window.localStorage.getItem('vt'),
            image: this.state.image,
            policeidimg: this.state.policeidimg,
            work:this.state.work,
            dob:this.state.dob,
            phonenumber:this.state.phonenumber,
        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        console.log(senderData);
        Axios.post('/api/employee', senderData , Configs).then(res=>{
            if(res.data.status == 200){
                toast.success('Employee Added Successfully',{position: "bottom-center"});
                this.props.history.push('/vendor/employee-list');
               
            } else {
                toast.error(res.data.msg,{position: "bottom-center"});
            }
        })
        setTimeout(() => {
            this.setState({ loading : false});
          }, 2000);
    }

    render(){
        const {loading} = this.state;
      return (
          <div>
                {/* {
                    this.state.loading ?
                   
                        <div id="displayspinner text-center mt-5 " className="text-center" style={{ display: 'block', }}>
                            <div className="spinner-border  ml-2 text-dark spinner_format" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        : */}
          <section classNameName="section">
            <div classNameName="section-body">
              <div classNameName="row">
                <div classNameName="col-12">
                  <div classNameName="card">
                    <div classNameName="card-header">
                      <h4>Employees</h4>
                    </div>
                    <div classNameName="card-body">
                        <div classNameName="row">
                            <div classNameName="col-6">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" onChange={this.getName.bind(this)} />
                                </div>
                            </div>
                            <div classNameName="col-6">
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input type="text" className="form-control" onChange={this.getUsername.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <div classNameName="row">
                            <div classNameName="col-6">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="text" className="form-control" onChange={this.getPassword.bind(this)} />
                                </div>
                            </div>
                            <div classNameName="col-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" className="form-control" onChange={this.getEmail.bind(this)} />
                                </div>
                            </div>
                            <div classNameName="col-6">
                                <div className="form-group">
                                    <label>Phone#</label>
                                    <div className="row">
                                    <div class="col-sm-2">
                                <select  onChange={this.phonenumber.bind(this)} type="number"  className="form-control auth_input_box">
                               <option>+61</option>
                               <option>+61</option>
                               </select>
                               </div>
                               <div class="col-sm-10">
                                    <input type="text" className="form-control" onChange={this.getPhone.bind(this)} />
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div classNameName="col-6">
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" className="form-control" onChange={this.getAddress.bind(this)} />
                                </div>
                            </div>
                            <div classNameName="col-6">
                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input type="text" className="form-control" onChange={this.getDateofbirth.bind(this)} />
                                </div>
                            </div>
                            <div classNameName="col-6">
                                <div className="form-group">
                                    <label>Service</label>
                                    <input type="text" className="form-control" onChange={this.getService.bind(this)} />
                                </div>
                            </div>
                            <div classNameName="col-6">
                                <div className="form-group">
                                    <label>Work</label>
                                    <input type="text" className="form-control" onChange={this.getWork.bind(this)} />
                                </div>
                            </div>
                            <div classNameName="col-6">
                                <div className="form-group">
                                    <label>Service Price</label>
                                    <input type="text" className="form-control" onChange={this.getServicePrice.bind(this)} />
                                </div>
                            </div>
                            <div classNameName="col-6">
                                <div className="form-group">
                                    <label>Image</label>
                                    <input type="file" className="form-control" onChange={this.getImage.bind(this)} />
                                </div>
                            </div>
                            <div classNameName="col-6">
                                <div className="form-group">
                                    <label>Police Id</label>
                                    <input type="file" className="form-control" onChange={this.getPoliceid.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-right">
                        <button onClick={this.createEmployee.bind(this)} disabled={loading} className="btn btn-primary mr-1" type="submit">
                        { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                    { loading && <span > Loading...</span>}
                                     { !loading && <span >Submit</span>}
                                            </button>
                            {/* </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    {/* } */}
    </div>
      );
    }
}
export default Index;
