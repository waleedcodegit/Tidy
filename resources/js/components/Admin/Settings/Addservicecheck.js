import Axios from 'axios';
import React, { Component } from "react";
import Swal from 'sweetalert2'

class Addservicecheck extends Component {

    constructor(props){
        super(props);
        this.state = { 
            type : "",
            item : "",
            loading:false,
         }
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

    // getDescription(e){
        
    //     this.setState({
    //         description: e.target.value
    //     })
    // }

    save(e){
        this.setState({ loading : true});
        e.preventDefault();
        Axios.post('/api/create_service_check',this.state).then(res=>{
            if(res.data.status == 200){
                this.props.history.push('/admin/service_check_list');
                Swal.fire({
                    icon: 'success',
                    title: 'URL Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                this.setState({
                    error_string:res.data.msg
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
                <div className="panel">
                <div className="panel-heading">
                    <h3 className="panel-title">Add New Service Check</h3>
                </div>
                    <div className="panel-body">
                        <div className="row col-sm-12">
                            <div className="col-sm-6">
                                <div className="fom-group">
                                    <label htmlFor="URL Path">Type</label>
                                    <select onChange={this.getType.bind(this)} className="form-control" name="type" >
                                            <option value="">Select</option>
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
                                    {/* <input onChange={this.getPath.bind(this)} type="text" className="form-control"></input> */}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="fom-group">
                                    <label htmlFor="URL Title">Items</label>
                                    <input onChange={this.getItems.bind(this)} className="form-control" name="item">
                                           
                                     </input>
                                    {/* <input onChange={this.getTitle.bind(this)} type="text" className="form-control"></input> */}
                                </div>
                            </div>
                        </div>
                        {/* <div className="row col-sm-12">
                            <div className="col-sm-12">
                                <div className="fom-group">
                                    <label htmlFor="URL Description">Description</label>
                                    <input onChange={this.getDescription.bind(this)} type="text" className="form-control"></input>
                                </div>
                            </div>
                        </div> */}
                        <div className="panel-footer text-right col-sm-12">
                        <button onClick={this.save.bind(this)} type="submit" disabled={loading} className="btn btn-primary">
                        { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                    { loading && <span > Loading...</span>}
                                     { !loading && <span >Save</span>}
                                     </button>
                        </div>
                    </div>
                </div>

                
            </div>
         );
    }
}
 
export default Addservicecheck;