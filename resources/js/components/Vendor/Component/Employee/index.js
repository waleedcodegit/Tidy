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
                      <div className="table-responsive">
                        <table className="table table-striped" id="table-1">
                          <thead>
                            <tr>
                              <th className="text-center">
                                #
                              </th>
                              <th>Name</th>
                              <th>Username</th>
                              <th>Image</th>
                              <th>Vendor</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                                this.state.employees.map((data,index)=>{
                                  return(
                                          <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{data.name}</td>
                                            <td>{data.username}</td>
                                            <td>{data.image}</td>
                                            <td>{data.vendor_id}</td>
                                            <td>
                                                <Link to={`/vendor/edit-employee/${data.id}`}><button className="btn btn-outline-primary"> <i  className="fa fa-edit"> </i></button></Link>   
                                            </td>
                                                              
                                          </tr>
                                        )
                                      })
                            }
                            {
                              this.state.employees.length == 0 ? 
                              <tr><td colSpan="6">No records founded</td></tr>:null
                            }
                          </tbody>
                        </table>
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
