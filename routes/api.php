<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// delete api///

Route::post('/delete-customer','Customer\AuthController@delete_customer');
Route::post('delete-city','Admin\CityController@delete_city');
Route::post('delete-subcategory','Admin\SubCategoryControllerr@delete_subcategory');
Route::post('delete-holiday','Admin\PublicHolidaysController@delete_holiday');
Route::post('delete-question', 'Admin\QuestionController@delete_question');
Route::post('delete-vendor','Vendor\VendorController@delete_vendor');
Route::post('delete-serviceextra','Admin\ServiceExtraController@delete_ServiceExtra');
Route::post('delete-state','Admin\StateController@delete_State');
Route::post('delete-giftcard','Admin\AdminController@delete_GiftCard');
Route::post('delete-subcategory','Admin\SubCategoryController@delete_SubCategory');
//
// Pages Controller
Route::post('add_page','Admin\PagesController@add_page');
Route::post('update_page','Admin\PagesController@update_page');
Route::post('get_page_by_id','Admin\PagesController@get_page_by_id');
Route::post('delete_page_by_id','Admin\PagesController@delete_page_by_id');
Route::post('get_pages','Admin\PagesController@get_pages');


Route::post('delete-subcategory','Admin\ServicesController@delete_SubCategory');

Route::post('delete-manageservice','Admin\ServicesController@delete_ManageService');

Route::post('/update_customer','Customer\AuthController@update_customer');

Route::middleware(['admin-login'])->group(function () {
    // Customer Route
    Route::get('/customer-list','Customer\AuthController@index');
    Route::post('/create-customer','Customer\AuthController@create_customer');
    Route::post('/edit-customer/{id}','Customer\AuthController@edit_customer');
    Route::post('/update-customer','Customer\AuthController@update_customer');
     


    // Vendor Route
    Route::get('/vendor-list','Vendor\VendorController@list');
    Route::post('/vendor-info/{id}','Vendor\VendorController@show');
    Route::post('/approved-vendor','Vendor\VendorController@approved_vendor');

    
    //employee
    Route::resource('employee', 'Vendor\EmployeeController');

    // Service Price Route
    Route::resource('service-price', 'Admin\ServicePricingController');
    // Service Extra Route
    Route::resource('service-extra', 'Admin\ServiceExtraController');
    // State
    Route::resource('state', 'Admin\StateController');

    // City
    Route::resource('city', 'Admin\CityController');
   
    
    
    // SubCategory Route
    Route::resource('subcategory', 'Admin\SubCategoryController');
    
    // Setting Route
    Route::resource('setting', 'Admin\SettingController');

    Route::resource('holiday', 'Admin\PublicHolidaysController');
    Route::resource('question', 'Admin\QuestionController');  
    
});
   // Category Route
Route::resource('category', 'Admin\CategoryController');

Route::post('update-setting', 'Admin\SettingController@update_setting');
Route::post('/customer-login','Customer\AuthController@customer_login');
Route::post('/customer_forget_password','Customer\AuthController@customer_forget_password');
Route::post('/user-password','Customer\AuthController@user_password');
Route::post('/customer_check_auth','Customer\AuthController@customer_check_auth');
Route::post('delete-category','Admin\CategoryController@delete_category');

// Admin COntroller
Route::get('/test','Admin\AdminController@test');
Route::post('/create-admin','Admin\AdminController@create_admin');
Route::post('/login-admin','Admin\AdminController@login_admin');
Route::post('/check-auth-admin','Admin\AdminController@admin_check_auth');
Route::post('/get_gift_cards','Admin\AdminController@get_gift_cards');



Route::post('/create-vendor','Vendor\VendorController@create_vendor');
Route::post('/vendor-login','Vendor\VendorController@vendor_login');
Route::post('/getcategory','Frontend\CategoryController@getcategory');
Route::post('/getallcategory','Frontend\CategoryController@getallcategory');
Route::post('/validate_gift_card_details','Frontend\FrontController@validate_gift_card_details');
Route::post('/order_gift_card','Frontend\FrontController@order_gift_card');


// Services Controller
Route::post('/create_services_content','Admin\ServicesController@create_services_content');
Route::post('/update_services_content','Admin\ServicesController@update_services_content');
Route::post('/get_all_service_content','Admin\ServicesController@get_all_service_content');
Route::post('/get_service_content_by_id','Admin\ServicesController@get_service_content_by_id');
// Route::post('/delete_service_content','Admin\ServicesController@delete_service_content');





// Vendor Controller

