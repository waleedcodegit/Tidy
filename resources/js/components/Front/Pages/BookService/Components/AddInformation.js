
import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import CustomerLocation from "../Components/CustomerLocation";
import { MAP_PLACES_API_KEY } from '../../../../Configs/Api';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

class AddInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_of_service: 1,
            questions: [],
            bathrooms: 1,
            bedrooms: 1,
            category:{},
            setting:{},
            answers:[],
            where_parking:'',
            no_parking:'',
            is_free_parking:'No',
            not_at_home:'',
            is_parking_available:'No',
            will_at_home:'No',
            resident_type:'House',
            levels:1,
            error_string:'',
            extras:[],
            prem_vendor_enterance:'',
            lat:0,
            long:0,
            place:'',
            loc_address:'',
            loading: false,
        };
    }

    Submit(val, e , place) {
        this.setState({ loading : true});
        e.preventDefault();
        if(this.state.questions.length > 0){
           if(this.state.answers.length != this.state.questions.length){
            this.setState({
                error_string:'Please Enter all the answers of above questions'
            })
            setTimeout(() => {
                this.setState({ loading : false});
              }, 2000);
            return ;
           }
        }
        if(this.state.is_parking_available == 'Yes'){
            if(this.state.where_parking == ''){
                this.setState({
                    error_string:'Please Enter the Where is Parking'
                })
                setTimeout(() => {
                    this.setState({ loading : false});
                  }, 2000);
                return ; 
            }
            
            if(this.state.is_free_parking == ''){
                this.setState({
                    error_string:'Please Enter Is Parking Free or Not'
                })
                setTimeout(() => {
                    this.setState({ loading : false});
                  }, 2000);
                return ;
            }
        }
       if(this.state.will_at_home == 'No'){
           if(this.state.prem_vendor_enterance == ''){
            this.setState({
                error_string:'Please Enter how the vendor can enter the premises'
            })
            setTimeout(() => {
                this.setState({ loading : false});
              }, 2000);
            return ;  
       }
 
    }
       this.props.ADD_INFORMATION(this.state);
        this.props.change_step(val);
          if(this.state.loc_address != ''){
            this.props.changeLocation(this.state);
            this.props.change_step(4);
            toast.success('Success');
           
        }else
        {
            toast.error('Please Enter You Location');
        }
        setTimeout(() => {
            this.setState({ loading : false});
          }, 2000);
    }
   


    places(place){

        let lat  = place.geometry.location.lat();
        let long = place.geometry.location.lng();
        this.setState({
            places:place,
            lat:lat,
            long:long,
            loc_address:place.formatted_address
        })
       
    }
    componentDidMount() {
        console.log(this.props)
        Axios.post('/api/get_information_content', { id: this.props.select_service_state.service_id }).then(res => {
            // Axios.post('/api/get_information_content', { id:  1}).then(res => {
            this.setState({
                loading: false,
                category:res.data.category,
                settings:res.data.settings,
                questions:res.data.questions,
                extras:res.data.extras
            })
            console.log(res);
        })
    }
    add_bathroom() {
        this.setState({
            bathrooms: this.state.bathrooms + 1
        })
    }
    minus_bathroom() {
        if (this.state.bathrooms > 1) {
            this.setState({
                bathrooms: this.state.bathrooms - 1
            })
        }
    }
    add_bedroom() {
        this.setState({
            bedrooms: this.state.bedrooms + 1
        })
    }
    minus_bedroom() {
        if (this.state.bedrooms > 1) {
            this.setState({
                bedrooms: this.state.bedrooms - 1
            })
        }
    }
    add_levels() {
        this.setState({
            levels: this.state.levels + 1
        })
    }
    minus_levels() {
        if (this.state.levels > 1) {
            this.setState({
                levels: this.state.levels - 1
            })
        }
    }
    onChangeTextAnswer(val,question){
        let ans = this.state.answers;
        let check = 0;
        ans.map(data_=>{
            if(data_.id == question.id){
                data_.answer = val
                check = 1;
            }
        })
        if(check == 0){
            let obj = {id:question.id,question:question.title,answer:val};
            ans.push(obj);
        }
        this.setState({
            answers:ans
        })
    }
    where_parking(e){
        this.setState({
            where_parking:e.target.value
        })
    }
    no_parking(e){
        this.setState({
            no_parking:e.target.value
        })
    }
    is_free_parking(e){
        this.setState({
            is_free_parking: this.state.is_free_parking == 'Yes' ? 'No' : 'Yes'
        })
    }
    not_at_home(e){
        this.setState({
            not_at_home:e.target.value
        })
    }
    is_parking_available(e){
        this.setState({
            is_parking_available: this.state.is_parking_available == 'Yes' ? 'No' : 'Yes'
        })
    }
    will_at_home(e){
        this.setState({
            will_at_home: this.state.will_at_home == 'Yes' ? 'No' : 'Yes'
        })
    }
    resident_type(e){
        this.setState({
            resident_type:e.target.value
        })
    }
    levels(e){
        this.setState({
            levels:e.target.value
        })
    }
    add_extras_quantity(index){
        let temp = this.state.extras;
        temp[index].quantity =   temp[index].quantity +1;
        this.setState({
            extras:temp
        })
    }
    minus_extras_quantity(index){
        let temp = this.state.extras;
        if(temp[index].quantity > 0){
            temp[index].quantity =   temp[index].quantity - 1;
            this.setState({
                extras:temp
            })
        }
    }
    prem_vendor_enterance(e){
        this.setState({
            prem_vendor_enterance:e.target.value
        })
       
    }
    
    render() {
        const {loading} = this.state;
        return (
            <div className="services-page">
                <div id="headingTwo">
                </div>
                {/* {
                    this.state.loading ?
                        <div id="displayspinner text-center mt-5" style={{ display: 'block', }}>
                            <div className="spinner-border  ml-2 text-dark spinner_format" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        : */}
                        <div id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div className>
                                {
                                    this.state.category.residential_type  == 1 ?
                                    <div id="Residential Information">
                                    <h3>Home Information</h3>
                                    <p>Tell us about your home</p>
                                    <div class="row">

                                        <div className="col-md-6">
                                            <select onChange={this.resident_type.bind(this)} value={this.state.resident_type} className="form-control">
                                                <option value="House">House</option>
                                                <option value="Apartment">Apartment</option>
                                            </select>
                                            <label className="muted">(Choose an apartment or house)</label>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main">
                                                <button onClick={this.minus_levels.bind(this)} className="down_count btn btn-info btn_plus_minus" title="Down"><i className="icon-minus" /></button>
                                                <input onChange={this.levels.bind(this)} className="counter" type="text" placeholder="value..." value={this.state.levels} />
                                                <button onClick={this.add_levels.bind(this)} className="up_count btn btn-info btn_plus_minus" title="Up"><i className="icon-plus" /></button>
                                            </div>
                                            <label className="muted">(No. of Levels)</label>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div className="col-md-6">
                                            <div className="main">
                                                <button onClick={this.minus_bedroom.bind(this)} className="down_count btn btn-info btn_plus_minus" title="Down"><i className="icon-minus" /></button>
                                                <input className="counter" type="text" placeholder="value..." value={this.state.bedrooms} />
                                                <button onClick={this.add_bedroom.bind(this)} className="up_count btn btn-info btn_plus_minus" title="Up"><i className="icon-plus" /></button>
                                            </div>
                                            <label className="muted">(Bedrooms)</label>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main">
                                                <button onClick={this.minus_bathroom.bind(this)} className="down_count btn btn-info btn_plus_minus" title="Down"><i className="icon-minus" /></button>
                                                <input className="counter" type="text" placeholder="value..." value={this.state.bathrooms} />
                                                <button onClick={this.add_bathroom.bind(this)} className="up_count btn btn-info btn_plus_minus" title="Up"><i className="icon-plus" /></button>
                                            </div>
                                            <label className="muted">(Bathrooms)</label>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                <h3>Answer The required question's for the chosen service</h3>

                                    <div className="row">
                                    {/* <p>Tell us about your home</p> */}
                                        {
                                            this.state.questions.map((data,index)=>{
                                                return(
                                                  
                                                        <div className="col-md-12">
                                                            <h3>Q{index+1}:  {data.title}</h3>
                                                            <div className="input-group">
                                                                <input onChange={(e)=>{this.onChangeTextAnswer(e.target.value,data)}} className="input--style-1 col-md-12" type="text" placeholder="Answer here" name="name" />
                                                            </div>
                                                        </div>
                                                 
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                }
                                
                                <div className="divider-line" />
                                <div >
                                   
                                 
                                    <h3> Is parking available?</h3>
                                    <div className="d-flex">
                                    <input onChange={this.is_parking_available.bind(this)} checked={this.state.is_parking_available == 'Yes'} type="radio" className="radio_btn" id="yes_" name="parking_available"></input>
                                    <label for="yes_">Yes</label>
                                    <input onChange={this.is_parking_available.bind(this)} checked={this.state.is_parking_available == 'No'} type="radio" className="radio_btn" id="no_" name="parking_available"></input>
                                    <label for="no_">No</label>  
                                   
                                    </div>
                                   
                                    </div>
                                    {
                                        this.state.is_parking_available == 'Yes' ?
                                        <>
                                        <div className="col-md-12">
                                        <p>Please enter where </p>
                                        <div className="input-group">
                                            <input onChange={this.where_parking.bind(this)}  className="input--style-1"  type="text" placeholder="text here" name="name" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                    <p>Is parking free ?</p>
                                    <div className="d-flex">
                                    <input onChange={this.is_free_parking.bind(this)} checked={this.state.is_free_parking == 'Yes'} type="radio" className="radio_btn" id="yes_1" name="parking_available1"></input>
                                    <label for="yes_1">Yes</label>
                                    <input onChange={this.is_free_parking.bind(this)} checked={this.state.is_free_parking == 'No'} type="radio" className="radio_btn" id="no_1" name="parking_available1"></input>
                                    <label for="no_1">No</label>  
                                   
                                    </div>
                                    </div>
                                    </>
                                    :null
                                    }
                                   
                                   
                                   
                                </div>
                                <div >
                                    <h3>Will you be at home (YES/NO)?</h3>
                                    <br></br>
                                    <div className="d-flex">
                                    <input onChange={this.will_at_home.bind(this)} checked={this.state.will_at_home == 'Yes'} type="radio" className="radio_btn" id="yes_2" name="parking_available2"></input>
                                    <label for="yes_2">Yes</label>
                                    <input onChange={this.will_at_home.bind(this)} checked={this.state.will_at_home == 'No'} type="radio" className="radio_btn" id="no_2" name="parking_available2"></input>
                                    <label for="no_2">No</label>  
                                   
                                    </div>

                                    {
                                        this.state.will_at_home == 'Yes' ?
                                        null
                                    :  <div className="col-md-12">
                                        <p> Please Enter how the vendor can enter the premises</p>
                                        <div className="input-group">
                                            <input onChange={this.prem_vendor_enterance.bind(this)} className="input--style-1" type="text" placeholder="text here" name="name" />
                                        </div>
                                    </div>
                                    }
                                   
                                </div>
                              
                                {
                                    this.state.extras.length > 0 ?
                                  
                               
                
                               <div >
                               <div className="divider-line" />
                               <h3>Extras</h3>
                               {
                                   this.state.extras.map((data,index)=>{
                                       return(
                                           <div key={index} className="card p-2 mt-2">
                                               <div className="row ">
                                                   <div className="col-md-4">
                                                   <p> {data.title}</p>
                                                   </div>
                                                   <div className="col-md-4">
                                                   <p> $ {data.price}</p>
                                                   </div>
                                                   <div className="col-md-4">
                                                       <div className="main">
                                                           <button onClick={this.minus_extras_quantity.bind(this,index)} className="down_count btn btn-info btn_plus_minus" title="Down"><i className="icon-minus" /></button>
                                                           <input  className="counter" type="text" placeholder="value..." value={data.quantity} />
                                                           <button onClick={this.add_extras_quantity.bind(this,index)} className="up_count btn btn-info btn_plus_minus" title="Up"><i className="icon-plus" /></button>
                                                       </div>
                                                       {/* <label className="muted">(No. of Levels)</label> */}
                                                   </div>
                                               </div>
                                           </div>
                                       )
                                   })
                               }
                                  
                               </div>
                               : null
                                }
                              
                                
                                {
                                    this.state.error_string != '' ?
                                    <p className="text-center text-danger">{this.state.error_string}</p>
                                    :null
                                }
                                <div className="divider-line" />
                               
                                    <div>
                                        <div>
                 <div className="col-sm-12">
                            <div className="form-group">
                              <label className="control-label">Enter your Address</label>
                              <ReactGoogleAutocomplete
                                apiKey={MAP_PLACES_API_KEY}
                                options={{ types: 'sublocality' ,
                                componentRestrictions: { country: "au" },
                                }}
                                onPlaceSelected={(place) => {
                                    this.places(place);
                                }}
                                style={{ width: '100%' }}
                                className="form-control input_box"
                              />
                             <div className="divider-line" />
                                {/* <div className="row">
                                    <div className="col-md-3">
                                        <button onClick={this.back.bind(this, 1)} className="p-t-20 btn btn-info btn--radius btn--green" type="submit" id="#collapseTwo">Back</button>
                                    </div>

                                    <div className="col-md-6" />
                                    <div className="col-md-3">
                                        <button onClick={this.submit_location.bind(this, 3)} 
                                         disabled={loading} className="p-t-20 btn btn-success btn--radius btn--green" type="submit" id="#collapseTwo">
                                        { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                       { loading && <span > loading</span>}
                                           { !loading && <span > Next</span>}
                                                </button>
                                    </div>
                                </div> */}
                            </div>
                          </div>
            </div>
            </div>
                                
                                {/* <div className="divider-line" /> */}
                                <div className="row">
                                    <div className="col-md-3">
                                        <button onClick={this.Submit.bind(this, 1)}  className="p-t-20 btn btn-info btn--radius btn--green" type="submit" id="#collapseTwo">
                                       
                                          Back  </button>
                                    </div>

                                    <div className="col-md-6" />
                                    <div className="col-md-3">
                                        <button 
                                         onClick={this.Submit.bind(this, 4)} 
                                         className="p-t-20 btn btn-success btn--radius btn--green" disabled={loading} type="submit" id="#collapseTwo">
                                         { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                                   { loading && <span >Loading...</span>}
                                                   { !loading && <span >Next</span>}
                               
                                </button>
                                    </div>
                                </div>
                            </div>
                       
                {/* } */}

            </div>
        );
    }
}
const mapDistpatchToProps = (dispatch) => {
    return {

        change_step: (step) => {
            dispatch({ type: 'CHANGE_BOOKING_STEP', payload: step })
        },
        ADD_INFORMATION: (data) => { dispatch({ type: 'ADD_INFORMATION', payload: data })
    
    },
    changeLocation:(data)=>{dispatch({type:'CHANGE_CUSTOMER_LOCATION',payload:data})}

        
    }
    
}
const mapStateToProps = (state) => {
    return {
        select_service_state: state.select_service_state
    }
}

export default connect(mapStateToProps, mapDistpatchToProps)(AddInformation);
