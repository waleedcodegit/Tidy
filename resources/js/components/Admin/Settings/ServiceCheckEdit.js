import Axios from 'axios';
import React, { Component } from "react";
import Swal from 'sweetalert2'

class ServiceCheckEdit extends Component {

    constructor(props){
        super(props);
        this.state = { 
            type : "",
            item: "",
            loading:false,
         }
    }

    componentDidMount() {  
        Axios.get(`/api/edit_service_check/${this.props.match.params.id}`).then(res=>{
            if(res.data.status == 200) {
                this.setState({
                    type: res.data.data.type,
                    item: res.data.data.item,
                    
                    
                })
            }
        })
    }

    getType(event) {
        this.setState({
            type: event.target.value
        })
    }

    getItems(event) {
        this.setState({
            item: event.target.value
        })
    }

  
   

    updateServiceCheck(e) {
        this.setState({ loading : true});
        e.preventDefault();
        let senderData = {
            type: this.state.type,
            item: this.state.item,
            id: this.props.match.params.id
        }
        
        Axios.post(`/api/update_service_check/${this.props.match.params.id}`, senderData).then(res=>{
            this.setState({
                loading: false
            })
            if(res.data.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Service Check Updated Successfully',
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
            this.props.history.push('/admin/service_check_list');
        })
        setTimeout(() => {
            this.setState({ loading : false});
          }, 2000);
    }
    
    render() { 
        const {loading} = this.state;
        return ( 
            <div id="page-content">
                <div className="panel">
                <div className="panel-heading">
                    <h3 className="panel-title">Url's Meta</h3>
                </div>
                    <div className="panel-body">
                        <div className="row col-sm-12">
                            <div className="col-sm-6">
                                <div className="fom-group">
                                    <label htmlFor="URL Path">Path</label>
                                    {/* <input onChange={this.getType.bind(this)} value={this.state.type} type="text" className="form-control"></input> */}
                                    <select onChange={this.getType.bind(this)} className="form-control" name="type" value={this.state.type}>
                                            {/* <option value="">Select</option> */}
                                             <option  value="1">All areas of the house</option>
                                             <option  value="2">Bathrooms</option>
                                             <option  value="3">Kitchen</option>
                                             <option  value="4">Bedrooms</option>
                                             <option  value="5">Others</option>
                                             {/* <option  value="6"></option>
                                             <option  value="7"></option>
                                             <option  value="8"></option>
                                             <option  value="9"></option>
                                             <option  value="10"></option> */}
                                     </select>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="fom-group">
                                    <label htmlFor="URL Title">Title</label>
                                    <input onChange={this.getItems.bind(this)} value={this.state.item} type="text" className="form-control"></input>
                                </div>
                            </div>
                        </div>
                       
                        <div className="panel-footer text-right col-sm-12">
                        <button onClick={this.updateServiceCheck.bind(this)} type="submit" disabled={loading} className="btn btn-primary">
                        { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                    { loading && <span > Loading...</span>}
                                     { !loading && <span >Update</span>}
                                     </button>
                        </div>
                    </div>
                </div>

                
            </div>
         );
    }
}
 
export default ServiceCheckEdit;