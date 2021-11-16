<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Payment;
use App\VendorWithdrawRequest;

class ManageAcountsController extends Controller
{
    public function payments_list()
    {
        $payment = Payment::all();
        $response= ['status' => 200 ,
                'payment' => $payment];
        return $response;
    }
    public function get_vendor_withdraw_requests()
    {
        $vendorwithdrawrequest = VendorWithdrawRequest::orderBy('id','DESC')->with('vendorname')->get();
        $response= ['status' => 200 ,
                'vendorwithdrawrequest' => $vendorwithdrawrequest];
        return $response;
    }
}
