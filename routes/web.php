<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Admin Routes
Route::view('/admin-login', 'Admin');
Route::view('/admin', 'Admin');

Route::view('/admin/create-service', 'Admin');
Route::view('/admin/edit-service/{id}', 'Admin');
Route::view('/admin/list-service', 'Admin');

Route::view('/admin/create-service-extra', 'Admin');
Route::view('/admin/edit-service-extra/{id}', 'Admin');
Route::view('/admin/list-service-extra', 'Admin');

Route::view('/admin/create-state', 'Admin');
Route::view('/admin/edit-state/{id}', 'Admin');
Route::view('/admin/list-state', 'Admin');

Route::view('/admin/create-city', 'Admin');
Route::view('/admin/edit-city/{id}', 'Admin');
Route::view('/admin/list-city', 'Admin');

Route::view('/admin/create-category', 'Admin');
Route::view('/admin/edit-category/{id}', 'Admin');
Route::view('/admin/list-category', 'Admin');

Route::view('/admin/create-subcategory', 'Admin');
Route::view('/admin/edit-subcategory/{id}', 'Admin');
Route::view('/admin/list-subcategory', 'Admin');

Route::view('/admin/customer-list', 'Admin');
Route::view('/admin/create-customer', 'Admin');

Route::view('/admin/vendor-list', 'Admin');
Route::view('/admin/vendor-info/{id}', 'Admin');
Route::view('/admin/create-vendor', 'Admin');

Route::view('/admin/setting-list', 'Admin');
Route::view('/admin/home-content' , 'Admin');
Route::view('/admin/create-review' , 'Admin');
Route::view('/admin/list-reviews' , 'Admin');
Route::view('/admin/edit-review/{id}', 'Admin');

Route::view('/admin/create-holiday', 'Admin');
Route::view('/admin/edit-holiday/{id}', 'Admin');
Route::view('/admin/list-holidays', 'Admin');

Route::view('/admin/create-question', 'Admin');
Route::view('/admin/edit-question/{id}', 'Admin');
Route::view('/admin/list-question', 'Admin');


Route::view('/admin/add-faq', 'Admin');
Route::view('/admin/edit-faq/{id}', 'Admin');
Route::view('/admin/faqs', 'Admin');


Route::view('/admin/create-emails', 'Admin');
Route::view('/admin/edit-email/{id}', 'Admin');
Route::view('/admin/emails', 'Admin');


Route::view('/admin/create-sms', 'Admin');
Route::view('/admin/edit-sms/{id}', 'Admin');
Route::view('/admin/sms', 'Admin');





Route::view('/admin/gift-cards', 'Admin');

Route::view('/admin/create-service-content', 'Admin');
Route::view('/admin/edit-service-content/{id}', 'Admin');
Route::view('/admin/manage-services-content', 'Admin');


Route::view('/admin/Vendor-messages', 'Admin');
Route::view('/admin/customer-messages', 'Admin');

Route::view('/admin/create-page', 'Admin');
Route::view('/admin/manage-pages', 'Admin');
Route::view('/admin/edit-page/{id}', 'Admin');


// Vendor Routes


Route::view('/vendor', 'vendor');
// Route::view('/vendor-signup', 'vendor');
// Route::view('/vendor-signup/{step}', 'vendor');
// Route::view('/vendor-signup/{step}/{vendor_id}', 'vendor');
// Route::view('/vendor-login', 'vendor');
Route::view('/vendor/profile', 'vendor');
Route::view('/vendor/dashboard', 'vendor');
Route::view('/vendor/employee-list', 'vendor');
Route::view('/vendor/create-employee', 'vendor');
Route::view('/vendor/edit-employee/{id}', 'vendor');
Route::view('/vendor/message-admin', 'vendor');


// Front Client Routes

Route::view('/services/{name?}', 'Front');
Route::view('/signup', 'Front');
Route::view('/login', 'Front');
Route::view('/service/{slug}', 'Front');

Route::view('/profile', 'Front');

Route::view('/{path?}', 'Front');
Route::get('{reactRoutes}', function () {
    return view('Front');
});



