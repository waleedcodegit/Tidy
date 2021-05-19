import React, { Component } from 'react';
import {img_baseurl} from '../../Configs/Api';

class TopHeader extends Component {
    render() {
        return (
            <div className="top-header">
                <div className="container">
                    <div className="row">
                    <div class="col-lg-7 col-md-4"></div>
				 <div class="col-lg-5 col-md-8">
                            <div className=" header-right header-sec"> 
                                <a className="top-btn" href="#">Login</a>
                                <a className="menu-btn" href="#">Customer SignUp</a>
                                <a className="menu-btn" href="#">Business SignUp</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default TopHeader;
