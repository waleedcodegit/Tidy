import React, { Component } from 'react';
 
class EmpDashBoard extends Component {
    render() { 
        return (
            <section className="section">
                <div className="row ">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-statistic-4">
                        <div className="align-items-center justify-content-between">
                        <div className="row ">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="card-content">
                                <h5 className="font-15">New Booking</h5>
                                <h2 className="mb-3 font-18">258</h2>
                                <p className="mb-0"><span className="col-green">10%</span> Increase</p>
                            </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                                <img src="/vendor-assets/img/banner/1.png"/>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-statistic-4">
                        <div className="align-items-center justify-content-between">
                        <div className="row ">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="card-content">
                                <h5 className="font-15"> Customers</h5>
                                <h2 className="mb-3 font-18">1,287</h2>
                                <p className="mb-0"><span className="col-orange">09%</span> Decrease</p>
                            </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                                <img src="/vendor-assets/img/banner/2.png"/>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-statistic-4">
                        <div className="align-items-center justify-content-between">
                        <div className="row ">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="card-content">
                                <h5 className="font-15">Wallet</h5>
                                <h2 className="mb-3 font-18">128</h2>
                                <p className="mb-0"><span className="col-green">18%</span>
                                Increase</p>
                            </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                                <img src="/vendor-assets/img/banner/3.png"/>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="card">
                    <div className="card-statistic-4">
                        <div className="align-items-center justify-content-between">
                        <div className="row ">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="card-content">
                                <h5 className="font-15">Revenue</h5>
                                <h2 className="mb-3 font-18">$48,697</h2>
                                <p className="mb-0"><span className="col-green">42%</span> Increase</p>
                            </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                                <img src="/vendor-assets/img/banner/4.png"/>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-12 col-sm-12 col-lg-12">
                    <div className="card ">
                    <div className="card-header">
                        <h4>Revenue chart</h4>
                        <div className="card-header-action">
                        <div className="dropdown">
                            <a href="#" data-toggle="dropdown" className="btn btn-warning dropdown-toggle">Options</a>
                            <div className="dropdown-menu">
                            <a href="#" className="dropdown-item has-icon"><i className="fas fa-eye" /> View</a>
                            <a href="#" className="dropdown-item has-icon"><i className="far fa-edit" /> Edit</a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item has-icon text-danger"><i className="far fa-trash-alt" />
                                Delete</a>
                            </div>
                        </div>
                        <a href="#" className="btn btn-primary">View All</a>
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