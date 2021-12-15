import React, { Component } from 'react';
// import './chat.css'
import Axios from 'axios';
import {connect} from 'react-redux';

import toast from 'react-hot-toast';


class CustomerMessages extends Component {
    constructor(props) {
        super(props);
        this.state={
            chats:[],
            messages:[],
            all_messages:[],
            active_chat:0,
            // uid:this.props.user.uid,
            newmessage:'',
            chat_user_id:'',
            render_messages:true,
            chat_intiator:0,
            messages:[],
            no_messages:true,
            chat:{first_name:'',last_name:''},
        }
        console.log(props);
     
    }
    get_new_msgs(){
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            vednor_id:this.props.vendor.data.vendor_id
        }
        Axios.post('/api/get_vendor_customer_chats',senderdata).then(res=>{
        this.setState({
            chats:res.data
        })
        if(res.data.length > 0){
            Axios.post('/api/get_customer_vendor_chat_messages',{chat_id:res.data[0].id}).then(res=>{
               if(res.data.status == 200){
                this.setState({
                    messages:res.data.messages,
                    
                   
                })
               }else{
                this.setState({
                    no_messages:true,
                    
                })
               }
            })
        }
       
        this.set_res(res.data);
        this.set_scroll();
       })
    }
    componentWillMount(){
      setInterval(() => {
        Axios.post('/api/get_vendor_customer_chats',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>{
            this.setState({
                chats:res.data,
                chat:this.state.active_chat == 0 ? res.data[0] : this.state.chat,
                active_chat: this.state.active_chat == 0 ? res.data[0].id : this.state.active_chat
            })
            
            if(res.data.length > 0){
                Axios.post('/api/get_customer_vendor_chat_messages',{chat_id:this.state.active_chat == 0 ? res.data[0].id : this.state.active_chat}).then(res=>{
                    this.set_scroll();
                    console.log(Request)
                   if(res.data.status == 200){
                    if(this.state.messages.length > 0){
                        if(this.state.messages[this.state.messages.length-1].id != res.data.messages[res.data.messages.length - 1].id 
                            && 
                            this.state.messages[this.state.messages.length-1].sender != res.data.messages[res.data.messages.length - 1].sender 
                            ){
                            
                            this.audioRef.play();
    
                        }
                    }
                    this.setState({
                        messages:res.data.messages,
                        no_messages:false,
                       
                    })

                   }else{
                    this.setState({
                        no_messages:true,
                        
                    })
                   }
                })
            }
        })
        this.set_scroll();
      }, 5000);
        // this.pusher = new Pusher(PUSHER_APP_KEY ,{
        //     authEndpoint:'/api/pusher_auth/a',
        //     cluster:'ap4',
        //     auth:{
        //         params:'a',
        //         headers:{
        //             'X-CSRF-Token':window.csrfToken
        //         }
        //     }
        // });

        // this.channel = this.pusher.subscribe('presence-message');
        // console.log(this.channel)
        // this.channel.bind(`client-message-a`,(signal) =>{
        //     console.log(signal)
        //     Axios.post('/api/get_vendor_chats').then(res=>{
        //         this.setState({
        //             chats:res.data,
        //             chat:res.data[0]
        //         })
        //         if(res.data.length > 0){
        //             Axios.post('/api/get_vendor_chat_messages',{chat_id:this.state.active_chat}).then(res=>{
                       
        //                if(res.data.status == 200){
        //                 this.setState({
        //                     messages:res.data.messages,
        //                     no_messages:false,
        //                 })
        //                }else{
        //                 this.setState({
        //                     no_messages:true
        //                 })
        //                }
        //             })
        //         }
        //     })
          
        // })
    }
    set_scroll(){
        var d = $('#messages_div');
        d.scrollTop(d.prop("scrollHeight"));
    }
    set_res(data){
        this.setState({
            chats:data.chats,
            all_messages:data.messages
        })
        this.filter_chat_messages();
    }
    filter_chat_messages(){
        if(this.state.active_chat != 0){
            this.state.all_messages.map((msg,index)=>{
                if(this.state.active_chat == msg[0].chat_id){
                    this.setState({
                        messages:msg
                    },function(){
                        this.set_scroll();
                    })
                }
             })
        }else{
            this.setState({
                active_chat:this.state.chats[0].id,
                chat_user_id:this.state.chats[0].chat_user_id,
                chat_intiator:this.state.chats[0].user_id
            },function(){
                this.state.all_messages.map((msg,index)=>{
                   if(this.state.active_chat == msg[0].chat_id){
                       this.setState({
                           messages:msg
                       },function(){
                        this.set_scroll();
                       })
                   }
                })
            })
        }
        
    }
    handle_new_message(e){
        this.setState({
            newmessage:e.target.value
        })
    }
    send_message(e){
        e.preventDefault();
        let array = this.state.messages;
        let newmsg = {
            chat_id: this.state.active_chat,
            message: this.state.newmessage,
            user_id:this.state.uid,
            sender:'a',
            customer_id:this.state.chat.customer_id
        }
        array.push(newmsg);
        this.setState({
            messages:array
        },function(){
            this.set_scroll();
            this.setState({
                newmessage:''
            })
        })
    
          Axios.post('/api/vendor_customer_message_sender',newmsg).then(res=>{
            toast.success('message sent');
            Axios.post('/api/get_customer_vendor_chat_messages',{chat_id:this.state.active_chat}).then(res=>{
                if(res.data.status == 200){
                 this.setState({
                     messages:res.data.messages,
                     no_messages:false,
                   
                 })
                }else{
                 this.setState({
                     no_messages:true,
                     
                 })
                }
             })
        })
        //   let recipient = this.state.chat.customer_id;
        //   console.log(recipient);
        //   this.channel.trigger(`client-message-${recipient}`, {
        //     type: 'signal',
        //     userId: this.state.uid,
        //     data: data1
        //   });
        //   console.log(this.channel)
       
    }
    change_active_chat(chat){
        Axios.post('/api/get_customer_chat_messages',{chat_id:chat.id}).then(res=>{
            if(res.data.status == 200){
             this.setState({
                 messages:res.data.messages,
                 active_chat:chat.id,
                 chat:chat
             })
            }else{
             this.setState({
                 no_messages:true,
                 active_chat:chat.id,
                 chat:chat
             })
            }
         })

       
    }
    render() {
        return (
            <div>
           
            <div id="page-content">
            <div className="row">
                <div className="col-sm-12">
                <div className="panel panel-bordered">
                    <div className="panel-heading">
                    <h3 className="panel-title">Customer Messages</h3>
                    </div>
                    <div className="panel-body">
                    <div className="panel">
                <div className="">
                <audio ref={(input) => {this.audioRef = input}} src="/audio/text_sound.mp3" />
                    <div className="messaging mt-3">
                        <div className="inbox_msg chat-card-content row">
                            <div className="inbox_people col-md-3">
                                <div className="headind_srch">
                                    <div className="recent_heading">
                                        <h4>Recent</h4>
                                    </div>
                                    <div className="srch_bar">
                                        <div className="stylish-input-group">
                                            <input type="text" className="search-bar" placeholder="Search" />
                                            {/* <span className="input-group-addon">
                                                <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                            </span>  */}
                                            </div>
                                    </div>
                                </div>
                                {/* active_chat */}
                                <div className="inbox_chat">
                                    {
                                        this.state.chats.map((chat,index)=>{
                                            return(
                                                <div onClick={this.change_active_chat.bind(this,chat)} key={index} className={this.state.active_chat == chat.id ? "chat_list active_chat" : "chat_list"}>
                                                    <div className="chat_people">
                                                        {/* <div className="chat_img"> <img src={img_base+chat.profile_image} alt="sunil" /> </div> */}
                                                        <div className="chat_ib">
                                                            <h5>{chat.customer.first_name} {chat.customer.last_name}<span className="chat_date">{chat.booking.service.name}</span></h5>
                                                            {/* <p>Test, which is a new approach to have all solutions
                                        astrology under one roof.</p> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {
                               !this.state.no_messages?
                                    <div className="mesgs col-md-8">

                                    <div className="mb-3">
                                        <h4>{this.state.chat.first_name} {this.state.chat.last_name}</h4>
                                    </div>
                                    <hr></hr>

                                    <div id="messages_div"  className="msg_history">
                                        {
                                            this.state.messages.map((msg,index)=>{
                                                return(
                                                    <div key={index} className={msg.sender == 'a' ? "outgoing_msg" : 'incoming_msg '}>
                                                        <div className={msg.sender == 'a' ? "hide_img" : 'incoming_msg_img'}> 
                                                        {/* <img src={img_base+msg.profile_image} alt="sunil" /> */}
                                                         </div>
                                                        <div className={msg.sender == 'a' ? "sent_msg" : ' received_msg'}>
                                                            <div className={msg.sender == 'a' ? "" : 'received_withd_msg'}>
                                                                <p>{msg.message}</p>
                                                                <span className="time_date">{msg.time}    |  {msg.date}</span></div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                <div className="type_msg" style={{outline:"auto"}}>
                                    <div className="input_msg_write">
                                        <form>
                                            <input value={this.state.newmessage || " "} onChange={this.handle_new_message.bind(this)} type="text" className="write_msg" placeholder="Type a message" />
                                            <button onClick={this.send_message.bind(this)} className="msg_send_btn" type="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            :<div>
                            <h3>
                                No Previous Messages, you can start chat by sending a message
                            </h3>
                            <div className="type_msg" style={{outline:"auto"}}>
                                <div className="input_msg_write">
                                    <form>
                                        <input value={this.state.newmessage || ""} onChange={this.handle_new_message.bind(this)} type="text" className="write_msg" placeholder="Type a message" />
                                        <button onClick={this.send_message.bind(this)} className="msg_send_btn" type="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
    
    </div>

        );
    }
}
const mapStateToProps = (state)=>{
    return {
        vendor:state.vendor
    }
}
export default connect(mapStateToProps)(CustomerMessages);