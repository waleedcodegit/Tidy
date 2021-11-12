<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Admin;
use Illuminate\Support\Facades\Hash;
use DB;
use App\GiftCard;
use App\AdminAuthMeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Employee;
use App\Vendor;
use App\Customer;
use App\Booking;
use App\Category;
use App\SubCategory;
use App\Payment;

class AdminController extends Controller
{
    public function create_admin(Request $request){
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|min:3',
            'last_name' => 'required|min:3',
            'password' => 'required|min:6',
            'email' => 'required|email|unique:admins|max:255',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $admin = new Admin();
            $admin->first_name = $request->first_name;
            $admin->last_name  = $request->last_name;
            $admin->user_name = $request->first_name . "_". $request->last_name . "-".rand();
            $admin->email = $request->email;
            $admin->password = Hash::make($request->password);
            $admin->number = $request->number;
            $admin->save();
            $response = ['status' => 200 , 'msg' => 'admin created successfully.' , 
                         'admin' => $admin];
            return $response;   
        }
    }

    public function login_admin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required',     
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 'errors' => $validator->errors()];
            return $response;
        }else{
            $admin = Admin::where('email', $request->email)->first();
            if($admin){
                if(Hash::check($request->password, $admin->password)){
                    $meta_check = AdminAuthMeta::where('admin_id',$admin->id)
                                    ->where('ip',$request->ip())
                                    ->first();
                    if($meta_check){
                        $token = $meta_check->token;
                    }else{
                        $meta = new AdminAuthMeta();
                        $meta->admin_id = $admin->id;
                        $meta->ip = $request->ip();
                        $meta->token = Hash::make(time());
                        $new_time = date('H:i', strtotime('+15 minutes'));
                        $meta->token_valid_till = $new_time;
                        $meta->save();
                        $token = $meta->token;
                    }
                    $admin->token = $token;
                    $response = [   
                        'status' => 200 , 
                        'msg' => 'success- admin Authenticated Successfully',
                        'admin' => $admin
                    ];
                    return $response;
                }else{
                    $response = ['status' => 401 , 'msg' => 'Error- Invalid Password'];
                return $response;
                }
            }else{
                $response = ['status' => 401 , 'msg' => 'Error- Invalid Email'];
                return $response;
            }
        }
    }
    public function admin_check_auth(Request $request){
                $admin_auth = AdminAuthMeta::where('token',$request->token)
                ->where('ip',$request->ip())
                ->first();
                
        if($admin_auth){
            
            $response = ['status' => 200];
            return $response; 
        }else{
        $response = ['status' => 401 , 'msg' => 'Sorry, Incorrect Token'];
        return $response;
        }
    }
    public function test(Request $request){
        return $request->all();
    }

    public function get_gift_cards(Request $request){
        $gift_cards = GiftCard::where('delete_status',0)->get();
        return $gift_cards;
    }
    public function delete_GiftCard(Request $request) {
        
        $gift_cards = GiftCard::where('id', $request->id)->update([
            'delete_status' => true,
           
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Successfully Deleted'
        ];
        return $response;
    }

    public function admin_info(Request $request){
        $admin = admin::where('email', $request->email)->get();
        if($admin){
            $response = ['status' => 200];
            return $response;
        }else{
            $response =['status' => 401 , 'msg' => 'Sorry, nothing found'];
            return $response;
        }
        
    }
    public function customers_list(){
        $Customer = Customer::count();
        if($Customer){
        $response=[
            'status' => 200,
            'message' => 'Success',
            'data' => $Customer,
        ];
        }else{
        $response=[
            'status' => 401,
            'message' => 'No data found',
        ];
        }
        return $response;
    }
    public function vendor_list(){
        $vendorlist = Vendor::count();
        if($vendorlist){
        $response=[
            'status' => 200,
            'message' => 'Success',
            'data' => $vendorlist,
        ];
        }else{
        $response=[
            'status' => 401,
            'message' => 'No data found',
        ];
        }
        return $response;
    }
    public function bookings_count(){
        $Booking = Booking::count();
        if($Booking){
        $response=[
            'status' => 200,
            'message' => 'Success',
            'data' => $Booking,
        ];
        }else{
        $response=[
            'status' => 401,
            'message' => 'No data found',
        ];
        }
        return $response;
    }
    public function employees_count(){
        $Employee = Employee::count();
        if($Employee){
        $response=[
            'status' => 200,
            'message' => 'Success',
            'data' => $Employee,
        ];
        }else{
        $response=[
            'status' => 401,
            'message' => 'No data found',
        ];
        }
        return $response;
    }
    public function services_count(){
        $services = Category::count();
        if($services){
        $response=[
            'status' => 200,
            'message' => 'Success',
            'data' => $services,
        ];
        }else{
        $response=[
            'status' => 401,
            'message' => 'No data found',
        ];
        }
        return $response;
    }

    public function sub_services_count(){
        $sub_services = SubCategory::count();
        if($sub_services){
        $response=[
            'status' => 200,
            'message' => 'Success',
            'data' => $sub_services,
        ];
        }else{
        $response=[
            'status' => 401,
            'message' => 'No data found',
        ];
        }
        return $response;
    }
    public function total_payments(){
        $payment = Payment::sum('amount');
        if($payment){
        $response=[
            'status' => 200,
            'message' => 'Success',
            'data' => $payment,
        ];
        }else{
        $response=[
            'status' => 401,
            'message' => 'No data found',
        ];
        }
        return $response;
    }

}
