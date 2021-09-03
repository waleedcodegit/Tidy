<?php

namespace App\Http\Controllers\Frontend;

use App\Booking;
use App\BookingInformation;
use Illuminate\Support\Str;

use App\Category;
use App\Customer;
use App\CustomerCard;
use App\GiftCard;
use App\Http\Controllers\Controller;
use App\Mail\RecipientGiftCardMail;
use App\Mail\SenderGiftCardMail;
use App\Question;
use App\ServiceExtra;
use App\Setting;
use App\SubCategory;
use App\Payment;
use App\ServiceContent;
use Illuminate\Http\Request;
use Validator;
// use Prophecy\Call\Call;
use Illuminate\Support\Facades\Mail;
use Monolog\Handler\SendGridHandler;

class FrontController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function get_service_content_by_slug(Request $request){
        $service = Category::where('slug',$request->slug)->first();
        if($service){
            $ServiceContent = ServiceContent::where('service_id',$service->id)->with('service')->first();
            return $ServiceContent;
        }
    }
    public function get_service_totals(Request $request){
        
        $service = Category::where('id',$request->screen1['service_id'])->first();
        $extras = $request->screen2['extras'] ;
        $extra_total = 0;
        if(sizeof($extras) > 0){
            foreach($extras as $ex){
               $extra_total = $extra_total +  $ex['price'] * $ex['quantity'];
            }
        }
        if($service->residential_type == 1){
            $total = 0;
            $service_price = 0;
            $resident_total = 0;
            $sub_services = SubCategory::where('id',$request->screen1['sub_service_id'])->first();
            if($sub_services){
                 $service_price = $sub_services->price;
            }
            if($request->screen2['resident_type'] == 'House'){
                $settings = Setting::where('id',1)->first();
                $resident_total = $settings->house_additional_charges + $request->screen2['levels'] * $settings->levels + $request->screen2['bedrooms'] * $settings->bedroom +  $request->screen2['bathrooms'] * $settings->bathroom ;
            }else{
                $settings = Setting::where('id',1)->first();
                $resident_total = $request->screen2['levels'] * $settings->levels  + $request->screen2['bedrooms'] * $settings->bedroom +  $request->screen2['bathrooms'] * $settings->bathroom ;
            }
            $total = $service_price  + $resident_total + $extra_total;
            $response = ['service' => $service , 'total' => $total , 'extra_total' => $extra_total , 'sub_service' => $sub_services ];
            return $response;
        }else{
            $response = ['service' => $service , 'extras_total' => $extra_total  ];
            return $response;
        }
    }
    public function make_booking(Request $request){
        // return $request;
        $booking = new Booking();
        $booking->customer_id = $request->customer['data']['id'];
        $booking->service_id = $request->select_service_state['service_id'];
        $booking->sub_service_id = $request->select_service_state['sub_service_id'];
        $date = strtotime( $request->select_service_state['date']);;
       
        // return date('Y-m-d', $date);
        $booking->date =  date('Y-m-d', $date);
        $booking->time = $request->select_service_state['time'];
        $booking->flexible_with_date = $request->select_service_state['date_flexible'];
        $booking->flexible_with_time = $request->select_service_state['time_flexible'];
        $booking->booking_type = $request->select_service_state['service_type'];
        $booking->recurring_type = $request->select_service_state['recurring'];
        $booking->custome_type = $request->select_service_state['custom_recurring'];
        $booking->is_custom = $request->select_service_state['is_custom'];
        if($request->select_service_state['is_custom'] == 1){
            $booking->custom_days = json_encode($request->select_service_state['custom_days']);
        }
        $booking->booking_totals = $request->screen4['data']['total'];
        $booking->booking_tax = 0;
        $extras = [];
        if(sizeof($request->screen2['extras'] ) > 0){
            foreach($request->screen2['extras'] as $se){
                if($se->quantity > 0){
                    array_push($extras,$se);
                }
            }
            $booking->booking_extras = json_encode($extras);
        
        }
        $booking->booking_extras_total = $request->screen4['data']['extra_total'];
        $booking->gift_card_id = 0;
        $booking->is_deleted = 0;
        $booking->status = 0;
        $booking->save();

        $b_information = new BookingInformation();
        $b_information->booking_id = $booking->id;
        $b_information->resident_type = $request->screen2['resident_type'];
        $b_information->levels = $request->screen2['levels'];
        $b_information->bedrooms = $request->screen2['bedrooms'];
        $b_information->bathrooms = $request->screen2['bathrooms'];
        $b_information->is_parking_available = $request->screen2['is_parking_available'];
        $b_information->will_be_at_home = $request->screen2['will_at_home'];
        $b_information->premises_instruction = $request->screen2['prem_vendor_enterance'];
        $b_information->is_parking_free = $request->screen2['is_free_parking'];
        $b_information->parking_instruction = $request->screen2['where_parking'];
        $b_information->location_address = $request->customer_location['loc_address'];
        $b_information->lat = $request->customer_location['lat'];
        $b_information->lng = $request->customer_location['long'];
        if( sizeof($request->screen2['questions'] ) > 0){
            $b_information->questions = json_encode( $request->screen2['questions']);
        }
        // $b_information->extras
        $b_information->save();

        $response = ['status' => '200' , 'message' => 'Booking created.'];
        return $response = $response;
    }
    public function validate_gift_card_details(Request $request){
        if($request->amount < 0 || $request->amount > 500){
            return response()->json([
                'status' => false,
                'message' => 'Amount Should be between R0.50 to $500.',
               
            ]);
        }
        $validator = Validator::make($request->all(), [
            'amount' => 'required ',
            'name' => 'required',
            
            'recipient_email' => 'required | email',
            'confirm_email' => 'required | email | same:recipient_email',
             'sender_name' => 'required',
             'delivery_date' => 'required',
             'message' => 'required',
             'sender_email' => 'required | email',
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
    
    public function update_customer_card(Request $request){

        $validator = Validator::make($request->all(), [
            'credit_card_number' => 'required',
            'cvc' => 'required',
            'expiry_month' => 'required',
            'expiry_year' => 'required',
            'card_holder_name' => 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()     
            ]);
        }
        try{
        $customer = Customer::where('id',$request->customer_id)->first();
        
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
          $stripe_customer = $stripe->customers->create([
            "email" => $customer->email,
            "source" =>  $token->id
        ]);
        // return $customer;e
        $customer->stripe_id = $stripe_customer->id;
        $customer->save();
        $customer_card = CustomerCard::where('customer_id',$customer->id)->first();
        if($customer_card){
            $customer_card->credit_card_number = $request->credit_card_number;
            $customer_card->expiry_month = $request->expiry_month;
            $customer_card->expiry_year = $request->expiry_year;
            $customer_card->cvc = $request->cvc;
            $customer_card->card_holder_name = $request->card_holder_name;
            $customer_card->save();
        }else{
            $customer_card = new CustomerCard();
            $customer_card->credit_card_number = $request->credit_card_number;
            $customer_card->expiry_month = $request->expiry_month;
            $customer_card->expiry_year = $request->expiry_year;
            $customer_card->cvc = $request->cvc;
            $customer_card->card_holder_name = $request->card_holder_name;
            $customer_card->customer_id = $customer->id;
            $customer_card->save();
        }
        return response()->json([
            'status' => true,
            'customer' => $customer,
            'message' => 'Customer Card Updated SuccessFully'
        ]);
        }catch(Exception $e){
            return response()->json([
                'status' => false,
                'message' => 'Card Validation Error - Please check you card details.',
                'errors' => $e     
            ]);
        }
    }

    public function order_gift_card(Request $request){
        
      

        $validator = Validator::make($request->all(), [
            'credit_card_number' => 'required|numeric',
            'cvc' => 'required|numeric',
            'expiry_month' => 'required|numeric',
            'expiry_year' => 'required|numeric',
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
        
        $charge = $stripe->charges->create(array(
            "amount" => 20*100,
            "currency" => "aud",
            "customer" => $customer
          ));

        if($charge){
            $payment = new Payment();
            $payment->amount = $request->amount;
            $payment->name = 'Gift card payment';
            $payment->name_on_card = $request->card_holder_name;
            $payment->card_number = $request->credit_card_number;
            $payment->cvc = $request->cvc;
            $payment->expiry_month = $request->expiry_month;
            $payment->expiry_year = $request->expiry_year;
            $payment->customer_stripe_id = $customer->id;
            $payment->stripe_response = json_encode($charge) ;
            $payment->save();

            $gift_card = new GiftCard();
            $gift_card->code =  Str::uuid()->toString();
            $gift_card->amount = $request->amount;
            $gift_card->usage = 0;
            $gift_card->recipient_name = $request->name;
            $gift_card->recipient_email = $request->recipient_email;
            $gift_card->sender_name = $request->sender_name;
            $gift_card->sender_email = $request->sender_email;
            $gift_card->payment_id = $payment->id;
            $gift_card->delivery_date = $request->delivery_date;
            $gift_card->message = $request->message;
            
           

            $data = $gift_card;

            $today = date("Y-m-d");
            $expire =$request->delivery_date; //from database
    
            $today_time = strtotime($today);
            $expire_time = strtotime($expire);
    
            Mail::to($gift_card->sender_email)->send(new SenderGiftCardMail($data));
            if ($expire_time < $today_time){
                $gift_card->email_status = 1;
                Mail::to($gift_card->recipient_email)->send(new RecipientGiftCardMail($data));
            }
             $gift_card->save();
            return response()->json([
                'status' => true,
                'message' => 'Gift Card Purchased successfully.',
                
            ]);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Card Validation Error - Please check you card details.', 
            ]);
        }
        
        

        }catch(Exception $e){
            return response()->json([
                'status' => false,
                'message' => 'Card Validation Error - Please check you card details.',
                'errors' => $e     
            ]);
        }
    }
    public function validate_select_service(Request $request){
        $validator = Validator::make($request->all(), [
            'service_id' => 'required',
            'date' => 'required',
            'time' => 'required',
            'service_type' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()     
            ]);
        
        }
        $today = date("Y-m-d");

        $today_time = strtotime($today);
        $expire_time = strtotime($request->date);

        if($expire_time < $today_time){
            return response()->json([
                'status' => false,
                'message' => 'Chosen date has already passed. ',
            ]);
        }
        
        return response()->json([
            'status' => true,
            'message' => 'Validation Success',
        ]);  
    }

    public function get_information_content(Request $request)
    {
       $settings = [];
       $questions = [];
       $category = Category::find($request->id);
       if($category->residential_type == 1){
        $settings = Setting::find(1);
         
       }else{
           $questions = Question::where('category_id',$request->id)->get();
       }
       $extras = ServiceExtra::where('category_id',$request->id)->get();
       if(sizeof($extras) > 0){
        foreach($extras as $ex){
            $ex->quantity = 0;
        }

       }
       $response = ['category' => $category , 'settings' => $settings , 'questions' => $questions , 
        'extras' => $extras    
    ];
       return $response;
    }

    public function get_customer_card(Request $request){
        $customer_card = CustomerCard::where('customer_id',$request->id)->first();
        if($customer_card){
            $response = ['status' => 200 , 'customer_card' => $customer_card];
            return $response;
        }else{
            $response = ['status' => 404];
            return $response;
        }
    }
    public function image_upload(Request $request){
        try{
            if ($request->hasFile('file')) {
                $file = $request->file;
                $filename = $file->getClientOriginalName();
                $image = date('His') . $filename;
                $destination_path = public_path() . '/images/';
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
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
