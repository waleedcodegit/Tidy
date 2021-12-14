<?php

namespace App\Http\Controllers\Customer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Customer;
use DB;
use Validator;
use App\ResetPassword;
use App\CustomerAuthMeta;
use Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\CustomerResetPassword;
use Illuminate\Support\Facades\Crypt;
class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request) {
        $customers = Customer::where('delete_status',0)->get();
        // return $customers;
        return response()->json([
            'status' => true,
            'message' => "All Customers",
            'data' => $customers
        ]);
    }
   
    public function create_customer(Request $request)
   
    {
        // return $request;
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|min:3',
            'last_name' => 'required|min:3',
            'password' => 'required|min:6',
            'address' => 'required|min:3',
            'email' => 'required|email|unique:customers,email|max:255',
            'phone' => 'required|min:09|max:09',
            'phonenumber' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => false , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $new_customer = new Customer();
            $new_customer->first_name = $request->first_name;
            $new_customer->last_name  = $request->last_name;
            $new_customer->email = $request->email;
            $new_customer->password = Hash::make($request->password);
            $new_customer->address = $request->address;
            $new_customer->phone = $request->phonenumber.''.$request->phone;
            $new_customer->status = 1;
            $new_customer->save();

            $meta = new CustomerAuthMeta();
            $meta->customer_id = $new_customer->id;
            $meta->ip = $request->ip();
            $meta->token = Hash::make(time());
            $new_time = date('H:i', strtotime('+15 minutes'));
            $meta->token_valid_till = $new_time;
            $meta->save();
            $new_customer->token = $meta->token;
            
            return response()->json([
                'status' => 200,
                'message' => "Customer Created Successfully",
                'data' => $new_customer   
            ]);   
        }
    }

    public function social_login(Request $request)
   
    {
        // return $request->profileObj['familyName'];
        $customer = Customer::where('email', $request->profileObj['email'])->where('status', 1)->first();
        if($customer){
            $meta_check = CustomerAuthMeta::where('customer_id',$customer->id)
            ->where('ip',$request->ip())
            ->first();
                    if($meta_check){
                    $token = $meta_check->token;
                    } else {
                    $meta = new CustomerAuthMeta();
                    $meta->customer_id = $customer->id;
                    $meta->ip = $request->ip();
                    $meta->token = Hash::make(time());
                    $new_time = date('H:i', strtotime('+15 minutes'));
                    $meta->token_valid_till = $new_time;
                    $meta->save();
                    $token = $meta->token;
                    }
                    $customer->token = $token;
                    return response()->json([
                    'status' => 200,     
                    'message' => "Successfull login",
                    'customer' => $customer, 
                    ]);
        }else{
            // $url = 'http://example.com/image.png';
            // $img = public_path('images') . '\\test.png';
            // file_put_contents($img, file_get_contents($url));

            $new_customer = new Customer();
            $new_customer->first_name = $request->profileObj['givenName'];
            $new_customer->last_name  = $request->profileObj['familyName'];
            $new_customer->email = $request->profileObj['email'];
            $new_customer->password = Hash::make($request->profileObj['familyName']);
            
            $new_customer->status = 1;
            $new_customer->save();
    
            $meta = new CustomerAuthMeta();
            $meta->customer_id = $new_customer->id;
            $meta->ip = $request->ip();
            $meta->token = Hash::make(time());
            $new_time = date('H:i', strtotime('+15 minutes'));
            $meta->token_valid_till = $new_time;
            $meta->save();
            $new_customer->token = $meta->token;
            
            return response()->json([
                'status' => 200,
                'message' => "Customer Created Successfully",
                'data' => $new_customer   
            ]);  
        }
      
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function customer_check_auth(Request $request){
        $customer_auth = CustomerAuthMeta::where('token',$request->token)
            ->where('ip',$request->ip())
            ->first();
        if($customer_auth){
            $customer = Customer::where('id',$customer_auth->customer_id)->first();
            $response = ['status' => 200 , 'customer'=>$customer_auth , 'customer' => $customer];
            return $response;
        }else{
        $response = ['status' => 401 , 'msg' => 'Sorry, Incorrect Token'];
            return $response;
        }
    }

    
    public function customer_login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|min:6',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->messages(),
                'message' => $validator->errors()->first()
            ]);
        }else{
            $customer = Customer::where('email', $request->email)->where('status', 1)->first();
            if($customer){
                if(Hash::check($request->password, $customer->password)){
                    $meta_check = CustomerAuthMeta::where('customer_id',$customer->id)
                                    ->where('ip',$request->ip())
                                    ->first();
                    if($meta_check){
                        $token = $meta_check->token;
                    } else {
                        $meta = new CustomerAuthMeta();
                        $meta->customer_id = $customer->id;
                        $meta->ip = $request->ip();
                        $meta->token = Hash::make(time());
                        $new_time = date('H:i', strtotime('+15 minutes'));
                        $meta->token_valid_till = $new_time;
                        $meta->save();
                        $token = $meta->token;
                    }
                    $customer->token = $token;
                    return response()->json([
                       'status' => 200,     
                       'message' => "Successfull login",
                       'customer' => $customer, 
                    ]);
                }else{
                    return response()->json([
                        'status' => 401,     
                        'message' => "Invalid Password",
                        'data' => null, 
                     ]);
                }
            }else{
                return response()->json([
                    'status' => 401,     
                    'message' => "Invalid Email",
                    'data' => null, 
                 ]);
            }
        }
    }

    


    public function customer_forget_password(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',  
                     
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{

            $customer = DB::table('customers')
                        ->where('email', $request->email)
                        ->where('status', 1)
                        ->get();
            if(sizeof($customer) > 0){
                DB::table('resetpasswords')->where('email', $request->email)->update(array('status' => '0'));  
                $p = new ResetPassword();
                $p->email = $request->email;
                $p->token = $customer[0]->id;
                $p->status = 1;
                $p->save();
                $link = 'reset-password/'.Crypt::encrypt($p->token);
                $title = 'Password Reset';
                Mail::to($request->email)->send(new CustomerResetPassword($link,$title));
                $response = ['status' => 200 , 'msg' => 'success- password reset link mailed successfully'];
                return $response;
            }else{
                $response = ['status' => 404 , 'msg' => 'error- email not found'];
                return $response;
            }
        }
    }
    public function user_password(Request $request){
        $validator = Validator::make($request->all(), [
            'token' => 'required', 
            'password' => 'required|min:6',         
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $meta =  DB::table('resetpasswords')->where('token', Crypt::decrypt($request->token))->where('status',1)->get();
            if(sizeof($meta) > 0){
                    $customer =  DB::table('customers')->where('email', $meta[0]->email)->get(); 
                    $new_customer = Customer::find($customer[0]->id);                     
                    $new_customer->password = Hash::make($request->password);
                    $new_customer->save();
                    DB::table('resetpasswords')->where('email', $meta[0]->email)->update(array('status' => 0));  
                    $response = ['status' => 200 , 'msg' => 'success- customer password updated successfully'];
                    return $response;
            }else{
                $response = ['status' => 401 , 'msg' => 'error- Inavlid token or token is expierd'];
                return $response;
            }
        }
    }

    public function edit_customer($id) {
        $data = Customer::where('id', $id)->first();
        return response()->json([
            'status' => true,
            'message' => "Edit Customer Successfully",
            'data' => $data,   
        ]);
    }

    public function update_customer(Request $request) {
        // return $request;
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|min:3',
            'last_name' => 'required|min:3',
            'address' => 'required|min:3',
            'email' => 'required',
            'phone' => 'required|min:11',
        ]);
        if($validator->fails()){
            $response = ['status' => false , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }
        $user = Customer::where('id' , $request->id)->first();
        $user->first_name = $request->first_name;
        $user->last_name  = $request->last_name;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $user->status = $request->status;
        $user->image = $request->image;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => "Edit Customer Successfully",
            'customer' => $user,     
        ]);
    }
  
    public function delete_customer(Request $request) {
        
        $user = Customer::where('id', $request->id)->update([
            'delete_status' => true,
           
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Customer deleted successfully', 
        ];
        return $response;
    }

}
