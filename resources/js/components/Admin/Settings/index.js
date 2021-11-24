import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id :0,
            holidays_price:0,
            level_price:0,
            house_additional_charges:0,
            per_bathroom: 0,
            per_bedroom: 0,
            admin_comission :0,
            loading:false,


        }
    }
    componentDidMount(){
        Axios.get(`/api/setting`,{ headers: {
            token: window.localStorage.getItem('testapistring')
        }}).then(res=>{
            console.log(res);
            if(res.data.status == 200) {
                this.setState({
                    id : res.data.settings.id,
                    holidays_price: res.data.settings.holidays_price,
                    level_price: res.data.settings.level_price,
                    house_additional_charges: res.data.settings.house_additional_charges,
                    per_bathroom: res.data.settings.bathroom,
                    per_bedroom: res.data.settings.bedroom,  
                    admin_comission: res.data.settings.admin_comission,                  
                })
            } 
        })
    }

    getHolidyCharges(event) {
        this.setState({
            holidays_price: event.target.value
        })
    }

    getLevelPrice(event) {
        this.setState({
            level_price: event.target.value
        })
    }

    getHouseExtraCharges(event){
        this.setState({
            house_additional_charges: event.target.value
        })
    }

    getBedroom(event) {
        this.setState({
            per_bedroom: event.target.value
        })
    }

    getBathroom(event) {
        this.setState({
            per_bathroom: event.target.value
        })
    }
    getAdmin_comission(event) {
        this.setState({
            admin_comission : event.target.value
        })
    }
    uploadSettings(e){
        this.setState({ loading : true});
        e.preventDefault();
        // let Configs = {
        //     headers: {
        //         token: window.localStorage.getItem('testapistring')
        //     }
        // }
        Axios.post(`/api/update-setting`, this.state).then(res=>{
            if(res.data.status == 200){
                toast.success('Setting Update Successfully',{position: "bottom-center"});
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Setting Update Successfully',
                //     showConfirmButton: false,
                //     timer: 1500
                // })
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
                <div id="page-content">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title">Settings</h3>
                            </div>
                            <form encType="multipart/form-data">
                            <div className="panel-body">
                                <div className="row">
                                    <table id="demo-dt-basic" className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Holiday Charges</th>
                                                <td>
                                                    <input type="number" onChange={this.getHolidyCharges.bind(this)} className="form-control" value={this.state.holidays_price || ""}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Level Price</th>
                                                <td>
                                                    <input  type="number" onChange={this.getLevelPrice.bind(this)} className="form-control" value={this.state.level_price || ""}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>House Extra Charges</th>
                                                <td>
                                                    <input  type="number" onChange={this.getHouseExtraCharges.bind(this)} className="form-control" value={this.state.house_additional_charges || ""}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Per BedRoom</th>
                                                <td>
                                                    <input  type="number" onChange={this.getBedroom.bind(this)} className="form-control" value={this.state.per_bedroom || ""}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Per BathRooms</th>
                                                <td>
                                                    <input  type="number" onChange={this.getBathroom.bind(this)} className="form-control" value={this.state.per_bathroom || ""}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Admin Comission</th>
                                                <td>
                                                    <input  type="number" onChange={this.getAdmin_comission.bind(this)} className="form-control" value={this.state.admin_comission || ""}/>
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="panel-footer text-right">
                                    <button onClick={this.uploadSettings.bind(this)} type="submit" disabled={loading}className="btn btn-primary">
                                    { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                    { loading && <span > Loading...</span>}
                                     { !loading && <span >Submit</span>}
                                            </button>
                                </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;