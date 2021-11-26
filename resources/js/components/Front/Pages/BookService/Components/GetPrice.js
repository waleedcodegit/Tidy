import Axios from 'axios';
import React, { Component } from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import { MAP_PLACES_API_KEY } from '../../../../Configs/Api';
import CustomerSignUp from '../../../Auth/ComponentAuths.js/CustomerSignUp';
import Login from '../../../Auth/ComponentAuths.js/Login';
import CustomerCardIntegration from './CustomerCardIntegration';
import CustomerLocation from './CustomerLocation';

class GetPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        service: {
          type: 'home'
        }
      },
      loading: false,
    };
    console.log(this.props)
  }

  Submit(val, e) {
    this.setState({ loading : true});
    e.preventDefault();
    this.props.select_service(this.state);
    this.props.change_step(val);
  }
  componentDidMount() {
    let payload = {
      screen1: this.props.select_service_state,
      screen2: this.props.add_information,
    }
    Axios.post('/api/get_service_totals', payload).then(res => {
      console.log(res)
      this.setState({
        data: res.data,
        loading:false
      })
    })
  }
  componentDidUpdate() {
    console.log(this.props)
  }
  function1() {
    let payload = {
      screen1: this.props.select_service_state,
      screen2: this.props.add_information,
    }
    Axios.post('/api/get_service_totals', payload).then(res => {
      console.log(res)
    })
  }
  make_booking(){
    this.setState({ loading : true});
    let payload = {
      select_service_state: this.props.select_service_state,
      screen2: this.props.add_information,
      customer_location: this.props.customer_location,
      screen4:this.state,
      customer:this.props.user
    }
    Axios.post('/api/make_booking',payload).then(res=>{
      
      if(res.data.status == 200){
        
        toast.success('Booking Created Successfully');
        this.props.history.push('/profile');
      }
    }).catch((e)=>{
      toast.error('Error - unable to create booking. please try again' + e);

    })
    setTimeout(() => {
      this.setState({ loading : false});
    }, 4000);
  }
  render() {
    const {loading}=this.state;
    return (
      <div className>
        <div id="headingFour">
          {/* {
            this.state.loading ?

              <div id="displayspinner text-center mt-5" style={{ display: 'block', position:'center' }}>
                <div className="spinner-border  ml-2 text-dark spinner_format" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              :

              <> */}

                {
                  this.props.user.is_login ?
                    <>

                      {

                        this.state.data.service.residential_type == 1 ?
                          <>
                            {
                              this.props.user.data.stripe_id ?

                                <>

                                  <div className="row">
                                  <div className="col-md-12 ">
                                  <h1 className="text-center mb-3">Check Out</h1>
                                  </div>
                                  <hr></hr>
                                    <h1 className="col-md-2"></h1>
                                    <div className="card col-md-8 checkout_text">
                                        {/* <h2 className="mb-4">Service Details</h2> */}
                                        <h4>
                                          Service 

                                          <span className="float-right span_text" >
                                            {this.state.data.service.name}
                                          </span>

                                        </h4>
                                        <hr></hr>
                                        <h4>
                                          Service Type

                                          <span className="float-right span_text" >
                                            {this.props.select_service_state.recurring == 1 ? 'One Time' : 'Recurring'}
                                          </span>

                                        </h4>
                                        <hr></hr>
                                        <h4>
                                          Resident 

                                          <span className="float-right span_text" >
                                            {this.props.add_information.resident_type}
                                          </span>

                                        </h4>
                                        <hr></hr>
                                        <h4>
                                          Levels 

                                          <span className="float-right span_text" >
                                            {this.props.add_information.levels}
                                          </span>

                                        </h4>
                                        <hr></hr>
                                        <h4>
                                          Bedrooms 

                                          <span className="float-right span_text" >
                                            {this.props.add_information.bedrooms}
                                          </span>

                                        </h4>
                                        <hr></hr>
                                        <h4>
                                          Bathrooms 

                                          <span className="float-right span_text" >
                                            {this.props.add_information.bathrooms}
                                          </span>

                                        </h4>
                                        <hr></hr>
                                      
                                        <h4>
                                          Price 

                                          <span className="float-right span_text" >
                                           ${this.state.data.sub_service.price}
                                          </span>
                                        </h4>
                                        <hr></hr>
                                      
                                       
                                        <h4>
                                         Service Extra's 

                                          <span className="float-right span_text" >
                                           ${
                                          this.state.data.extra_total
                                        }
                                          </span>
                                        </h4>
                                        <hr></hr>
                                    
                              
                                       
                                        <h4>
                                          Location 

                                          <span className="float-right span_text" >
                                           {
                                          this.props.customer_location.loc_address
                                        }
                                          </span>
                                        </h4>
                                        <hr></hr>
                                      
                                       
                                        <h4>
                                          Total 

                                          <span className="float-right span_text" >
                                           ${
                                          this.state.data.total
                                           }
                                          </span>
                                        </h4>
                                        <button onClick={this.make_booking.bind(this)} className="btn btn_full btn-info">Book Now</button>
                                    </div> 
                                  </div>

                                </>
                                :
                                <CustomerCardIntegration></CustomerCardIntegration>

                            }
                          </>

                          :
                          <>
                          <div className="row">
                          
                          <h1 className="col-md-2"></h1>
                          <div className="col-sm-8">
                          <h4>
                                          Service 

                                          <span className="float-right span_text" >
                                            {this.state.data.service.name}
                                          </span>

                                        </h4>
                                        <hr></hr>
                                        <h4>
                                          Service Type

                                          <span className="float-right span_text" >
                                            {this.props.select_service_state.recurring == 1 ? 'One Time' : 'Recurring'}
                                          </span>

                                        </h4>
                                        <hr></hr>
                                        <h4>
                                         Service Extra's 

                                          <span className="float-right span_text" >
                                           ${
                                          this.state.data.extra_total
                                        }
                                          </span>
                                        </h4>
                                        <hr></hr>
                                    
                              
                                       
                                        <h4>
                                          Location 

                                          <span className="float-right span_text" >
                                           {
                                          this.props.customer_location.loc_address
                                        }
                                          </span>
                                        </h4>
                                        <hr></hr>
                                        
                                
                                <button onClick={this.make_booking.bind(this)} disabled={loading} className="btn btn-info btn_full">
                                { loading && <i className= 'fa fa-refresh fa-spain'></i>}
                                { loading && <span >Loading...</span>}
                                { !loading && <span > Get Quotes</span>}
                                </button>
                              
                            </div>
                          </div>
                            
                          </>
                      }





                    </>
                    :
                    <div className="card p-3 shadow_card col-md-8 ml-auto mr-auto" >
                      {
                        this.props.auth_type == 'login' ?
                          <Login></Login>
                          :
                          <CustomerSignUp></CustomerSignUp>
                      }
                    </div>
                }
               {/* </> */}
          {/* } */}
         </div>
      // </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    change_step: (step) => {
      dispatch({ type: 'CHANGE_BOOKING_STEP', payload: step })
    },
    select_service: (data) => { dispatch({ type: 'CHANGE_SELECT_SERVICE', payload: data }) },

  }
}
const mapStateToProps = (state) => {
  return {
    select_service_state: state.select_service_state,
    add_information: state.add_information,
    user: state.user,
    auth_type: state.auth_type,
    customer_location:state.customer_location
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GetPrice);
