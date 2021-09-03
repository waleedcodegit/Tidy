import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class CustomerCardIntegration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credit_card_number: '',
            cvc: '',
            card_holder_name: '',
            expiry_year: '',
            expiry_month: '',
            error_string:'',
            customer_id:this.props.user.data.id
        };
    }
    credit_card_number(e) {
        this.setState({
            credit_card_number: e.target.value
        })
    }
    cvc(e) {
        this.setState({
            cvc: e.target.value
        })
    }
    expiry_month(e) {
        this.setState({
            expiry_month: e.target.value
        })
    }
    expiry_year(e) {
        this.setState({
            expiry_year: e.target.value
        })
    }
    card_holder_name(e) {
        this.setState({
            card_holder_name: e.target.value
        })
    }
    validate_card() {
        Axios.post('/api/update_customer_card', this.state).then(res => {
            console.log(res);
            if (res.data.status) {
              this.props.changeUser({is_login:true,data:res.data.customer})
            } else {
                this.setState({
                    error_string: res.data.message
                })
            }

        }).catch((e)=>{
            this.setState({
                error_string:'Your Payment method is declined please try another.'
            })
        })
    }
    render() {
        return (
            <div className="card p-3 col-sm-12 mt-5">
            <div className="col-sm-12  p-3">
                <div className="form-group">
                    <label className="control-label">Name on Card</label>
                    <input value={this.state.card_holder_name || ""} onChange={this.card_holder_name.bind(this)} type="name" className="form-control" />
                </div>
            </div>
            <div className="col-sm-12">
                <div className="form-group">
                    <label className="control-label">Card Number</label>
                    <input value={this.state.credit_card_number || ""} onChange={this.credit_card_number.bind(this)} type="number" className="form-control" />
                </div>
            </div>
            <div className="col-sm-12 row">
                <div className="col-sm-3">
                    <div className="form-group">
                        <label className="control-label">CVC</label>
                        <input value={this.state.cvc || ""} onChange={this.cvc.bind(this)} type="number" placeholder="ex. 311" className="form-control" />

                    </div>
                </div>
                <div className="col-sm-1"></div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label className="control-label">Expiration</label>
                        <input value={this.state.expiry_month || ""} onChange={this.expiry_month.bind(this)} type="number" placeholder="MM" className="form-control" />
                    </div>
                </div>
                <div className="col-sm-1"></div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label className="control-label"></label>
                        <input value={this.state.expiry_year || ""} onChange={this.expiry_year.bind(this)} type="number" placeholder="YYYY" className="form-control" />
                    </div>
                </div>
            </div>
            {
                this.state.error_string != ''?
                <p className="text-center text-danger">{this.state.error_string}</p>
                :null
            }
            <div className="col-sm-12  text-right p-3">
               <button onClick={this.validate_card.bind(this)} className="btn btn-success ">Save</button>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}
const mapDispatchToProps = (disptach) => {
    return{
        CHANGE_AUTH_TYPE:(type)=>{disptach({type:'CHANGE_AUTH_TYPE',payload:type})},
        changeUser:(user)=>{disptach({type:'CHANGE_USER', payload:user})},
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps) (CustomerCardIntegration);