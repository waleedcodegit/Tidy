import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

class EditCustomer extends Component{
    constructor(props){
        super(props);
        this.state = {
            first_name : '',
            last_name : '',
            email : '',
            address : '',
            phone : '',
            status:''
        }
    }

    getFirstName(event) {
        this.setState({
            first_name: event.target.value
        })
    }

    getLastName(event) {
        this.setState({
            last_name: event.target.value
        })
    }

    getEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    getAddress(event) {
        this.setState({
            address: event.target.value
        })
    }

    getPhone(event) {
        this.setState({
            phone: event.target.value
        })
    }

    componentDidMount() {  
        Axios.post(`/api/edit-customer/${this.props.match.params.id}`).then(res=>{
            if(res.data.status) {
                this.setState({
                    first_name: res.data.data.first_name,
                    last_name: res.data.data.last_name,
                    email: res.data.data.email,
                    address: res.data.data.address,
                    phone: res.data.data.phone,
                    status: res.data.data.status 
                })
            }
        })
    }

    updateCustomer(e){
        e.preventDefault();
        let sendData = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                address: this.state.address,
                phone: this.state.phone,
                status: this.state.status,
                id: this.props.match.params.id
        }
        Axios.post(`/api/update-customer`, sendData).then(res=>{
            
            if(res.data.status == true){
                Swal.fire({
                    icon: 'success',
                    title: 'Customer update Successfully',
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
        return(
            <div id="page-content">
                    <div className="row">
                        <div className="col-sm-12">
                        <div className="panel panel-bordered">
                            <div className="panel-heading">
                            <h3 className="panel-title">Edit Customer</h3>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div>
                                        <div className="form-group col-sm-6">
                                            <label htmlFor="price">First Name</label>
                                            <input onChange={this.getFirstName.bind(this)} type="text" className="form-control" id="Customer_Name" value={this.state.first_name}/> 
                                        </div>
                                        <div className="form-group col-sm-6">
                                            <label htmlFor="price">Last Name</label>
                                            <input onChange={this.getLastName.bind(this)} type="text" className="form-control" id="Customer_Name" value={this.state.last_name}/> 
                                        </div>
                                    </div>       
                                </div>
                                <div className = "row">
                                    <div className="col-sm-12">
                                        <label htmlFor="price">Email</label>
                                        <input onChange={this.getEmail.bind(this)} type="text" className="form-control" id="Customer_Name" value={this.state.email}/>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className="col-sm-12">
                                        <label htmlFor="price">Address</label>
                                        <input onChange={this.getAddress.bind(this)} type="text" className="form-control" id="Customer_Name" value={this.state.address}/>
                                    </div>
                                </div>
                                <div className = "row">
                                        <div className="col-sm-12">
                                            <label htmlFor="price">Phone</label>
                                            <input onChange={this.getPhone.bind(this)} type="text" className="form-control" id="Customer_Name" value={this.state.phone}/>
                                        </div>
                                    </div>
                                <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                    <label htmlFor="type">Status:</label>
                                        <select className="form-control" name="type" value={this.state.status}>
                                            <option value="">Select</option>
                                            <option value={1}>Active</option>
                                            <option value={0}>Suspended</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>
                                <div className="panel-footer text-right">
                                    <button onClick={this.updateCustomer.bind(this)} type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
        )
    }

}

export default EditCustomer;
