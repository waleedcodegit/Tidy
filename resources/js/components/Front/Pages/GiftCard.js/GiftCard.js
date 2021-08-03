import Axios from 'axios';
import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import ThankYouGiftCard from './ThankYouGiftCard';

class GiftCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount:10,
            name:'',
            recipient_email:'',
            confirm_email:'',
            sender_name:'',
            delivery_date:'',
            message:'',
            step:1,
            error_string:'',
            credit_card_number: '',
            cvc: '',
            expiry_date: '',
            card_holder_name: '',
            expiry_year: '',
            expiry_month: '',
            sender_email:'',
            show_thankyou:false,
            loading:false
        };
    }
    amount(e){
        this.setState({
            amount:e.target.value
        })
    }
    name(e){
        this.setState({
            name:e.target.value
        })
    }
    recipient_email(e){
        this.setState({
            recipient_email:e.target.value
        })
    }
    confirm_email(e){
        this.setState({
            confirm_email:e.target.value
        })
    }
    sender_name(e){
        this.setState({
            sender_name:e.target.value
        })
    }
    sender_email(e){
        this.setState({
            sender_email:e.target.value
        })
    }
    date(e){
        this.setState({
          delivery_date:e
        })
      }
    message(e){
        this.setState({
            message:e.target.value
        })
    }
    validate_gift_card_details(e){
        e.preventDefault();
        Axios.post('/api/validate_gift_card_details',this.state).then(res=>{
            console.log(res);
            if(res.data.status){
                this.setState({
                    step:2,
                    loading:false
                })
            }else{
                this.setState({
                    error_string:res.data.message
                })
            }
        })
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
    order_gift_card(e){
        e.preventDefault();
        // this.setState({
        //     loading:true
        // })
        Axios.post('/api/order_gift_card',this.state).then(res=>{
            if(res.data.status){
                this.setState({
                    show_thankyou:true,
                    loading:false
                })
            }else{
                this.setState({
                    error_string:res.data.message,
                    loading:false
                })
            }
        }).catch((e)=>{
            this.setState({
                error_string:'Your card details are not correct'
            })
        })
    }
    change_step(step){
        this.setState({
            step:step,
            error_string:''
        })
    }
    render() {
        return (
          <div className="container mt-5 mb-5">
             {
                 this.state.show_thankyou == false? 
                 <div className="row">
            <div className="card card-1">
                <div className="card-heading ">
                </div>
                <div className="card-body-gift">
                <div className="row">
                    <div div className="col-md-6">
                    <div className="gift-card-left text-center">
                        <h3 className="months_">
                        Gift For Your Loved One</h3>
                        <img src="/images/gift_card.png" />
                        <p>To Enjoy Any Of TidyHome Services Anytime Within </p>
                        <h3 className="months_">12 months</h3>
                    </div>
                    </div>
                   {
                       this.state.step == 1 ?
                       <div className="col-md-6">
                    <div className="gift-card-right ">
                        <h2 className="title">
                        Gift Card Details</h2>
                        <div className="divider-line" />
                        <form method="POST" className="services-page">
                        <div className="row">
                            <div className="col-md-6">
                            <label className="lbl-style"> *Amount<span>($10-$500 AUD)</span></label>
                            <div className="input-group">
                                <input value={this.state.amount}  onChange={this.amount.bind(this)} className="input--style-1" type="number"   />
                            </div>
                            </div>
                            <div className="col-md-6">
                            <label className="lbl-style"> *To<span>(Recipient Name)</span></label>
                            <div className="input-group">
                                <input value={this.state.name} onChange={this.name.bind(this)} className="input--style-1" type="text" placeholder name="name" />
                            </div>
                            </div>
                            <div className="col-md-6">
                            <label className="lbl-style"> *Recipient Email<span /></label>
                            <div className="input-group">
                                <input value={this.state.recipient_email} onChange={this.recipient_email.bind(this)} className="input--style-1" type="text" placeholder name="name" />
                            </div>
                            </div>
                            <div className="col-md-6">
                            <label className="lbl-style"> *Confirm Recipient Email<span /></label>
                            <div className="input-group">
                                <input value={this.state.confirm_email} onChange={this.confirm_email.bind(this)} className="input--style-1" type="text" placeholder name="name" />
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                            <label className="lbl-style"> *From<span>(Sender Name)</span></label>
                            <div className="input-group">
                                <input value={this.state.sender_name} onChange={this.sender_name.bind(this)} className="input--style-1" type="text" placeholder name="name" />
                            </div>
                            </div>
                            <div className="col-md-6">
                            <label className="lbl-style"> *From<span>(Sender Email)</span></label>
                            <div className="input-group">
                                <input value={this.state.sender_email} onChange={this.sender_email.bind(this)} className="input--style-1" type="text" placeholder name="name" />
                            </div>
                            </div>
                            <div className="col-md-12">
                            <label className="lbl-style"> *Delivery Date</label> <br></br>
                            {/* <label style={{fontSize:'14px', fontWeight:'300', marginTop:'-5px'}} className="">Choose a date you would like to send the e-Gift Card Details</label> */}
                            <div className="input-group">
                            <DatePicker id="example-datepicker"
                                dateFormat={"dd/MM/yyyy"}
                                selected={this.state.delivery_date} 
                                className="input--style-1 col-md-12"
                                placeholderText="dd/mm/yyyy"
                                minDate={new Date()}
                                //  showDisabledMonthNavigation
                                onChange={(date)=>{this.date(date)}} />
                                {/* <input className="input--style-1 js-datepicker" type="text" placeholder="2021-10-10" name="birthday" />
                                <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar" /> */}
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                            <label className="lbl-style"> *Message</label>
                            <div className="input-group">
                                <input value={this.state.message} onChange={this.message.bind(this)} className="input--style-msg" type="text" placeholder name="name" />
                            </div>
                            </div>
                        </div>
                        <div className="divider-line" />
                        {
                            this.state.error_string != '' ?
                            <p className="text-danger text-center">{this.state.error_string}</p>
                            :null
                        }
                        <div className="row">
                            <div className="col-md-9" />
                            <div className="col-md-3">
                            <button onClick={this.validate_gift_card_details.bind(this)}  className="p-t-20 btn btn--radius btn-success" type="submit" id="#collapseTwo">Next</button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                    : null
                   }
                   {
                       this.state.step == 2 ?
                     <div className = 'col-md-6'>
                        <div className="gift-card-right ">
                            <h2 className="title">
                            Enter Card Details</h2>
                            <form method="POST" className="services-page">
                            <div className="row">
                                <div className="col-md-12">
                                <label className="lbl-style"> *Name<span>(on card)</span></label>
                                <div className="input-group">
                                    <input onChange={this.card_holder_name.bind(this)} className="input--style-1" type="text" placeholder name="name" />
                                </div>
                                </div>
                                <div className="col-md-12">
                                <label className="lbl-style"> *Card Number</label>
                                <div className="input-group">
                                    <input onChange={this.credit_card_number.bind(this)} className="input--style-1" type="text" placeholder name="name" />
                                </div>
                                </div>
                                <div className="col-md-12">
                                <label className="lbl-style"> *CVC</label>
                                <div className="input-group">
                                    <input onChange={this.cvc.bind(this)} className="input--style-1" type="text" placeholder name="name" />
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                <label className="lbl-style"> *Expiry Month</label>
                                <div className="input-group">
                                    <input onChange={this.expiry_month.bind(this)} className="input--style-1 js-datepicker" type="text" placeholder name="birthday" />
                                    <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar" />
                                </div>
                                </div>
                                <div className="col-md-6">
                                <label className="lbl-style"> *Expiry Year</label>
                                <div className="input-group">
                                    <input onChange={this.expiry_year.bind(this)} className="input--style-1 js-datepicker" type="text" placeholder name="birthday" />
                                    <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar" />
                                </div>
                                </div>
                            </div>
                            {
                            this.state.error_string != '' ?
                            <p className="text-danger text-center">{this.state.error_string}</p>
                            :null
                            }
                            <div className="row">
                                <div className="col-md-3" >
                                    {/* <p onClick={this.change_step.bind(this,1)}>Back</p> */}
                                <button onClick={this.change_step.bind(this,1)} style={{width:'100%'}} className="p-t-20 btn btn--radius btn-info" type="submit" id="#collapseTwo">Back</button>

                                </div>
                                <div className="col-md-5" />
                                <div className="col-md-4">
                                <button disabled={this.state.loading} onClick={this.order_gift_card.bind(this)} style={{width:'100%'}} className="p-t-20 btn btn--radius btn-success" type="submit" id="#collapseTwo">Send Gift Card</button>
                                </div>
                               
                            </div>
                            </form>
                        </div>
                        </div>
                        :null
                   }
                </div>
                </div>
                </div>
            </div>
            :
            <ThankYouGiftCard recipient_email={this.state.recipient_email}></ThankYouGiftCard>
             }
          </div>

        );
    }
}

export default GiftCard;