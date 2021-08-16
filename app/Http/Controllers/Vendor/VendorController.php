<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Vendor;
use App\InsuranceCertificateCCard;
use Validator;
use App\ResetPassword;
use App\VendorAuthMeta;
use Hash;
use Exception;
use Stripe;
use Illuminate\Support\Facades\Crypt;
use App\Category;
use App\VendorDocuments;
use App\VendorServices;
use Illuminate\Support\Facades\Mail;
use App\Mail\ApprovalEmail;
use App\VendorLocation;

class VendorController extends Controller
{
    public function list(Request $request) {
        $vendor = Vendor::where('delete_status',0)->get();
        return response()->json([
            'status' => true,
            'message' => "All Vendors",
            'data' => $vendor
        ]);
    }
    
    public function delete_vendor_address(Request $request){
        $address = VendorLocation::where('id',$request->id)->delete();
        return $address;
    }
    public function get_vendor_addresses(Request $request){
        $address = VendorLocation::where('vendor_id',$request->vendor_id)->get();
        return $address;
    }
    public function update_vendor_address(Request $request){
        $validator = Validator::make($request->all(), [
            'address' => 'required',
            'radius' => 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()     
            ]);
        }
        $address = VendorLocation::where('id',$request->id)->first();
        $address->address = $request->address;
        $address->lat = $request->lat;
        $address->lng = $request->long;
        $address->radius = $request->radius;
        $address->save();
        return response()->json([
            'status' => true
        ]);
    }
    public function add_vendor_address(Request $request){
        $validator = Validator::make($request->all(), [
            'address' => 'required',
            'radius' => 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()     
            ]);
        }
        $address = new VendorLocation();
        $address->vendor_id = $request->vendor_id;
        $address->address = $request->loc_address;
        $address->lat = $request->lat;
        $address->lng = $request->long;
        $address->radius = $request->radius;
        $address->save();
        return response()->json([
            'status' => true
        ]);
    }
    public function show(Request $request) {
        $vendor = Vendor::where('id', $request->id)->with('insurance_detail', 'vendor_doc', 'vendor_servicess')->first();
        $services_array = [];
        if(count($vendor->vendor_servicess) > 0) {
            foreach($vendor->vendor_servicess as $val) {
                $service = Category::where('id', $val->service_id)->first();
                array_push($services_array, $service);
                $vendor->vendor_selected_services = $services_array;
            }
        }

        $services = Category::get();
        $not_used = [];


        foreach($services as $sr){
            $check = 0;
            foreach($vendor->vendor_servicess as $val) {
                if($sr->id == $val->service_id){
                    $check = 1;
                }
            }
            if($check == 0){
                array_push($not_used,$sr);
            }
        }
        $vendor->services = $not_used;
        $response = [
            'status' => 200 ,
            'msg' => 'Vendor',
            'data' => $vendor
        ];
        return $response;
    }

    public function delete_vendor_selected_services(Request $request) {
        $service = VendorServices::where('service_id', $request->id)->delete();
        $response = [
            'status' => 200 ,
            'msg' => 'Vendor Selected Service Deleted',
            'data' => $service
        ];
        return $response;
    }

    public function add_vendor_service(Request $request) {
        $check = VendorServices::where('service_id', $request->service_id)->first();
        if($check) {
            $response = [
                'status' => 401 ,
                'msg' => 'Service Already Added',
            ];
            return $response;
        } else {
            $data = new VendorServices();
            $data->service_id = $request->service_id;
            $data->vendor_id = $request->vendor_id;
            $data->save();

            $response = [
                'status' => 200 ,
                'msg' => 'Vendor Service Added',
            ];
            return $response;
        }  
    }

    public function get_services(Request $request) {
        $services = Category::get();
        foreach($services as $s){
            $s->check = false;
        }
        $response = [
            'status' => 200 ,
            'msg' => 'All Services',
            'data' => $services
        ];
        return $response;
    }
    public function save_vendor_services(Request $request){
        foreach($request->services as $s){
            if($s['check']){
                $servcie = new VendorServices();
                $servcie->vendor_id = $request->vendor_id;
                $servcie->service_id = $s['id'];
                $servcie->save();
            }
        }
    }
    public function file_upload(Request $request){
        try{
            if ($request->hasFile('file')) {
                $file = $request->file;
                $filename = $file->getClientOriginalName();
                $image = date('His') . $filename;
                $destination_path = public_path() . '/files/';
                $file->move($destination_path, $image);
                $url = $image;
                $response = ['status' => 200 , 'msg' =>'File Uploaded.','url' => $url];
                return $response;
            }
        }catch(Exception $e){
            $response = ['status' => 401 , 'msg' => 'File Uploaded.','error' => $e];
            return $response;
        }
    }
    public function get_vendor_services(Request $request){
        $services = VendorServices::where('vendor_id',$request->vendor_id)->with('service')->get();
        return $services;
    }
    public function delete_vendor_service(Request $request){
        $services = VendorServices::where('id',$request->id)->delete();
        // return $services;
    }
    public function get_vendor_card_details(Request $request){
        $details = InsuranceCertificateCCard::where('vendor_id',$request->vendor_id)->first();
        if($details){
            $card = (string) $details->credit_card_number;
            $details->credit_card_number =  $card[-4].$card[-3].$card[-2].$card[-1];
            $response = ['status' => '200' , 'details' => $details];
            return $response;
        }else{
            $response = ['status' => 404 ];
            return $response;
        }
    }
    
    public function update_vendor_card(Request $request){

        $validator = Validator::make($request->all(), [
            'credit_card_number' => 'required',
            'cvc' => 'required',
            'expiry_month' => 'required',
            'expiry_year' => 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()     
            ]);
        }
        try{
        $vendor = Vendor::where('id',$request->vendor_id)->first();

        $stripe = new \Stripe\StripeClient(
            env("STRIPE_SK")
          );
        $token =  $stripe->tokens->create([
            'card' => [
              'number' =>  $request->credit_card_number,
              'exp_month' => $request->expiry_month,
              'exp_year' => $request->expiry_year,
              'cvc' => $request->cvc,
            ],
          ]);
          $customer = $stripe->customers->create([
            "email" => $vendor->email,
            "source" =>  $token->id
        ]);
        // return $customer;
        $vendor->vendor_stripe_id = $customer->id;
        $vendor->save();
        $vendor_card = InsuranceCertificateCCard::where('vendor_id',$vendor->id)->first();
        if($vendor_card){
            $vendor_card->credit_card_number = $request->credit_card_number;
            $vendor_card->expiry_month = $request->expiry_month;
            $vendor_card->expiry_year = $request->expiry_year;
            $vendor_card->cvc = $request->cvc;
            $vendor_card->card_holder_name = $request->card_holder_name;
            $vendor_card->save();
        }else{
            $vendor_card = new InsuranceCertificateCCard();
            $vendor_card->credit_card_number = $request->credit_card_number;
            $vendor_card->expiry_month = $request->expiry_month;
            $vendor_card->expiry_year = $request->expiry_year;
            $vendor_card->cvc = $request->cvc;
            $vendor_card->card_holder_name = $request->card_holder_name;
            $vendor_card->vendor_id = $vendor->id;
            $vendor_card->save();
        }
        return response()->json([
            'status' => true,
            'customer' => $customer,
        ]);
        }catch(Exception $e){
            return response()->json([
                'status' => false,
                'message' => 'Card Validation Error - Please check you card details.',
                'errors' => $e     
            ]);
        }
    }
    public function validate_card(Request $request){
        $validator = Validator::make($request->all(), [
            'credit_card_number' => 'required',
            'cvc' => 'required',
            'expiry_month' => 'required',
            'expiry_year' => 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()     
            ]);
        }
        try{
        $stripe = new \Stripe\StripeClient(
            env("STRIPE_SK")
          );
        $token =  $stripe->tokens->create([
            'card' => [
              'number' =>  $request->credit_card_number,
              'exp_month' => $request->expiry_month,
              'exp_year' => $request->expiry_year,
              'cvc' => $request->cvc,
            ],
          ]);
          $customer = $stripe->customers->create([
            "email" => $request->email,
            "source" =>  $token->id
        ]);
        return response()->json([
            'status' => true,
            'customer' => $customer,
        ]);
        }catch(Exception $e){
            return response()->json([
                'status' => false,
                'message' => 'Card Validation Error - Please check you card details.',
                'errors' => $e     
            ]);
        }
    }
    public function validate_vendor(Request $request){
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            // 'password' => 'required',
            'address' => 'required',
            'email' => 'required|email|unique:vendors,email|max:255',
            'phone' => 'required',
            'dob' => 'required',
            'australian_business_number' => 'required|min:11|max:11',
            'type_of_business' => 'required',
            'business_name' => 'required',
            // 'trading' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()     
            ]);
        }else{
            return response()->json([
                'status' => true,  
            ]);
        }
    }
    public function submit_vendor_request(Request $request){
        try{
        $new_vendor = new Vendor();
        $new_vendor->first_name = $request->first_name;
        $new_vendor->last_name  = $request->last_name;
        $new_vendor->email = $request->email;
        // $new_vendor->password = Hash::make('tidyhome123');
        $new_vendor->address = $request->address;
        $new_vendor->phone = $request->phone;
        $new_vendor->dob = $request->dob;
        $new_vendor->australian_business_number = $request->australian_business_number;
        $new_vendor->type_of_business = $request->type_of_business;
        $new_vendor->business_name = $request->business_name;
        $new_vendor->trading = $request->trading;
        // $new_vendor->vendor_stripe_id = $customer->id;
        $new_vendor->insurance_certificate_type = $request->insurance_certificate_type;
        $new_vendor->save();
        $vendor = Vendor::find($new_vendor->id);

        foreach($request->addresses as $va){

            $vendor_location = new VendorLocation();
            $vendor_location->vendor_id = $vendor->id;
            $vendor_location->address = $va['address'];
            $vendor_location->lat = $va['lat'];
            $vendor_location->lng = $va['long'];
            $vendor_location->radius = $va['radius'];
            $vendor_location->save();
        }
        

        if($request->insurance_certificate_type == "admin") {
            $ins = new InsuranceCertificateCCard();
            $ins->vendor_id = $vendor->id;
            $ins->credit_card_number = $request->credit_card_number;
            $ins->cvc = $request->cvc;
            $ins->expiry_month = $request->expiry_month;
            $ins->expiry_year = $request->expiry_year;
            $ins->card_holder_name = $request->card_holder_name;
            $ins->duration_of_insu_charges = $request->duration_of_insu_charges;
            $ins->status = "activate";
            $ins->save();   
            $vendor->vendor_stripe_id = $request->customer['id'];
        }
            if(sizeof($request->ic) > 0){
                foreach($request->ic as $ic){
                    $vendor_documents = new VendorDocuments();
                    $vendor_documents->vendor_id = $new_vendor->id;
                    $vendor_documents->title = $ic['title'];
                    $vendor_documents->document = $ic['url'];
                    $vendor_documents->save();
                }
               
            }
            if(sizeof($request->Npc) > 0){
                foreach($request->Npc as $Npc){
                    $vendor_documents = new VendorDocuments();
                    $vendor_documents->vendor_id = $new_vendor->id;
                    $vendor_documents->title = $Npc['title'];
                    $vendor_documents->document = $Npc['url'];
                    $vendor_documents->save();
                }
               
            }
            if(sizeof($request->photo_id) > 0){
                foreach($request->photo_id as $photo_id){
                    $vendor_documents = new VendorDocuments();
                    $vendor_documents->vendor_id = $new_vendor->id;
                    $vendor_documents->title = $photo_id['title'];
                    $vendor_documents->document = $photo_id['url'];
                    $vendor_documents->save();
                }
               
            }
           

        foreach($request->services as $s){
            if($s['check']){
                $servcie = new VendorServices();
                $servcie->vendor_id = $vendor->id;
                $servcie->service_id = $s['id'];
                $servcie->save();
            }
        }
        $vendor->save();
        
    $response = ['status' => 200 , 'msg' => 'Vendor added.'];
    return $response;
        }catch(Exception $e){
        $response = ['status' => 404 , 'msg' => 'Error - '.$e];
        return $response;
        }
    }
    public function create_vendor(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            // 'password' => 'required',
            'address' => 'required',
            'email' => 'required|email|unique:vendors,email|max:255',
            'phone' => 'required',
            'dob' => 'required',
            'australian_business_number' => 'required|min:11|max:11',
            'type_of_business' => 'required',
            'business_name' => 'required',
            // 'trading' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()     
            ]);
        }else{

                $new_vendor = new Vendor();
                $new_vendor->first_name = $request->first_name;
                $new_vendor->last_name  = $request->last_name;
                $new_vendor->email = $request->email;
                // $new_vendor->password = Hash::make($request->password);
                $new_vendor->address = $request->address;
                $new_vendor->phone = $request->phone;
                $new_vendor->dob = $request->dob;
                $new_vendor->australian_business_number = $request->australian_business_number;
                $new_vendor->type_of_business = $request->type_of_business;
                $new_vendor->business_name = $request->business_name;
                $new_vendor->trading = $request->trading;
                // $new_vendor->vendor_stripe_id = $customer->id;
                $new_vendor->insurance_certificate_type = $request->insurance_certificate_type;
                $new_vendor->save();
                return response()->json([
                    'status' => true,
                    'message' => "Vendor Created Successfully",
                    'vendor' => $new_vendor,     
                ]);
        }
    }
    public function update_vendor_profile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            // 'password' => 'required',
            'address' => 'required',
            // 'email' => 'required|email|unique:vendors,email|max:255',
            'phone' => 'required',
            'dob' => 'required',
            'australian_business_number' => 'required|min:11|max:11',
            'type_of_business' => 'required',
            'business_name' => 'required',
            // 'trading' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()     
            ]);
        
        }else{

                // $new_vendor = new Vendor();
                // $new_vendor->first_name = $request->first_name;
                // $new_vendor->last_name  = $request->last_name;
                // $new_vendor->email = $request->email;
                // // $new_vendor->password = Hash::make($request->password);
                // $new_vendor->address = $request->address;
                // $new_vendor->phone = $request->phone;
                // $new_vendor->dob = $request->dob;
                // $new_vendor->australian_business_number = $request->australian_business_number;
                // $new_vendor->type_of_business = $request->type_of_business;
                // $new_vendor->business_name = $request->business_name;
                // $new_vendor->trading = $request->trading;
                // // $new_vendor->vendor_stripe_id = $customer->id;
                // $new_vendor->insurance_certificate_type = $request->insurance_certificate_type;
                $new_vendor = Vendor::find($request->data['id']);
                
                $new_vendor->first_name = $request->data['first_name'];
                $new_vendor->last_name  = $request->data['last_name'];
                $new_vendor->address = $request->data['address'];
                $new_vendor->phone = $request->data['phone'];
                $new_vendor->dob = $request->data['dob'];
                $new_vendor->australian_business_number = $request->data['australian_business_number'];
                $new_vendor->type_of_business = $request->data['type_of_business'];
                $new_vendor->business_name = $request->data['business_name'];
                $new_vendor->trading = $request->data['trading'];
                $new_vendor->insurance_certificate_type = $request->data['insurance_certificate_type'];
                $new_vendor->save();
                return response()->json([
                    'status' => true,
                    // 'message' => "Vendor Created Successfully",
                    'message' => "Vendor Updated Successfully",
                    'vendor' => $new_vendor,     
                ]);
        }
            
        
    }
    public function vendor_insurance_certificate(Request $request){
        $vendor = Vendor::find($request->vendor_id);
        if($request->insurance_certificate_type == "admin") {
            $validator = Validator::make($request->all(), [
                'credit_card_number' => 'required',
                'cvc' => 'required',
                'expiry_month' => 'required',
                'expiry_year' => 'required',
            ]);
            if($validator->fails()){
                return response()->json([
                    'status' => false,
                    'message' => $validator->errors()->first(),
                    'errors' => $validator->errors()     
                ]);
            }
            try{
            $stripe = new \Stripe\StripeClient(
                env("STRIPE_SK")
              );
            $token =  $stripe->tokens->create([
                'card' => [
                  'number' =>  $request->credit_card_number,
                  'exp_month' => $request->expiry_month,
                  'exp_year' => $request->expiry_year,
                  'cvc' => $request->cvc,
                ],
              ]);
              $customer = $stripe->customers->create([
                "email" => $vendor->email,
                "source" =>  $token->id
            ]);
            $vendor->vendor_stripe_id = $customer->id;
            }catch(Exception $e){
                return response()->json([
                    'status' => false,
                    'message' => 'Card Validation Error - Please check you card details.',
                    'errors' => $e     
                ]);
            }
        }
        if ($request->insurance_certificate) {
            $name = time() . '.' . explode('/', explode(':', substr($request->insurance_certificate, 0, strpos($request->insurance_certificate, ';')))[1])[1];
            \Image::make($request->insurance_certificate)->save(public_path('images/insuranceCertificates/') . $name);
            $vendor->insurance_certificate = $name;
        }
        $vendor->save();
        if($request->insurance_certificate_type == "admin") {
            $ins = new InsuranceCertificateCCard();
            $ins->vendor_id = $vendor->id;
            $ins->credit_card_number = $request->credit_card_number;
            $ins->cvc = $request->cvc;
            $ins->expiry_month = $request->expiry_month;
            $ins->expiry_year = $request->expiry_year;
            $ins->card_holder_name = $request->card_holder_name;
            $ins->duration_of_insu_charges = $request->duration_of_insu_charges;
            $ins->status = "activate";
            $ins->save();                      
    }
    $response = ['status' => 200 , 'msg' => 'Vendor Insurance certificate added.'];
    return $response;

    }
    public function approved_vendor(Request $request) {
        $data = Vendor::where('id', $request->id)->update([
            'password' => Hash::make('tidy'.$request->id.'home'),
            'status' => 'approved'
        ]);

        $data = Vendor::where('id', $request->id)->first();
        Mail::to($data->email)->send(new ApprovalEmail($data));

        $response = [
            'status' => 200 ,
            'msg' => 'Vendor Approved',
        ];
        return $response;
    }


    public function update_vendor(Request $request) {
        $data = Vendor::where('id', $request->id)->update([
                'first_name' => $request->first_name,
                'last_name'  => $request->last_name,
                'email' => $request->email,
                'address' => $request->address,
                'phone' => $request->phone,
                'dob' => $request->dob,
                'business_name' => $request->business_name
        ]);

        $response = [
            'status' => 200 ,
            'msg' => 'Info Update',
        ];
        return $response;
    }

    public function vendor_login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 401,
                'errors' => $validator->messages(),
                'message' => $validator->errors()->first()
            ]);
        }else{
            $vendor = Vendor::where('email', $request->email)->first();
            if($vendor){
                if($vendor->status) {
                    if(Hash::check($request->password, $vendor->password)){
                        $meta_check = VendorAuthMeta::where('vendor_id',$vendor->id)
                                        ->where('ip',$request->ip())
                                        ->first();
                        if($meta_check){
                            $token = $meta_check->token;
                        } else {
                            $meta = new VendorAuthMeta();
                            $meta->vendor_id = $vendor->id;
                            $meta->ip = $request->ip();
                            $meta->token = Hash::make(time());
                            $new_time = date('H:i', strtotime('+15 minutes'));
                            $meta->token_valid_till = $new_time;
                            $meta->save();
                            $token = $meta->token;
                        }
                        $vendor->token = $token;
                        return response()->json([
                           'status' => 200,     
                           'message' => "Successfull login",
                           'data' => $vendor, 
                        ]);
                    }else{
                        return response()->json([
                            'status' => 401,     
                            'message' => "Invalid Password",
                            'data' => null, 
                         ]);
                    }
                } else {
                    return response()->json([
                        'status' => 401,     
                        'message' => "Sorry you are no approved from the admin yet",
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

    public function vendor_check_auth(Request $request){
        $vendor_auth = VendorAuthMeta::where('token',$request->token)
            ->where('ip',$request->ip())
            ->first();
        if($vendor_auth){
            $response = ['status' => 200 , 'vendor'=>$vendor_auth];
            return $response;
        }else{
        $response = ['status' => 401 , 'msg' => 'Sorry, Incorrect Token'];
            return $response;
        }
    }
    public function delete_vendor(Request $request) {
        
        $vendor = Vendor::where('id', $request->id)->update([
            'delete_status' => true,
           
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Successfully Deleted'
        ];
        return $response;
    }
}
