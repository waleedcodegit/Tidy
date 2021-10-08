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
        console.log(senderData);
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
                                    <label>Image</label>
                                    <input type="file" className="form-control" onChange={this.getImage.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-right">
                        <button onClick={this.createEmployee.bind(this)} className="btn btn-primary mr-1" type="submit">Submit</button>
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