Route::post('/get-services','Vendor\VendorController@get_services');
Route::post('/save_vendor_services','Vendor\VendorController@save_vendor_services');
Route::post('/vendor_insurance_certificate','Vendor\VendorController@vendor_insurance_certificate');
Route::post('/file_upload','Vendor\VendorController@file_upload');
Route::post('/validate_vendor','Vendor\VendorController@validate_vendor');
Route::post('/validate_card','Vendor\VendorController@validate_card');
Route::post('/submit_vendor_request','Vendor\VendorController@submit_vendor_request');
Route::post('/delete-vendor-selected-services/{id}','Vendor\VendorController@delete_vendor_selected_services');
Route::post('/add-vendor-service/{id}','Vendor\VendorController@add_vendor_service');
Route::post('/vendor_check_auth','Vendor\VendorController@vendor_check_auth');
Route::post('/get-vendor-info/{id}','Vendor\VendorController@show');
Route::post('/get_vendor_services','Vendor\VendorController@get_vendor_services');
Route::post('/update_vendor_profile','Vendor\VendorController@update_vendor_profile');
Route::post('/delete_vendor_service','Vendor\VendorController@delete_vendor_service');
Route::post('/get_vendor_card_details','Vendor\VendorController@get_vendor_card_details');
Route::post('/update_vendor_card','Vendor\VendorController@update_vendor_card');
Route::post('/get_vendor_addresses','Vendor\VendorController@get_vendor_addresses');
Route::post('/update_vendor_address','Vendor\VendorController@update_vendor_address');
Route::post('/add_vendor_address','Vendor\VendorController@add_vendor_address');
Route::post('/delete_vendor_address','Vendor\VendorController@delete_vendor_address');



// Faq Controller

Route::post('add_faq', 'Admin\FaqController@add_faq');
Route::post('get_all_faqs', 'Admin\FaqController@get_all_faqs');
Route::get('faq-detail/{id}', 'Admin\FaqController@edit_faq');
Route::post('faq-update', 'Admin\FaqController@update_faq');
Route::post('delete-faq', 'Admin\FaqController@delete_faq');
Route::post('get_faqs_by_type', 'Admin\FaqController@get_faqs_by_type');

// Front Controller Routes

Route::post('/get_information_content','Frontend\FrontController@get_information_content');
Route::post('/validate_select_service','Frontend\FrontController@validate_select_service');
Route::post('/get_service_totals','Frontend\FrontController@get_service_totals');
Route::post('/update_customer_card','Frontend\FrontController@update_customer_card');
Route::post('/get_customer_card','Frontend\FrontController@get_customer_card');
Route::post('/image_upload','Frontend\FrontController@image_upload');
Route::post('/get_service_content_by_slug','Frontend\FrontController@get_service_content_by_slug');


//Emails Controller//
Route::resource('emails','Admin\EmailsController');
Route::post('create-emails','Admin\EmailsController@create_emails');
Route::get('/api/emails','Admin\EmailsController@Emails_List');
Route::post('/delete-email','Admin\EmailsController@delete_email');
Route::get('/edit-email/{id}','Admin\EmailsController@edit_email');

//SMS Controller//
Route::resource('sms','Admin\SmsController');
Route::post('create-sms','Admin\SmsController@create_sms');
Route::get('/api/sms','Admin\SmsController@Sms_List');
Route::post('/delete-sms','Admin\SmsController@delete_sms');
Route::get('/edit-sms/{id}','Admin\SmsController@edit_sms');

//HomeContent Controller

Route::resource('content' , 'Admin\HomeContentController');
Route::post('update-content' , 'Admin\HomeContentController@update_content');
Route::get('/edit-content' , 'Admin\HomeContentController@edit_content');

//Reviews Controller
Route::resource('review' , 'Admin\ReviewsController');
Route::post('create-review' , 'Admin\ReviewsController@create_review');
Route::get('/api/review' , 'Admin\ReviewsController@list_reviews');
Route::post('/delete-review' , 'Admin\ReviewsController@delete_review');
Route::get('/edit-review/{id}','Admin\ReviewsController@edit_review');


// Common Controller
Route::post('/pusher_auth/{id}','Common\CommonController@pusher_auth');
Route::post('/vendor_message_sender','Common\CommonController@vendor_message_sender');
Route::post('/get_vendor_messages','Common\CommonController@get_vendor_messages');
Route::post('/get_vendor_chat_messages','Common\CommonController@get_vendor_chat_messages');
Route::post('/get_vendor_chats','Common\CommonController@get_vendor_chats');

Route::post('/customer_message_sender','Common\CommonController@customer_message_sender');
Route::post('/get_customer_messages','Common\CommonController@get_customer_messages');
Route::post('/get_customer_chat_messages','Common\CommonController@get_customer_chat_messages');
Route::post('/get_customer_chats','Common\CommonController@get_customer_chats');