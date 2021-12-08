import Axios from 'axios';
import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';

import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';


class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            sender_name:'',
            sender_phone:'',
            message:'',
            sender_email:'',
            loading:true,
            btn_loading:false,
        };
    }
    componentDidMount(){
        Axios.get('/api/edit-content').then(res=>{
            console.log(res)
           this.setState({
               modern_lives : res.data.data.modern_lives,
               loading:false
            
           })
        })
       
    }
    Sender_name(e){
        this.setState({
            sender_name:e.target.value
        })
    }
    Sender_email(e){
        this.setState({
            sender_email:e.target.value
        })
    }
    Sender_phone(e){
        this.setState({
            sender_phone:e.target.value
        })
    }
   
      Message(e){
        this.setState({
            message:e.target.value
        })
    }
    

   
    change_step(step){
        this.setState({
            step:step,
            error_string:'',
           
        })
    }
    
    SendEmail(e){
        this.setState({ btn_loading : true});
        e.preventDefault();
        Axios.post('/api/send-contectus-email',this.state).then(res=>{

            if(res.data.status == 200){
                toast.success('Email send');
                    this.setState({ btn_loading : false});
                window.location.reload(false);
            } else {
                toast.error(res.data.message)
                    this.setState({ btn_loading : false});
            }    
        })
    }
    render() {
        const {btn_loading} = this.state;
        return (
            <div>
                 {
                    this.state.loading  ?
                    <div id="displayspinner" style={{ display: 'block', marginLeft: '48%', marginTop: '20%',marginBottom: '20%' }}>
                    <div className="spinner-border  ml-2 text-dark spinner_format"  role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    </div>
                        : 
          <div className="container mt-5 mb-5" style={{margin:'0px'}}>
             {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26502.753900513148!2d151.19248234657928!3d-33.867904911997805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae401e8b983f%3A0x5017d681632ccc0!2sSydney%20NSW%202000%2C%20Australia!5e0!3m2!1sen!2s!4v1636974961063!5m2!1sen!2s" width={1670} height={650} style={{border: 0}} allowFullScreen loading="lazy" /> */}
                  

           
                  <div  className="row">
                  </div>
                    <div style={{marginLeft:'420px' , marginRight:"230px"}} className="card card-1">
                <div className="card-heading ">
                </div>
                <div className="card-body-gift">
                <div className="row">
            
                  
                       <div className="col-md-12">
                  <div className="gift-card-right ">
                        <h1 className="title" style={{textAlign:"center"}}>
                        Contact us </h1>
                        <div className="divider-line" />
                        <form method="POST" className="services-page">
                        <div className="row">
                            <div className="col-md-12">
                            <label className="lbl-style">Name</label>
                            <div className="input-group">
                                <input value={this.state.sender_name} onChange={this.Sender_name.bind(this)} className="form-control auth_input_box" type="text" placeholder name="name" />
                            </div>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-md-6">
                            <label className="lbl-style">Email<span></span></label>
                            <div className="input-group">
                                <input value={this.state.sender_email} onChange={this.Sender_email.bind(this)}  className="form-control auth_input_box" type="email" placeholder name="email" />
                            </div>
                            </div>
                            <div className="col-md-6">
                            <label className="lbl-style">Phone<span></span></label>
                            <div className="input-group">
                                <input value={this.state.sender_phone} onChange={this.Sender_phone.bind(this)}  className="form-control auth_input_box" type="number" placeholder name="name" />
                            </div>
                            </div>
                         
                        </div>
                    
                        <div className="row">
                            <div className="col-md-12">
                            <label className="lbl-style">Message</label>
                            <div className="input-group">
                                <textarea value={this.state.message} onChange={this.Message.bind(this)} className="form-control auth_input_box" type="text" placeholder name="name" />
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
                            <div className="col-md-12" />
                            <div className="col-md-6">
                            <button style={{display: 'block', width: '212%', border: 'none', backgroundColor:' #04AA6D',color:' white',padding: '14px 28px', fontSize: '16px',cursor: 'pointer',textAlign: 'center'}}
                             onClick={this.SendEmail.bind(this)} disabled={ btn_loading} className="p-t-20 btn btn--radius btn-success" type="submit" id="#collapseTwo">
                                  { btn_loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                                            { btn_loading && <span > Loading...</span>}
                                                           { !btn_loading && <span >  Send Message</span>}
                                </button>
                            </div>
                        </div>
                        </form>
                
           
          </div>
          </div>
         
          </div>
          </div>
           </div> 
           </div>
    }
           </div>

        );
    }
}

export default ContactUs;
