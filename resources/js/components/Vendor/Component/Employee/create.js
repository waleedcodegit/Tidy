import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            image: ''
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
            token: window.localStorage.getItem('vt'),
            image: this.state.image,
        }
        let Configs = {
            headers: {
                token: window.localStorage.getItem('testapistring')
            }
        }
        // console.log(senderData);
        Axios.post('/api/employee', senderData , Configs).then(res=>{
            if(res.data.status == 200){
                this.props.history.push('/vendor/employee-list');
                Swal.fire({
                    icon: 'success',
                    title: 'Employee Added Successfully',
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

    render(){
      return (
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
                                    <input type="text" class="form-control" onChange={this.getName.bind(this)} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>User Name</label>
                                    <input type="text" class="form-control" onChange={this.getUsername.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="text" class="form-control" onChange={this.getPassword.bind(this)} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Image</label>
                                    <input type="file" class="form-control" onChange={this.getImage.bind(this)} />
                                </div>
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
      );
    }
}
export default Index;
