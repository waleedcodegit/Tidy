import React, { Component } from 'react';
import Header from '../Navigation/header';
import Sidebar from '../Navigation/Sidebar';

import {Route, BrowserRouter} from 'react-router-dom';
// Service
import ServiceCreate from '../ServicePricing/create';
import ServiceList from '../ServicePricing/List';
import ServiceEdit from '../ServicePricing/edit';

// Service Extra
import ServiceExtraCreate from '../ServiceExtra/create';
import ServiceExtraList from '../ServiceExtra/list';
import ServiceExtraEdit from '../ServiceExtra/edit';
// States
import StateCreate from '../State/create';
import StateEdit from '../State/edit';
import StateList from '../State/list';

// City
import CityCreate from '../City/create';
import CityEdit from '../City/edit';
import CityList from '../City/list';

// Category
import CategoryCreate from '../Category/create';
import CategoryEdit from '../Category/edit';
import CategoryList from '../Category/index';
// SubCategory
import SubCategoryCreate from '../SubCategory/create';
import SubCategoryEdit from '../SubCategory/edit';
import SubCategoryList from '../SubCategory/index';
// Customer
import CustomerList from '../Customers/list';
import CreateCustomer from '../Customers/create';
// Vendor
import VendorsList from '../Vendors/list';
import VendorInfo from '../Vendors/show';
import CreateVendor from '../Vendors/create';
// Setting
import SettingList from '../Settings/index';

import HolidayCreate from '../Holidays/create';
import HolidayEdit from '../Holidays/edit';
import HolidayList from '../Holidays/index';

import CreateQuestion from '../Questions/create';
import EditQuestion from '../Questions/edit';
import ListQuestion from '../Questions/index';

import Faqpage from '../Faqs/FaqsPage';
import AddFaq from '../Faqs/AddFaqs';
import EditFaq from '../Faqs/edit';
import GiftCardsList from '../GiftCards/GiftcardsList';
import Create from '../ManageServiceContent/create';
import Edit from '../ManageServiceContent/edit';
import ManageServiceContent from '../ManageServiceContent/ManageServiceContent';

// Emails
import CreateEmails from '../Emails/create';
import EditEmails from '../Emails/edit';
import ListEmails from '../Emails/list';

import VendorMessages from '../Messages/VendorMessages';
import CustomerMessages from '../Messages/CustomerMessages';


import EditPage from '../ManagePages/Edit';
import AddPage from '../ManagePages/create';
import ManagePages from '../ManagePages/ManagePagesContent';


class Main extends Component {
    render() {
        return (
            <div id="container" className="effect aside-float aside-bright mainnav-lg">
                <Header></Header>
                <div className="boxed">
                    <div id="content-container">
                        {/*Service Pricing*/}
                        <Route path="/admin/create-service" component={ServiceCreate}></Route>
                        <Route path="/admin/edit-service/:id" component={ServiceEdit}></Route>
                        <Route path="/admin/list-service" component={ServiceList}></Route>
                        {/*Service Extra*/}
                        <Route path="/admin/create-service-extra" component={ServiceExtraCreate}></Route>
                        <Route path="/admin/edit-service-extra/:id" component={ServiceExtraEdit}></Route>
                        <Route path="/admin/list-service-extra" component={ServiceExtraList}></Route>

                        {/*State*/}
                        <Route path="/admin/create-state" component={StateCreate}></Route>
                        <Route path="/admin/edit-state/:id" component={StateEdit}></Route>
                        <Route path="/admin/list-state" component={StateList}></Route>

                        {/*City*/}
                        <Route path="/admin/create-city" component={CityCreate}></Route>
                        <Route path="/admin/edit-city/:id" component={CityEdit}></Route>
                        <Route path="/admin/list-city" component={CityList}></Route>

                        {/*Category*/}
                        <Route path="/admin/create-category" component={CategoryCreate}></Route>
                        <Route path="/admin/edit-category/:id" component={CategoryEdit}></Route>
                        <Route path="/admin/list-category" component={CategoryList}></Route>

                        {/*SubCategory*/}
                        <Route path="/admin/create-subcategory" component={SubCategoryCreate}></Route>
                        <Route path="/admin/edit-subcategory/:id" component={SubCategoryEdit}></Route>
                        <Route path="/admin/list-subcategory" component={SubCategoryList}></Route>

                        {/*Public Holidays*/}
                        <Route path="/admin/create-holiday" component={HolidayCreate}></Route>
                        <Route path="/admin/edit-holiday/:id" component={HolidayEdit}></Route>
                        <Route path="/admin/list-holidays" component={HolidayList}></Route>

                        {/*Question */}
                        <Route path="/admin/create-question" component={CreateQuestion}></Route>
                        <Route path="/admin/edit-question/:id" component={EditQuestion}></Route>
                        <Route path="/admin/list-question" component={ListQuestion}></Route>

                        <Route path="/admin/customer-list" component={CustomerList}></Route>
                        <Route path="/admin/create-customer" component={CreateCustomer}></Route>

                        <Route path="/admin/vendor-list" component={VendorsList}></Route>
                        <Route path="/admin/vendor-info/:id" component={VendorInfo}></Route>
                        <Route path="/admin/create-vendor" component={CreateVendor}></Route>

                        <Route path="/admin/setting-list" component={SettingList}></Route>\


                        <Route path="/admin/add-faq" component={AddFaq}></Route>
                        <Route path="/admin/edit-faq/:id" component={EditFaq}></Route>
                        <Route path="/admin/faqs" component={Faqpage}></Route>
                        
                        <Route path="/admin/gift-cards" component={GiftCardsList}></Route>

                        <Route path="/admin/create-service-content" component={Create}></Route>
                        <Route path="/admin/edit-service-content/:id" component={Edit}></Route>
                        <Route path="/admin/manage-services-content" component={ManageServiceContent}></Route>


                        <Route path="/admin/create-emails" component={CreateEmails}></Route>
                        <Route path="/admin/edit-email/:id" component={EditEmails}></Route>
                        <Route path="/admin/emails" component={ListEmails}></Route>


                        <Route path="/admin/vendor-messages" component={VendorMessages}></Route>

                        <Route path="/admin/customer-messages" component={CustomerMessages}></Route>

                        <Route path="/admin/create-page" component={AddPage}></Route>
                        <Route path="/admin/manage-pages" component={ManagePages}></Route>
                        <Route path="/admin/edit-page/:id" component={EditPage}></Route>

                    </div>
                    <Sidebar></Sidebar>
                </div>
            </div>
        );
    }
}

export default Main;