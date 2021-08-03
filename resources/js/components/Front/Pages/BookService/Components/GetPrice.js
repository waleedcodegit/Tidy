import Axios from 'axios';
import React, { Component } from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { connect } from 'react-redux';
import { MAP_PLACES_API_KEY } from '../../../../Configs/Api';
import CustomerSignUp from '../../../Auth/ComponentAuths.js/CustomerSignUp';
import Login from '../../../Auth/ComponentAuths.js/Login';
import CustomerCardIntegration from './CustomerCardIntegration';

class GetPrice extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data:[]
      };
      console.log(this.props)
    }
     
    Submit(val,e){
        e.preventDefault();
        this.props.select_service(this.state);
        this.props.change_step(val);
    }
    componentDidMount(){
      let payload = {
        screen1:this.props.select_service_state,
        screen2:this.props.add_information,
      }
      Axios.post('/api/get_service_totals',payload).then(res=>{
        console.log(res)
      })
    }
    componentDidUpdate(){
      console.log(this.props)
    }
    function1(){
      let payload = {
        screen1:this.props.select_service_state,
        screen2:this.props.add_information,
      }
      Axios.post('/api/get_service_totals',payload).then(res=>{
        console.log(res)
      })
    }
    render() {
        return (
            <div className>
            <div id="headingFour">
            </div>
            {
              this.props.user.is_login ? 
              <>
              {
                this.props.user.data.stripe_id  ?

              <>
              {/* <div id="collapseFour" className="" aria-labelledby="headingFour" data-parent="#accordionExample">
            <div className="card p-3 shadow_card col-md-8 ml-auto mr-auto" >
              <div className="d-flex" style={{justifyContent:'space-between'}}>
                <h2>Service</h2>
                <h2>3</h2>
              </div>
              <hr></hr>
              <div className="d-flex" style={{justifyContent:'space-between'}}>
                <h2>Service</h2>
                <h2>3</h2>
              </div>
              <hr></hr>
              <div className="d-flex" style={{justifyContent:'space-between'}}>
                <h2>Service</h2>
                <h2>3</h2>
              </div>
            </div>




            <button className="btn btn-info" onClick={this.function1.bind(this)}>Click</button>
            </div> */}
            <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label className="control-label">Enter your Address</label>
                                                            <ReactGoogleAutocomplete
                                                                apiKey={MAP_PLACES_API_KEY}
                                                                options={{types:'sublocality'}}
                                                                onPlaceSelected={(place) => {
                                                                    
                                                                }}
                                                                style={{ width: '100%' }}
                                                                className="form-control input_box"
                                                            />
                                                        </div>
                                                        </div>
            </>
              :
              <CustomerCardIntegration></CustomerCardIntegration>
            
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
            
          </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        change_step:(step)=>{
            dispatch({type:'CHANGE_BOOKING_STEP',payload:step})
        },
        select_service:(data)=>{dispatch({type:'CHANGE_SELECT_SERVICE',payload:data})},

    }
}
const mapStateToProps = (state) =>{
  return{
    select_service_state:state.select_service_state,
    add_information:state.add_information,
    user:state.user,
    auth_type:state.auth_type
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(GetPrice);
