import React, { Component } from 'react';
import { img_baseurl } from '../../Configs/Api';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Axios from 'axios';
import { connect } from 'react-redux';
class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay_text:false,
            delay_items:false,
            cat_img:1,
            cat_images:[
               
            ],
            categories:[],
            showmodal:false,
            home_categories:[],
            business_categories:[],
            all_categories:[],
            current_cat:'',
            services:[],
            sub_services:[],
            services_track:0,
            service_type:'',
            service_name:'',
            sub_service:'',
            step:1
            
        };
        console.log(this.props);
    }
    componentDidMount(){
        Axios.post('/api/getcategory').then(res=>{
            console.log(res);    
            this.setState({
                    categories:res.data.categories,
                    all_categories:res.data.categories,
                    home_categories:res.data.home,
                    business_categories:res.data.bussiness
                })
            }).catch(e=>{
                console.log(e);
            })
        if(this.props.location.pathname != "/"){
            if(this.props.match.params.name){
                this.setState({
                    services_track:[{name:this.props.match.params.name == 'home' ? 'Home Services' : 'Business Services'}]
                },function(){
                    this.show_modal();
                })
                
            }else{
                this.setState({
                    services_track:[{name:''}]
                },function(){
                    this.show_modal();
                })
            }
        }
        
        setTimeout(()=>{
            this.setState({
                delay_text:true,
                delay_items:true
            })
        },700);

       
       
    }
    show_modal(){
         this.seletct_type(this.state.service_type);
         this.seletct_service(this.state.service_name);
         this.setState({
             step:2
         })
        this.props.changeModal(true);
    }
    back_btn(){
        this.setState({
            categories:this.state.all_categories,
            current_cat:''
        })
    }
    hide_modal(){
        this.setState((state)=>({
            services_track:0,
            categories:state.all_categories,
            current_cat: ''
        }))
        this.props.changeModal(false);
    }
    manage_categories(data){
        console.log(data);
        this.setState({
            services_track: this.state.services_track + 1
        },function(){
            console.log(this.state.services_track);
            if(this.state.services_track == 1){
                this.setState({
                    service_type:data.name
                })
            }else if(this.state.services_track == 2){
                this.setState({
                    service_name:data.id
                })
            }else{
                this.setState({
                    sub_service:data.id
                })
            }
        },function(){
            console.log(this.state)
        })
        
        if(data.subcategory){
            if(data.subcategory.length > 0){
                this.setState({
                    categories:data.subcategory,
                    current_cat:data.name
                })
            }else{
                this.show_modal();
            }
        }else{
            this.show_modal();
        }
    }
    seletct_type(val){
        let subcat = [];       
        this.state.all_categories.map((data,index)=>{
            if(data.name == val){
                subcat = data.subcategory
            }
        })
        
        this.setState({
            // services_track:temp,
            services:[],
            sub_services:[],
            service_type:val
        },function(){
            this.setState({
                services:subcat
            },function(){
                this.seletct_service(this.state.service_name);
            })
        })
    }
    seletct_service(val){
        console.log(val);
        this.state.services.map((data,index)=>{
            if(data.id == val){
                if(data.subcategory.length > 0){
                    this.setState({
                        sub_services:data.subcategory,
                        service_name:data.id
                    })
                }else{
                    this.setState({
                        service_name:data.id,
                        sub_services:[]
                    })
                }
            }
        })
    }

    Select_subService(val){
        this.setState({
            sub_service:val
        })
    }
    ProceedTOStep2(){
        this.setState({
            step:2
        })
    }
    render() {
        const responsive = {
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 4,
              slidesToSlide: 1, // optional, default to 1.
            },
            tablet: {
              breakpoint: { max: 1024, min: 600 },
              items: 2,
              slidesToSlide: 1, // optional, default to 1.
            },
            mobile: {
              breakpoint: { max: 600, min: 0 },
              items: 2,
              slidesToSlide: 1, // optional, default to 1.
            },
          };
        return (
            <div class="dl-slider">
                <div className="bg-img">
                    <div className="slider-content-wrap d-flex align-items-center text-center">
                        <div className="container">
                            <div className="slider-content">
                                <div className="dl-caption big">
                                    <div className="inner-layer">
                                        {
                                            this.state.delay_text ? 
                                            <div style={{color:'#fff'}} className="fade-in-bottom">
                                               Select the <span>Service</span> type
                                              
                                            </div>: null
                                        }
                                       
                                    </div>
                                </div>
                                {
                                this.state.current_cat != '' ?
                                <div className="text-center mt-2">
                                    <button onClick={this.back_btn.bind(this)} className="btn btn-light mr-1">Home Services</button>
                                    <button onClick={this.back_btn.bind(this)} className="btn btn-light">Business Services</button>
                                </div>
                                :null
                                }
                                <div className="container fade-in-bottom">
                                    <div className="">
                                    <Carousel 
                                            
                                                responsive={responsive}
                                                >
                                                {
                                                    this.state.categories.map((data,index)=>{
                                                        return(
                                                            <div onClick={this.manage_categories.bind(this,data)} className="item-pading ">
                                                            <div  className="  card p-2 item-servies">
                                                                <div className="fade-in-bottom py-2" >
                                                                <img alt="ïmg" src={img_baseurl+data.image}/>
                                                                    {/* <img src={img_baseurl+'personal-information.png'}></img> */}
                                                                </div>
                                                                <div>
                                                                    <p className="item_name py-2" >{data.name}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        )
                                                    })
                                                }
                                                
                                            </Carousel>
                                            {
                                                this.state.categories.length == 0 ?
                                                <div style={{width:'230px'}}  className="item-pading ml-auto mr-auto">
                                                            <div  className="  card p-2 item-servies">
                                                                <div className="fade-in-bottom py-2" >
                                                                <div id="displayspinner" style={{ display: 'block',}}>
                                                                    <div className="spinner-border  ml-2 text-dark spinner_format"  role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                </div>
                                                                <div>
                                                            <p className="item_name py-2" >Loading Categories...</p>
                                                        </div>
                                                    </div></div>
                                                </div>:null
                                            }
                                            <br></br>
                                               {/* {
                                                   this.state.current_cat != '' ?
                                                   <img onClick={this.back_btn.bind(this)} style={{float:'right',marginTop:'5px',cursor:'pointer'}} title='Back to Categories'  src="https://img.icons8.com/flat-round/40/000000/arrow-left.png"/>
                                                    :null
                                               } */}
                                        
                                    </div>
                                    </div>
                              
                            </div>
                        </div>
                    </div>

                </div>
                {
                    this.props.modal ? 
                    <div className="homemodal">
                        <div className="homemodal_card">
                            <div className="cross_div">
                                <img onClick={this.hide_modal.bind(this)} src="https://img.icons8.com/ios/30/000000/multiply.png"/>
                            </div>
                            <div className="track container">
                                <div className={this.state.step >= 1 ? "step active" : "step"}> <span className="icon"> <img src={img_baseurl+'cleaning-service.png'}></img> </span> <span className="text">Choose Category</span> </div>
                                <div className={this.state.step >= 2 ? "step active" : "step"}> <span className="icon"> <img src={img_baseurl+'personal-information.png'}></img> </span> <span className="text"> Enter your information</span> </div>
                                <div className={this.state.step == 3 ? "step active" : "step"}> <span className="icon"> <img src={img_baseurl+'price.png'}></img> </span> <span className="text"> Get Price or Qoute </span> </div>
                            </div>
                            <div className="container">
                                <div style={{marginTop:'90px'}}>
                                {
                                    this.state.step == 1 ?
                                    <div className="col-md-6 ml-auto mr-auto">
                                        <div class="form-group ">
                                            <label className="form_label" for="comment">Select Service Type</label>
                                            <select value={this.state.service_type || ""} onChange={(e)=>{this.seletct_type(e.target.value)}}  class="form-control form_select" rows="5" id="comment">
                                                <option value="">Choose..</option>
                                                {
                                                    this.state.all_categories.map((data,index)=>{
                                                       return(
                                                        <option key={index} value={data.name}>{data.name}</option>
                                                       )
                                                       
                                                    })
                                                }
                                            </select>
                                        </div>
                                        {
                                            this.state.services.length > 0 ?
                                            <div class="form-group ">
                                            <label className="form_label" for="comment">Select Service</label>
                                            <select value={this.state.service_name || ""} onChange={(e)=>{this.seletct_service(e.target.value)}}  class="form-control form_select" rows="5" id="comment">
                                                <option value="">Choose..</option>
                                                {
                                                    this.state.services.map((data,index)=>{
                                                       return(
                                                        <option key={index} value={data.id}>{data.name}</option>
                                                       )
                                                       
                                                    })
                                                }
                                            </select>
                                        </div>
                                        :null
                                        }
                                        {
                                            this.state.sub_services.length > 0 ?
                                            <div class="form-group ">
                                            <label className="form_label" for="comment">Select Sub Service</label>
                                            <select onChange={(e)=>{this.Select_subService(e.target.value)}} value={this.state.sub_service || ""}  class="form-control form_select" rows="5" id="comment">
                                                <option value="">Choose..</option>
                                                {
                                                    this.state.sub_services.map((data,index)=>{
                                                       return(
                                                        <option key={index} value={data.id}>{data.name}</option>
                                                       )
                                                       
                                                    })
                                                }
                                            </select>
                                        </div>
                                        :null
                                        }
                                        <div class="form-group ">
                                            <button onClick={this.ProceedTOStep2.bind(this)} className="btn btn-outline-success btn_continue">Continue</button>
                                        </div>
                                    </div>
                                    :null
                                }
                                {
                                    this.state.step == 2 ?
                                     <div className="col-md-6 ml-auto mr-auto">
                                        <div class="form-group ">
                                            <label className="form_label" for="comment">Resident Type</label>
                                            <select  className="form-control form_select" type="text">
                                                <option>--Select Resident type--</option>
                                                <option>House</option>
                                                <option>Apartment</option>
                                            </select>
                                        </div>
                                        <div class="form-group ">
                                            <label className="form_label" for="comment">Enter No. Levels</label>
                                            <input  className="form-control form_select" type="text"></input>
                                        </div>
                                        <div class="form-group ">
                                            <label className="form_label" for="comment">Enter No. of Bedrooms</label>
                                            <input  className="form-control form_select" type="text"></input>
                                        </div>
                                        <div class="form-group ">
                                            <label className="form_label" for="comment">Enter No. Bathrooms</label>
                                            <input  className="form-control form_select" type="text"></input>
                                        </div>
                                        <div class="form-group ">
                                            <button className="btn btn-outline-success btn_continue">Continue</button>
                                        </div>
                                    </div>
                                    :null
                                }  
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    :null
                }
            </div>
        );
    }
}
const mapDistpatchToProps = (dispatch) =>{
    return{
        changeModal:(modal)=>{dispatch({type:'CHANGE_SERVICES_MODAL',payload:modal})}
    }
}
const mapStateToProps = (state) => {
    return{
        modal:state.services_modal
    }
}
export default connect(mapStateToProps,mapDistpatchToProps)(Slider);
