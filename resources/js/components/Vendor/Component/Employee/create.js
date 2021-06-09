import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            employees: [],
        }
    }

    componentDidMount(){
      Axios.get(`/api/employee`,{ headers: {
          token: window.localStorage.getItem('testapistring')
      }}).then(res=>{
          if(res.data.status == 200) {
              this.setState({
                employees: res.data.employee
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
                                    <input type="text" class="form-control"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>User Name</label>
                                    <input type="text" class="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <label>User Name</label>
                                    <input type="text" class="form-control"/>
                                </div>
                            </div>
                        </div>
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
