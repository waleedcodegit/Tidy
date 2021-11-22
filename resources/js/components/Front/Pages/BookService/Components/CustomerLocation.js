import React, { Component } from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import { MAP_PLACES_API_KEY } from '../../../../Configs/Api';

class CustomerLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat:0,
            long:0,
            place:'',
            loc_address:'',
            loading: false,
        };
    }
     
    
    submit_location(){
        if(this.state.loc_address != ''){
            this.props.changeLocation(this.state);
            this.props.change_step(4); 
            toast.success('Success');
        }else{
            toast.error('Please Enter You Location');
        }
    }
    back(){
        this.props.change_step(2);
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
    render() {
        const {loading} = this.state;
        return (
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
                                <div className="row">
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
                                </div>
                            </div>
                          </div>
            </div>
        );
    }
}
const mapDistpatchToProps = (dispatch) => {
    return{
        changeLocation:(data)=>{dispatch({type:'CHANGE_CUSTOMER_LOCATION',payload:data})},
        change_step: (step) => {
            dispatch({ type: 'CHANGE_BOOKING_STEP', payload: step })
        },
    }
}
export default connect(null,mapDistpatchToProps)(CustomerLocation);