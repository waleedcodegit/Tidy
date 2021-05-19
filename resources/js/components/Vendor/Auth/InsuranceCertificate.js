import Axios from 'axios';
import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class InsuranceCertificate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btn_loading:false,
            services:[],
            insurance_certificate:'',
            credit_card_number:'',
            cvc:'',
            expiry_date:'',
            card_holder_name:'',
            duration_of_insu_charges:'',
            expiry_year:'',
            expiry_month:'',
            insurance_certificate_type:'own',
            vendor_id:this.props.match.params.vendor_id
        };
    }
    
    submit_insurance(){
        if(this.state.insurance_certificate_type == 'own'){
            if(this.state.insurance_certificate == ''){

                this.setState({
                    error_string:'Please Upload Insurance Certificate'
                })
                return ;
            }
        }
        this.setState({
            btn_loading:true
        })
        Axios.post('/api/vendor_insurance_certificate',this.state).then(res=>{
            if(res.data.status == 200 ){
                this.props.history.push('/vendor-signup/4/'+this.props.match.params.vendor_id);
            }else{
                this.setState({
                    error_string:res.data.message
                })
            }
            this.setState({
                btn_loading:false
            })
            console.log(res);
        })
    }
    SelectService(index){
        let temp = this.state.services;
        temp[index].check = !temp[index].check;
        this.setState({
            services:temp
        })
    }
    insurance_certificate(e){
        if (e.target.files) {
            const files = Array.from(e.target.files);
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
                    insurance_certificate: images[0]
                },function(){
                    console.log(this.state.insurance_certificate);
                })
            }, error => { console.error(error); });
           
        }
    }
    credit_card_number(e){
        this.setState({
            credit_card_number:e.target.value
        })
    }
    cvc(e){
        this.setState({
            cvc:e.target.value
        })
    }
    expiry_month(e){
        this.setState({
            expiry_month:e.target.value
        })
    }
    expiry_year(e){
        this.setState({
            expiry_year:e.target.value
        })
    }
    card_holder_name(e){
        this.setState({
            card_holder_name:e.target.value
        })
    }
    duration_of_insu_charges(e){
        this.setState({
            duration_of_insu_charges:e.target.value
        })
    }
    InsuranceType(type){
        this.setState({
            insurance_certificate_type:type
        })
    }
    render() {
        return (
            <div >
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="text-center center_title">Upload or Buy Insurance Certificate</h3>
                            </div>
                                <div className="panel-body">
                                <div className="col-sm-12 ">
                                        <Tabs>
                                            <TabList>
                                            <Tab onClick={this.InsuranceType.bind(this,'own')}>Upload Insurance Certificate</Tab>
                                            <Tab onClick={this.InsuranceType.bind(this,'admin')}>Buy Insurance Certificate</Tab>
                                            </TabList>
                                            <TabPanel>
                                            <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control-label">Insurance Cerificate</label>
                                                        <input onChange={this.insurance_certificate.bind(this)} type="file" className="form-control" />
                                                    </div>
                                            </div>
                                            </TabPanel>
                                            <TabPanel>
                                            <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control-label">Name on Card</label>
                                                        <input onChange={this.card_holder_name.bind(this)} type="name" className="form-control" />
                                                    </div>
                                            </div>
                                            <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control-label">Card Number</label>
                                                        <input onChange={this.credit_card_number.bind(this)} type="number" className="form-control" />
                                                    </div>
                                            </div>
                                            <div className="col-sm-12 row">
                                                <div className="col-sm-3">
                                                    <div className="form-group">
                                                        <label className="control-label">CVC</label>
                                                        <input onChange={this.cvc.bind(this)} type="number" placeholder="ex. 311" className="form-control" />

                                                    </div>
                                                </div>
                                                <div  className="col-sm-1"></div>
                                                <div className="col-sm-3">
                                                    <div className="form-group">
                                                        <label className="control-label">Expiration</label>
                                                        <input onChange={this.expiry_month.bind(this)} type="number" placeholder="MM" className="form-control" />
                                                    </div>
                                                </div>
                                                <div  className="col-sm-1"></div>
                                                <div className="col-sm-3">
                                                    <div className="form-group">
                                                    <label className="control-label"></label>
                                                        <input onChange={this.expiry_year.bind(this)} type="number" placeholder="YYYY" className="form-control" />
                                                    </div>
                                                </div>
                                            </div> 
                                            {/* <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control-label">Recurring Payment Deduction</label>
                                                        <select onChange={this.duration_of_insu_charges.bind(this)} type="number" placeholder="MM" className="form-control" >
                                                            <option value="1">Weekly</option>
                                                            <option value="2">Monthly</option>
                                                        </select>
                                                    </div>
                                                </div>*/}
                                            </TabPanel>
                                        </Tabs>
                                        
                                        </div>
                                 </div>
                                {
                                    this.state.error_string != '' ?
                                    <p className="text-danger text-center">{this.state.error_string}</p>
                                    :null
                                }
                                <div className="panel-footer text-center">
                                    <button onClick={this.submit_insurance.bind(this)} className="btn btn-success  col-sm-12 " type="submit">
                                    {
                                        this.state.btn_loading ? 
                                        <div id="displayspinner" style={{ display: 'block',}}>
                                                                    <div className="spinner-border  ml-2 text-light spinner_format"  role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                </div>
                                            :<>Continue...</>
                                    }
                                    </button>
                                </div>
                            
                            {/*===================================================*/}
                            {/*End Block Styled Form */}
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>

            </div>
        );
    }
}

export default InsuranceCertificate;
