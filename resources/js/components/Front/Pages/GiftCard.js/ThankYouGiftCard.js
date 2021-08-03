import React, { Component } from 'react';

class ThankYouGiftCard extends Component {
    render() {
        return (
            <div className="page-wrapper bg-blue p-t-100 p-b-100 font-robo">
                <div className="wrapper wrapper--w680">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-1">
                                <div className="card-heading" />
                                <div className>
                                    <div className="gift-card-info thnky-msg text-center">
                                        <div className="gift-img2">
                                            <img src="/images/gift_card.jpg" />
                                        </div>
                                        <div className="info-sec">
                                            <h6>Thank you for Buying Gift Card</h6>
                                            <p>We will send you an E-mail confirmation</p>
                                            <p>Tidyhome gift card is being sent to: <span>{this.props.recipient_email}</span></p>
                                            <ul>
                                                {/*<li> The Gift Card will be send to the beneficiary e-mail(s) on successful receipt of your payment.</li>*/}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ThankYouGiftCard;