import Axios from 'axios';
import React, { Component } from 'react';
import { Navbar, Nav  } from 'react-bootstrap';


// import { base_url } from '../Configs/Base_Urls';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            insurance_certificate_type:'own',
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            address:'',
            phone:'',
            dob:'',
            australian_business_number:'',
            type_of_business:'',
            business_name:'',
            trading:'',
            insurance_certificate:'',
            credit_card_number:'',
            cvc:'',
            expiry_date:'',
            card_holder_name:'',
            duration_of_insu_charges:'',
            expiry_year:'',
            expiry_month:'',
            error_string:'',
            businessname:'',
            btn_loading:false

        };
    }
    InsuranceType(type){
        this.setState({
            insurance_certificate_type:type
        })
    }
    first_name(e){
        this.setState({
            first_name:e.target.value
        })
    }
    last_name(e){
        this.setState({
            last_name:e.target.value
        })
    }
    email(e){
        this.setState({
            email:e.target.value
        })
    }
    password(e){
        this.setState({
            password:e.target.value
        })
    }
    address(e){
        this.setState({
            address:e.target.value
        })
    }
    phone(e){
        this.setState({
            phone:e.target.value
        })
    }
    dob(e){
        this.setState({
            dob:e.target.value
        })
    }
    australian_business_number(e){
        this.setState({
            australian_business_number:e.target.value
        })
    }
    type_of_business(e){
        this.setState({
            type_of_business:e.target.value
        })
    }
    business_name(e){
        this.setState({
            business_name:e.target.value
        })
    }
    trading(e){
        this.setState({
            trading:e.target.value
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
    Create_Vendor(e){
        e.preventDefault();
        console.log(this.state);
    
        
        this.setState({
            btn_loading:true
        })
        Axios.post('/api/create-vendor',this.state).then(res=>{
            this.setState({
                btn_loading:false
            })
            console.log(res);
            if(res.data.status){

                this.props.history.push('/vendor-signup/2/'+res.data.vendor.id);
            }else{
                this.setState({
                    error_string:res.data.message
                })
            }
        }).catch(e => {console.log(e)})
    }
    render() {
        return (
            <div >
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <div className="panel">
                            <form className="mb-5">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="control-label">Firstname</label>
                                                <input onChange={this.first_name.bind(this)} type="firstname" name="firstname" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="control-label">Lastname</label>
                                                <input onChange={this.last_name.bind(this)}type="lastname" name="lastname" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Email</label>
                                                <input onChange={this.email.bind(this)} type="email" name="email" className="form-control" />
                                            </div>
                                        </div>
                                        {/* <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Password</label>
                                                <input onChange={this.password.bind(this)} type="password" className="form-control" />
                                            </div>
                                        </div> */}
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Phone</label>
                                                <input onChange={this.phone.bind(this)} type="phone" name="phone" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Date of Birth</label>
                                                <input onChange={this.dob.bind(this)} type="date" name="dob" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Address</label>
                                                <input onChange={this.address.bind(this)} type="text" name="address" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Australian Business Number</label>
                                                <p style={{fontSize:'12px'}} className="mb-1 py-1">Please note your name on this application must match the first and last
                                                 name registered to your ABN. If you do not have ABN yet, click here to <a target="blank" href="https://www.abr.gov.au/business-super-funds-charities/applying-abn">learn more</a>.</p>
                                                <input onChange={this.australian_business_number.bind(this)} type="number" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Type of Business</label>
                                                <select onChange={this.type_of_business.bind(this)} type="text" className="form-control" >
                                                    <option>-- Select type of business--</option>
                                                    <option value={'Individual'}>Sole trader</option>
                                                    <option value={'company'}>Company</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Business Name</label>
                                                <input onChange={this.business_name.bind(this)} type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div >
                                        
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Trading as (optional)</label>
                                                <input onChange={this.trading.bind(this)} type="text" className="form-control" />
                                            </div>
                                        </div>
                                        
                                        
                                        
                                    </div>
                                </div>
                                {
                                    this.state.error_string != '' ?
                                    <p className="text-danger text-center">{this.state.error_string}</p>
                                    :null
                                }
                                <div className="panel-footer text-right">
                                    <button onClick={this.Create_Vendor.bind(this)} className="btn btn-success   " type="submit">
                                    {
                                        this.state.btn_loading ? 
                                        <div id="displayspinner" style={{ display: 'block',}}>
                                                                    <div className="spinner-border  ml-2 text-light spinner_format"  role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                </div>
                                                                :<>Next</>
                                    }
                                    </button>
                                </div>
                            </form>
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

export default SignUp;