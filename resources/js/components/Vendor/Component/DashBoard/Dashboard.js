import React, { Component } from 'react';
 
class DashBoard extends Component {
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
                            <div class="card-content">
                                <h5 class="font-15">New Booking</h5>
                                <h2 class="mb-3 font-18">258</h2>
                                <p class="mb-0"><span class="col-green">10%</span> Increase</p>
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
                            <div class="card-content">
                                <h5 class="font-15"> Customers</h5>
                                <h2 class="mb-3 font-18">1,287</h2>
                                <p class="mb-0"><span class="col-orange">09%</span> Decrease</p>
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
                            <div class="card-content">
                                <h5 class="font-15">Wallet</h5>
                                <h2 class="mb-3 font-18">128</h2>
                                <p class="mb-0"><span class="col-green">18%</span>
                                Increase</p>
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
                            <div class="card-content">
                                <h5 class="font-15">Revenue</h5>
                                <h2 class="mb-3 font-18">$48,697</h2>
                                <p class="mb-0"><span class="col-green">42%</span> Increase</p>
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
 
export default DashBoard;