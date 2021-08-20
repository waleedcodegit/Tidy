import Axios from 'axios';
import React, { Component } from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
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
      loading: true
    };
    console.log(this.props)
  }

  Submit(val, e) {
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
  render() {
    return (
      <div className>
        <div id="headingFour">
          {
            this.state.loading ?

              <div id="displayspinner text-center mt-5" style={{ display: 'block', }}>
                <div className="spinner-border  ml-2 text-dark spinner_format" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              :

              <>

                {
                  this.props.user.is_login ?
                    <>

                      {

                        this.state.data.service.type == 'home' ?
                          <>
                            {
                              this.props.user.data.stripe_id ?

                                <>
                                  

                                </>
                                :
                                <CustomerCardIntegration></CustomerCardIntegration>

                            }
                          </>

                          :
                          <>
                            <div className="col-sm-12">
                              <div className="form-group text-center">
                                <h1>Get Quotes Now</h1>
                                <h6>You will get quotes </h6>
                                <button className="btn btn-success">Get Quotes</button>
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
              </>
          }
        </div>
      </div>
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
    auth_type: state.auth_type
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GetPrice);
