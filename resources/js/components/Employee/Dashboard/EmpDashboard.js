import React, { Component } from 'react';
 
class EmpDashBoard extends Component {
    render() { 
        return (
            <section class="section">
                <div class="row ">
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="card">
                    <div class="card-statistic-4">
                        <div class="align-items-center justify-content-between">
                        <div class="row ">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="col-sm-12">
                                   <h2>100</h2>
                                   <h4 >New Booking</h4>
                                    <div className="col-sm-12">
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div class="banner-img">
                                <img src="/vendor-assets/img/banner/1.png" alt />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="card">
                    <div class="card-statistic-4">
                        <div class="align-items-center justify-content-between">
                        <div class="row ">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="col-sm-12">
                                   <h2 >100</h2>
                                   <h4 >Customers</h4>
                                    <div className="col-sm-12">
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div class="banner-img">
                                <img src="/vendor-assets/img/banner/2.png" alt />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="card">
                    <div class="card-statistic-4">
                        <div class="align-items-center justify-content-between">
                        <div class="row ">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="col-sm-12">
                                   <h2>$1000</h2>
                                   <h4>Wallet</h4>
                                    <div className="col-sm-12">
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div class="banner-img">
                                <img src="/vendor-assets/img/banner/3.png" alt />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="card">
                    <div class="card-statistic-4">
                        <div class="align-items-center justify-content-between">
                        <div class="row ">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="col-sm-12">
                                   <h2>$4689</h2>
                                   <h4>Revenue</h4>
                                    <div className="col-sm-12">
                                </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div class="banner-img">
                                <img src="/vendor-assets/img/banner/4.png" alt />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="row">
                <div class="col-12 col-sm-12 col-lg-12">
                    <div class="card ">
                    <div class="card-header">
                        <h4>Revenue chart</h4>
                        <div class="card-header-action">
                        <div class="dropdown">
                            <a href="#" data-toggle="dropdown" class="btn btn-warning dropdown-toggle">Options</a>
                            <div class="dropdown-menu">
                            <a href="#" class="dropdown-item has-icon"><i class="fas fa-eye" /> View</a>
                            <a href="#" class="dropdown-item has-icon"><i class="far fa-edit" /> Edit</a>
                            <div class="dropdown-divider" />
                            <a href="#" class="dropdown-item has-icon text-danger"><i class="far fa-trash-alt" />
                                Delete</a>
                            </div>
                        </div>
                        <a href="#" class="btn btn-primary">View All</a>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                </section>
        );
    }
}
 
export default EmpDashBoard;