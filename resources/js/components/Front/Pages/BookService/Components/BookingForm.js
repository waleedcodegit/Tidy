import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddInformation from './AddInformation';
import AddOns from './AddOns';
import CustomerLocation from './CustomerLocation';
import GetPrice from './GetPrice';
import SelectServices from './SelectServices';
 
class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
   componentDidMount(){
     console.log(this.props.service_step);
   }
    render() { 
        return (
        <div className="card card-1">
  <div className="card-heading" />
  <div className="card-body">
    <div className="accordion" id="accordionExample">
      <div className="steps">
        <progress id="progress" value={0} max={100} />
        <div className="step-item">
          <button className="step-button text-center" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded={this.props.booking_step >= 1 ? "true" : "false"} aria-controls="collapseOne">
            <i className="fa fa-cogs" aria-hidden="true" />
          </button>
          <div className="step-title">
            Select Service
          </div>
        </div>
        <div className="step-item">
          <button className="step-button text-center " type="button" data-toggle="collapse" data-target="#collapseTwo"  aria-expanded={this.props.booking_step >= 2 ? "true" : "false"} aria-controls="collapseTwo">
            <i className="fa fa-info-circle" aria-hidden="true" />
          </button>
          <div className="step-title">
            Add Information
          </div>
        </div>
        <div className="step-item">
          <button className="step-button text-center collapsed" type="button" data-toggle="collapse" data-target="#collapseThree"  aria-expanded={this.props.booking_step >= 3 ? "true" : "false"} aria-controls="collapseThree">
            <i className="fas fa-map-marked-alt" aria-hidden="true" />
          </button>
          <div className="step-title">
            Add Location
          </div>
        </div>  
        <div className="step-item">
          <button className="step-button text-center collapsed" type="button" data-toggle="collapse" data-target="#collapseFour"  aria-expanded={this.props.booking_step >= 4 ? "true" : "false"} aria-controls="collapseThree">
          <i className="fas fa-money-check-alt" aria-hidden="true"></i>
          </button>
          <div className="step-title">
            Get Price / Quote
          </div>
        </div>
      </div>
      {
        this.props.booking_step == 1 ? 
        <SelectServices ></SelectServices>
        :null
      }
      {
        this.props.booking_step == 2 ? 
        <AddInformation ></AddInformation>
        :null
      }
      {
        this.props.booking_step == 3 ? 
        <CustomerLocation ></CustomerLocation>
        :null
      }
      
      {
        this.props.booking_step == 4 ?
        <GetPrice {...this.props}></GetPrice>
        :null
      } 
   
    </div>
  </div>
</div>

        );
    }
}
const mapStateToProps = (state) => {
  return{
    booking_step:state.booking_step
  }
}
export default connect(mapStateToProps)(BookingForm);