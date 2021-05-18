import React, { Component } from 'react';
import { base_url, img_base, img_url } from '../../Configs/baseurls';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Axios from 'axios';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay_text:false,
            delay_items:false,
            cat_img:1,
            cat_images:[
                {
                    name:'cleaning-service.png'
                },
                {
                    name:'professional.png'
                },
                {
                    name:'getleads.png'
                }
            ],
            categories:[],
            showmodal:false,
            home_categories:[],
            business_categories:[],
            all_categories:[],
            current_cat:'',
            services:[],
            sub_services:[],
            services_track:[]
        };
        console.log(this.props);
    }
    componentDidMount(){
        Axios.post('https://cors-anywhere.herokuapp.com/'+base_url+'getcategory').then(res=>{
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

        const headers = {
            
            'Access-Control-Allow-Origin': "*",
            'accept': '*/*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
           }
        const data = [] ;
       
    }
    show_modal(){
        this.seletct_type(this.state.services_track[0].name);
        this.setState({
            showmodal: true,
        })
    }
    back_btn(){
        this.setState({
            categories:this.state.all_categories,
            current_cat:''
        })
    }
    hide_modal(){
        this.setState((state)=>({
            showmodal:false,
            services_track:[],
            categories:state.all_categories
        }))
    }
    manage_categories(data){
        this.setState((prevState)=>({
            services_track: [...prevState.services_track,data]
        }))
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
        let temp = this.state.services_track;
       
        this.state.all_categories.map((data,index)=>{
            if(data.name == val){
                temp[0] = data;
                
                subcat = data.subcategory
            }
        })
        
        this.setState({
            // services_track:temp,
            services:[],
            sub_services:[]
        },function(){
            this.setState({
                services:subcat
            },function(){
                if(this.state.services_track.length > 2){
                    console.log(this.state.services_track);
                    this.seletct_service(this.state.services_track[1].id)
                }
                
            })
        })
    }
    seletct_service(val){
        this.state.services.map((data,index)=>{
            if(data.id == val){
                // let temp = this.state.services_track;
                // temp[1] = data;
                // console.log(temp)
                // this.setState({
                //     services_track:temp,
                // },function(){
                   
                // })
                if(data.subcategory.length > 0){
                    this.setState({
                        
                        sub_services:data.subcategory,
                       
                    })
                }
            }
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
                                                                <img alt="ïmg" src={img_url+data.image}/>
                                                                    {/* <img src={img_base+'personal-information.png'}></img> */}
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
                                               {
                                                   this.state.current_cat != '' ?
                                                   <img onClick={this.back_btn.bind(this)} style={{float:'right',marginTop:'5px',cursor:'pointer'}} title='Back to Categories'  src="https://img.icons8.com/flat-round/40/000000/arrow-left.png"/>
                                                    :null
                                               }
                                        
                                    </div>
                                    </div>
                              
                            </div>
                        </div>
                    </div>

                </div>
                {
                    this.state.showmodal ? 
                    <div className="homemodal">
                        <div className="homemodal_card">
                            <div className="cross_div">
                                <img onClick={this.hide_modal.bind(this)} src="https://img.icons8.com/ios/30/000000/multiply.png"/>
                            </div>
                            <div className="track container">
                                <div className="step active"> <span className="icon"> <img src={img_base+'cleaning-service.png'}></img> </span> <span className="text">Choose Category</span> </div>
                                <div className="step "> <span className="icon"> <img src={img_base+'personal-information.png'}></img> </span> <span className="text"> Enter your information</span> </div>
                                <div className="step "> <span className="icon"> <img src={img_base+'price.png'}></img> </span> <span className="text"> Get Price or Qoute </span> </div>
                            </div>
                            <div className="container">
                                <div style={{marginTop:'90px'}}>
                                    <div className="col-md-6 ml-auto mr-auto">
                                        <div class="form-group ">
                                            <label className="form_label" for="comment">Select Service Type</label>
                                            <select value={this.state.services_track[0].name || ""} onChange={(e)=>{this.seletct_type(e.target.value)}}  class="form-control form_select" rows="5" id="comment">
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
                                            <select value={this.state.services_track[1] ? this.state.services_track[1].id : ""} onChange={(e)=>{this.seletct_service(e.target.value)}}  class="form-control form_select" rows="5" id="comment">
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
                                            <select value={this.state.services_track[2] ? this.state.services_track[2].id : ""}  class="form-control form_select" rows="5" id="comment">
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
                                    </div>
                                    
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

export default Slider;
