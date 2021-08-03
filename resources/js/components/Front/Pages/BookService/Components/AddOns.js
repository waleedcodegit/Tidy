import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddOns extends Component {
    Submit(val,e){
        e.preventDefault();
        this.props.select_service(this.state);
        this.props.change_step(val);
    }
    render() {
        return (
            <div className="services-page">
            <div id="headingThree">
            </div>
            <div id="collapseThree" className="" aria-labelledby="headingThree" data-parent="#accordionExample">
              <div className>
                <div className="divider-line" />
                <div className="row">
                  <h3>Do you have a GIFT card or Discount code</h3>
                  <div className="col-md-12">
                    <p>If yes, please enter </p>
                    <div className="input-group">
                      <input className="input--style-1" type="text" placeholder="discount code" name="name" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <h3>Add Extra's</h3>
                  <div className="col-md-12">
                    <div className="input-group">
                      <input className="input--style-1" type="text" placeholder="location" name="name" />
                    </div>
                  </div>
                </div>
                <div className="divider-line" />
                    <div className="row">
                    <div className="col-md-3">
                        <button onClick={this.Submit.bind(this,2)} className="p-t-20 btn btn-info btn--radius btn--green" type="submit" id="#collapseTwo">Back</button>
                    </div>
                    
                    <div className="col-md-6" />
                    <div className="col-md-3">
                        <button onClick={this.Submit.bind(this,4)} className="p-t-20 btn btn-success btn--radius btn--green" type="submit" id="#collapseTwo">Next</button>
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
        change_step:(step)=>{
            dispatch({type:'CHANGE_BOOKING_STEP',payload:step})
        },
        select_service:(data)=>{dispatch({type:'CHANGE_SELECT_SERVICE',payload:data})}
    }
}
export default connect(null,mapDistpatchToProps)(AddOns);
