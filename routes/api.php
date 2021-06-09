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
    
    // Category Route
    Route::resource('category', 'Admin\CategoryController');
    // SubCategory Route
    Route::resource('subcategory', 'Admin\SubCategoryController');
    // Setting Route
    Route::resource('setting', 'Admin\SettingController');

    Route::resource('holiday', 'Admin\PublicHolidaysController');
    Route::resource('question', 'Admin\QuestionController');  
});


Route::post('update-setting', 'Admin\SettingController@update_setting');
Route::post('/customer-login','Customer\AuthController@customer_login');
Route::post('/customer_forget_password','Customer\AuthController@customer_forget_password');
Route::post('/user-password','Customer\AuthController@user_password');
Route::get('/test','Admin\AdminController@test');
Route::post('/create-admin','Admin\AdminController@create_admin');
Route::post('/login-admin','Admin\AdminController@login_admin');
Route::post('/check-auth-admin','Admin\AdminController@admin_check_auth');
Route::post('/create-vendor','Vendor\VendorController@create_vendor');
Route::post('/vendor-login','Vendor\VendorController@vendor_login');
Route::post('/getcategory','Frontend\CategoryController@getcategory');
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

Route::post('/update_vendor_profile','Vendor\VendorController@update_vendor_profile');


