import Axios from 'axios';
import Pusher from 'pusher-js';
import React, { Component } from 'react';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import { PUSHER_APP_KEY } from '../../../Configs/Api';

class AdminMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages:[],
            no_messages:[],
            newmessage:'',
            chat:{id:0}
        };
    }
     componentDidMount(){
       setInterval(()=>{
        Axios.post('/api/get_vendor_messages',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>{
            if(res.data.status == 200){
                if(this.state.messages.length > 0){
                    if(this.state.messages[this.state.messages.length-1].id != res.data.messages[res.data.messages.length - 1].id 
                        && 
                        this.state.messages[this.state.messages.length-1].sender != res.data.messages[res.data.messages.length - 1].sender 
                        ){
                        console.log('audio playing');
                        this.audioRef.play();

                    }
                }
             this.setState({
                 messages:res.data.messages,
                 no_messages:false,
             })
            }else{
             this.setState({
                 no_messages:true
             })
            }
         })
         this.set_scroll();
       },4000)
        

        // this.pusher = new Pusher(PUSHER_APP_KEY ,{
        //     authEndpoint:'/api/pusher_auth/'+this.props.vendor.data.vendor_id,
        //     cluster:'ap4',
        //     auth:{
        //         params:this.props.vendor.data.vendor_id,
        //         headers:{
        //             'X-CSRF-Token':window.csrfToken
        //         }
        //     }
        // });
        // console.log(this.pusher)
        // this.channel = this.pusher.subscribe('presence-message');
        // this.channel.bind(`client-message-${this.props.vendor.data.vendor_id}`,(signal) =>{
        //     console.log(signal); 
        //     Axios.post('/api/get_vendor_messages',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>{
        //         if(res.data.status == 200){
        //          this.setState({
        //              messages:res.data.messages,
        //              no_messages:false,
        //          })
        //         }else{
        //          this.setState({
        //              no_messages:true
        //          })
        //         }
        //      })
            
        //   })
        //   console.log(this.pusher)
        // console.log(this.channel)
     }
     handle_new_message(e){
        this.setState({
            newmessage:e.target.value
        })
    }
    set_scroll(){
        var d = $('#messages_div');
        d.scrollTop(d.prop("scrollHeight"));
    }
    send_message(e){
        e.preventDefault();
        let array = this.state.messages;
        let newmsg = {
            chat_id: this.state.chat.id,
            message: this.state.newmessage,
            sender:this.props.vendor.data.vendor_id,
            vendor_id:this.props.vendor.data.vendor_id
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
    
        // let data1 = {
        //     message:newmsg
        //   }
        //   let recipient = 'a';
        //   console.log(recipient);
        //   this.channel.trigger(`client-message-${recipient}`, {
        //     type: 'signal',
        //     userId: this.props.vendor.data.vendor_id,
        //     data: data1
        //   });
        // console.log(this.channel)
        Axios.post('/api/vendor_message_sender',newmsg).then(res=>{
            console.log(res);
            toast.success('message sent');
            Axios.post('/api/get_vendor_messages',{vendor_id:this.props.vendor.data.vendor_id}).then(res=>{
                if(res.data.status == 200){
                 this.setState({
                     messages:res.data.messages,
                     no_messages:false,
                 })
                }else{
                 this.setState({
                     no_messages:true
                 })
                }
             })
        })
    }
    render() {
        return (
            <div>
            <section className="section">
            <div className="section-body">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4>Chat with Admin</h4>
                    </div>
                    <div className="card-body"></div>
                <div className="container">
                 <audio ref={(input) => {this.audioRef = input}} src="/audio/text_sound.mp3" />
                   
                    <div className="messaging">
                        <div className="inbox_msg">
                        {
                               !this.state.no_messages?
                                    <div className="mesgs col-md-12">

                                   
                                    <hr></hr>

                                    <div id="messages_div"  className="msg_history">
                                        {
                                            this.state.messages.map((msg,index)=>{
                                                return(
                                                    <div key={index} className={msg.sender == this.props.vendor.data.vendor_id ? "outgoing_msg" : 'incoming_msg '}>
                                                        <div className={msg.sender == this.props.vendor.data.vendor_id ? "hide_img" : 'incoming_msg_img'}> 
                                                        {/* <img src={img_base+msg.profile_image} alt="sunil" /> */}
                                                         </div>
                                                        <div className={msg.sender == this.props.vendor.data.vendor_id ? "sent_msg" : ' received_msg'}>
                                                            <div className={msg.sender == this.props.vendor.data.vendor_id ? "" : 'received_withd_msg'}>
                                                                <p>{msg.message}</p>
                                                                <span className="time_date">{msg.time}    |  {msg.date}</span></div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <form>
                                            <input value={this.state.newmessage || ""} onChange={this.handle_new_message.bind(this)} type="text" className="write_msg" placeholder="Type a message" />
                                            <button onClick={this.send_message.bind(this)} className="msg_send_btn" type="submit"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            :null
                            }
                        </div>
                    </div></div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </section>

            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        vendor:state.vendor
    }
}
export default connect(mapStateToProps)(AdminMessages);
