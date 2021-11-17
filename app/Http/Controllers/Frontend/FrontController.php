<?php

namespace App\Http\Controllers\Frontend;

use App\Booking;
use App\BookingInformation;
use App\BookingService;
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
use App\Email;
use App\Mail\BookingConfirmation;
use App\VendorBookingRequest;
use App\VendorLocation;
use App\VendorNotifications;
use App\Employee;
use App\ServiceCheck;
use App\ServiceRound;
use App\VendorQuote;
use App\Vendor;
use App\Mail\ContactusEmail;
use Twilio\Rest\Client;
use App\Complaint;
use App\VendorPayment;
use App\VendorWallet;

use Illuminate\Support\Facades\DB;

class FrontController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendMessage($message, $recipients)
    {
        $account_sid = getenv("TWILIO_SID");
        $auth_token = getenv("TWILIO_AUTH_TOKEN");
        $twilio_number = getenv("TWILIO_NUMBER");
        $client = new Client($account_sid, $auth_token);
        $client->messages->create($recipients, ['from' => $twilio_number, 'body' => $message]);
    }
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
            $response = ['service' => $service , 'extra_total' => $extra_total , 'total' => $extra_total ];
            return $response;
        }
    }
    public function send_vendor_booking_requests($latitude,$longitude,$booking_id){
        
        $vendor_locations = VendorLocation::selectRaw("id, vendor_id, address, lat, lng,radius,
                                    ( 6371 * acos( cos( radians(?) ) *
                                    cos( radians( lat ) )
                                    * cos( radians( lng ) - radians(?)
                                    ) + sin( radians(?) ) *
                                    sin( radians( lat ) ) )
                                    ) AS distance ", [$latitude, $longitude , $latitude])
                        
                            // ->having("distance", "<=", "vendors_locations.radius")
                            ->with('vendor')
                            ->orderBy("distance",'asc')
                            ->get();
        $vls = [];
        $five_star_ratings = [];
        $four_star_ratings = [];
        $three_star_ratings = [];
        $low_star_ratings = [];
        $new_vendors = [];

        if(sizeof($vendor_locations) > 0){
            foreach($vendor_locations as $vl){
                if($vl->distance <= $vl->radius){
                    array_push($vls,$vl);
                    
                    if($vl->vendor){
                        if($vl->vendor['ratings'] > 4){
                            array_push($five_star_ratings,$vl);
                        }else if($vl->vendor->ratings > 3 && $vl->vendor->ratings <= 4 ){
                            array_push($four_star_ratings,$vl);
                        }else if($vl->vendor->ratings > 2 && $vl->vendor->ratings <= 3 ){
                            array_push($three_star_ratings,$vl);
                        }else if($vl->vendor->ratings >= 1 && $vl->vendor->ratings <= 2 ){
                            array_push($low_star_ratings,$vl);
                        }else{
                            array_push($new_vendors,$vl);
                        }
                    }
                   
                }
            }
        }
        $booking = Booking::where('id',$booking_id)->first();
        if($booking->vendor_status == 0){
            if(sizeof($five_star_ratings ) > 0){
                foreach($five_star_ratings as $fr){
                    $vbr = new VendorBookingRequest();
                    $vbr->vendor_id = $fr->vendor_id;
                    $vbr->booking_id = $booking_id;
                    $vbr->save();

                    $vn = new VendorNotifications();
                    $vn->vendor_id = $fr->vendor_id;
                    $vn->title = 'You got a new booking request.';
                    $vn->message = 'Please check you new booking feed.';
                    $vn->link = '/vendor/bookings-feed';
                    $vn->save();
                }
            }else if(sizeof($four_star_ratings ) > 0){
                foreach($four_star_ratings as $fr){
                    $vbr = new VendorBookingRequest();
                    $vbr->vendor_id = $fr->vendor_id;
                    $vbr->booking_id = $booking_id;
                    $vbr->save();

                    $vn = new VendorNotifications();
                    $vn->vendor_id = $fr->vendor_id;
                    $vn->title = 'You got a new booking request.';
                    $vn->message = 'Please check you new booking feed.';
                    $vn->link = '/vendor/bookings-feed';
                    $vn->save();
                }
            }else if(sizeof($three_star_ratings ) > 0){
                foreach($three_star_ratings as $fr){
                    $vbr = new VendorBookingRequest();
                    $vbr->vendor_id = $fr->vendor_id;
                    $vbr->booking_id = $booking_id;
                    $vbr->save();

                    $vn = new VendorNotifications();
                    $vn->vendor_id = $fr->vendor_id;
                    $vn->title = 'You got a new booking request.';
                    $vn->message = 'Please check you new booking feed.';
                    $vn->link = '/vendor/bookings-feed';
                    $vn->save();
                }
            }else if(sizeof($low_star_ratings ) > 0){
                foreach($low_star_ratings as $fr){
                    $vbr = new VendorBookingRequest();
                    $vbr->vendor_id = $fr->vendor_id;
                    $vbr->booking_id = $booking_id;
                    $vbr->save();

                    $vn = new VendorNotifications();
                    $vn->vendor_id = $fr->vendor_id;
                    $vn->title = 'You got a new booking request.';
                    $vn->message = 'Please check you new booking feed.';
                    $vn->link = '/vendor/bookings-feed';
                    $vn->save();
                }
            }
            if(sizeof($new_vendors ) > 0){
                foreach($new_vendors as $fr){
                    $vbr = new VendorBookingRequest();
                    $vbr->vendor_id = $fr->vendor_id;
                    $vbr->booking_id = $booking_id;
                    $vbr->save();

                    $vn = new VendorNotifications();
                    $vn->vendor_id = $fr->vendor_id;
                    $vn->title = 'You got a new booking request.';
                    $vn->message = 'Please check you new booking feed.';
                    $vn->link = '/vendor/bookings-feed';
                    $vn->save();
                }
            }
           
        }
        $response = ['status' => 200 , 'five_star' => $five_star_ratings , 'four' => $four_star_ratings , 'three' => $three_star_ratings , 
            'low' => $low_star_ratings, 'new' => $new_vendors , 'all' => $vls  
    ];
        return $response;
    }
    public function complete_service(Request $request){
        $service = BookingService::where('id',$request->service_id)->first();
        $settings = Setting::where('id',1)->first();
        $vendor = Vendor::where('id',$request->vendor_id)->first();

        $admin_commission = $service->total_price / 100 * $settings->admin_comission;
        $vendor_payment = $service->total_price - $admin_commission;

        $vendor_new_payment = new VendorPayment();
        $vendor_new_payment->date = $service->date;
        $vendor_new_payment->vendor_id = $vendor->id;
        $vendor_new_payment->payment_id = $service->payment_id;
        $vendor_new_payment->service_id = $service->id;
        $vendor_new_payment->payment = $vendor_payment;
        $vendor_new_payment->save();

        $wallet = VendorWallet::where('vendor_id',$service->id)->first();
        $wallet->wallet = $wallet->wallet + $vendor_payment;
        $wallet->save();
        $response = [
            'status' => 200 , 
            'message' => 'Service Completed Suucessfully'
        ];
        return $response;

    }
    public function charge_a_customer(Request $request){

        $customer = Customer::where('id',$request->id)->first();
        try{
        $stripe = new \Stripe\StripeClient(
            env("STRIPE_SK")
          );
        $charge = $stripe->charges->create(array(
            "amount" => 20*100,
            "currency" => "usd",
            "customer" => $customer->stripe_id
          ));
        }catch(\Stripe\Exception\CardException $e){
           
        }
          return $charge;

    }
    public function create_service($booking){
        $service = Category::where('id',$booking->service_id)->first();
        $customer = Customer::where('id',$booking->customer_id)->first();

        try{
            $stripe = new \Stripe\StripeClient(
                env("STRIPE_SK")
              );
            $charge = $stripe->charges->create(array(
                "amount" => $booking->booking_totals * 100,
                "currency" => "usd",
                "customer" => $customer->stripe_id
              ));
            }catch(\Stripe\Exception\CardException $e){
               
            }
            $payment_id = 0; 
            if($charge){
                $payment = new Payment();
                $payment->amount = $booking->booking_totals;
                $payment->name = 'Tidy Home Service Payment';
                $payment->customer_stripe_id = $customer->stripe_id;
                $payment->stripe_response = json_encode($charge) ;
                $payment->save();
                $payment_id = $payment->id;
            }

            if($booking->recurring_type == 5){
                if($booking->custom_days){
                    $custom_days = json_decode($booking->custom_days);
                    foreach($custom_days as $key => $cd){
                       if($cd->check){
                            $day_ = date('w');
                            if($key == $day_ ){
                                $date = date('Y-m-d'); 
                              
                            }else if($key > $day_){
                                $days = $key + $day_;
                                $date = date('Y-m-d', strtotime("+$days days"));
                            }
                            else if($key < $day_){
                                $days = $day_ - $key;
                                $date = date('Y-m-d', strtotime("+$days days"));
                            }
                            $service = new BookingService();
                            $service->booking_id = $booking->id;
                            $service->date = $date;
                            $service->time = $booking->time;
                            $service->total_price = $booking->booking_totals;
                            $service->round = 1;
                            $service->payment_id = $payment_id;
                            $service->payment_status = $payment_id != 0 ? 1 : 0;
                            $service->status = $payment_id != 0 ? 0 : 1;
                            $service->save();
                            $this->create_service_rounds($service);

                        }
                    }
                }
            }else{
                $service = new BookingService();
                $service->booking_id = $booking->id;
                $service->date = date('Y-m-d');
                $service->time = $booking->time;
                $service->total_price = $booking->booking_totals;
                $service->round = 1;
                $service->payment_id = $payment_id;
                $service->payment_status = $payment_id != 0 ? 1 : 0;
                $service->status = $payment_id != 0 ? 0 : 1;
                $service->save();
                $this->create_service_rounds($service);

            }
    }
    public function create_services_daily(){
        
        $bookings = Booking::where('booking_type',2)->where('status',1)->get();
        if(sizeof($bookings)){
            foreach($bookings as $booking){
                $booking = Booking::where('id',$booking->id)->first();
                if($booking->booking_type == 2){
                    if($booking->recurring_type == 1){
                        // Daily Recurring
                        if($booking->nsd == date('Y-m-d' , strtotime('+7 days'))){
                            $booking->nsd = date('Y-m-d', strtotime('+1 days'));
                            $booking->save();
                            $this->create_service($booking);
                        }
                        
                    }
                    else if($booking->recurring_type == 2){
                        // Weekly Recurring
                        if($booking->nsd == date('Y-m-d' , strtotime('+7 days'))){
                        
                            $booking->nsd = date('Y-m-d', strtotime('+7 days'));
                            $booking->save();
                            $this->create_service($booking);
                        }
                    }
                    else if($booking->recurring_type == 3){
                        // Fornightly Recurring
                        if($booking->nsd == date('Y-m-d' , strtotime('+7 days'))){
                            $this->create_service($booking);
                        $booking->nsd = date('Y-m-d', strtotime('+14 days'));
                        $booking->save();
                        }
                    }
                    else if($booking->recurring_type == 4){
                        // Monthly Recurring
                        if($booking->nsd == date('Y-m-d' , strtotime('+7 days'))){
                            $this->create_service($booking);
                        $booking->nsd = date('Y-m-d', strtotime('+1 months'));
                        $booking->save();
                        }
                    }
                    else if($booking->recurring_type == 5){
                        // Custom Recurring
                        if($booking->custome_type == 1){
                            // Weekly Recurring
                            if($booking->nsd == date('Y-m-d' , strtotime('+7 days'))){
                                $this->create_service($booking);
                            $booking->nsd = date('Y-m-d', strtotime('+7 days'));
                            $booking->save();
                            }
                        }
                        else if($booking->custome_type == 2){
                            // Fornightly Recurring
                            if($booking->nsd == date('Y-m-d' , strtotime('+7 days'))){
                                $this->create_service($booking);
                            $booking->nsd = date('Y-m-d', strtotime('+14 days'));
                            $booking->save();
                            }
                        }
                        else if($booking->recurring_type == 3){
                            // Monthly Recurring
                            if($booking->nsd == date('Y-m-d' , strtotime('+7 days'))){
                                $this->create_service($booking);
                            $booking->nsd = date('Y-m-d', strtotime('+1 months'));
                            $booking->save();
                            }
                        }
                    }
                }
            }
        }   
    }
    public function create_service_rounds($service){
        $service_round = new ServiceRound();
        $service_round->service_id = $service->id;
        $service_round->check_list = json_encode(ServiceCheck::all());
        $service_round->save();
    }
    public function make_booking(Request $request){

        // return $this->send_vendor_booking_requests($request->customer_location['lat'],$request->customer_location['long']);

        //return $request;
        $customer = Customer::where('id',$request->customer['data']['id'])->first();
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

        $service = Category::where('id',$request->select_service_state['service_id'])->first();

        if($service->residential_type == 1){
            $charge = false;
            
            try{
                $stripe = new \Stripe\StripeClient(
                    env("STRIPE_SK")
                  );
                $charge = $stripe->charges->create(array(
                    "amount" => $booking->booking_totals * 100,
                    "currency" => "usd",
                    "customer" => $customer->stripe_id
                  ));
                }catch(\Stripe\Exception\CardException $e){
                    // $response = ['status' => '401' , 'message' => 'Unable to charge','exception' => $e];
                    // return $response = $response;
                }
                $payment_id = 0; 
                if($charge){
                    $payment = new Payment();
                    $payment->amount = $booking->booking_totals;
                    $payment->name = 'Tidy Home Service Payment';
                    $payment->customer_stripe_id = $customer->stripe_id;
                    $payment->stripe_response = json_encode($charge) ;
                    $payment->save();
                    $payment_id = $payment->id;
                }

               
                if($booking->booking_type == 2 && $booking->recurring_type == 5){
                    if($booking->custom_days){
                        $custom_days = json_decode($booking->custom_days);
                        foreach($custom_days as $key => $cd){
                           if($cd->check){
                                $day_ = date('w');
                                if($key == $day_ ){
                                    $date = $booking->date; 
                                }else if($key > $day_){
                                    $days = $key + $day_;
                                    $date = date('Y-m-d', strtotime($days , strtotime($booking->date)));

                                }
                                else if($key < $day_){
                                    $days = $day_ - $key;
                                    $date = date('Y-m-d', strtotime($days , strtotime($booking->date)));
                                }
                                $service = new BookingService();
                                $service->booking_id = $booking->id;
                                $service->date = $date;
                                $service->time = $booking->time;
                                $service->total_price = $booking->booking_totals;
                                $service->round = 1;
                                $service->payment_id = $payment_id;
                                $service->payment_status = $payment_id != 0 ? 1 : 0;
                                $service->status = $payment_id != 0 ? 0 : 1;
                                $service->save();
                                $this->create_service_rounds($service);
                            }
                        }
                    }
                   
                } 
                // else
                //  if($booking->booking_type == 2 && $booking->recurring_type == 1){
                //     $i = 1;
                //     while($i < 8){
                //         $service = new BookingService();
                //         $service->booking_id = $booking->id;
                //         $service->date = date('Y-m-d', strtotime($i, strtotime($booking->date)));
                //         $service->time = $booking->time;
                //         $service->total_price = $booking->booking_totals;
                //         $service->round = 1;
                //         $service->payment_id = $payment_id;
                //         $service->payment_status = $payment_id != 0 ? 1 : 0;
                //         $service->status = $payment_id != 0 ? 0 : 1;
                //         $service->save();
                //         $this->create_service_rounds($service);

                //         $i++;
                //     }
                // }
                 else {
                    $service = new BookingService();
                    $service->booking_id = $booking->id;
                    $service->date = $booking->date;
                    $service->time = $booking->time;
                    $service->total_price = $booking->booking_totals;
                    $service->round = 1;
                    $service->payment_id = $payment_id;
                    $service->payment_status = $payment_id != 0 ? 1 : 0;
                    $service->status = $payment_id != 0 ? 0 : 1;
                    $service->save();
                    $this->create_service_rounds($service);

                }
                
                if($booking->booking_type == 2){
                    if($booking->recurring_type == 1){
                        // Daily Recurring
                      
                        $booking->nsd = date('Y-m-d', strtotime('+1 days' , strtotime($booking->date)));
                        $booking->save();
                    }
                    else if($booking->recurring_type == 2){
                        // Weekly Recurring
                        $booking->nsd = date('Y-m-d', strtotime('+7 days' , strtotime($booking->date)));
                        $booking->save();
                    }
                    else if($booking->recurring_type == 3){
                        // Fornightly Recurring
                        $booking->nsd = date('Y-m-d', strtotime('+14 days' , strtotime($booking->date)));
                        $booking->save();
                    }
                    else if($booking->recurring_type == 4){
                        // Monthly Recurring
                        $booking->nsd = date('Y-m-d', strtotime('+1 months' , strtotime($booking->date)));
                        $booking->save();
                    }
                    else if($booking->recurring_type == 5){
                        // Custom Recurring
                        if($booking->custome_type == 1){
                            // Weekly Recurring
                            $booking->nsd = date('Y-m-d', strtotime('+7 days' , strtotime($booking->date)));
                            $booking->save();
                        }
                        else if($booking->custome_type == 2){
                            // Fornightly Recurring
                            $booking->nsd = date('Y-m-d', strtotime('+14 days' , strtotime($booking->date)));
                            $booking->save();
                        }
                        else if($booking->recurring_type == 3){
                            // Monthly Recurring
                            $booking->nsd = date('Y-m-d', strtotime('+1 months' , strtotime($booking->date)));
                            $booking->save();
                        }
                    }
                }

        }

        $emails = Email::where('id', 12)->first();
        $C_name = $request->customer['data']['first_name'];
        $C_email = $request->customer['data']['email'];

        $Ch_service = $request->select_service_state['service_id'];
        $service_name = Category::where('id' , $Ch_service)->first();
        if($emails){
            $content = str_replace('[Customer name]', $C_name , $emails->email_content);
            $content = str_replace('[date]', $booking->date , $content);
            $content = str_replace('[Client Address]', $b_information->location_address , $content);
            $content = str_replace('[time]', $booking->time , $content);
            $content = str_replace('[Chosen service]', $service_name->name , $content);
            $content = str_replace('[Visit your dashboard]', url('/vendor/dashboard') , $content );
            Mail::to($C_email)->send(new BookingConfirmation($emails , $content));
        }else{
            return $emails; 
        }

        $response = ['status' => '200' , 'message' => 'Booking created.'];
        return $response = $response;
    }

    public function accept_vednor_request(Request $request){
        $quote = VendorQuote::where('id',$request->quote_id)->first();
        $booking = Booking::where('id',$quote->booking_id)->first();
        $customer = Customer::where('id',$booking->customer_id)->first();

        $booking->booking_totals = $quote->quote;
        $booking->vendor_id = $quote->vendor_id;
        $booking->vendor_status = 1;
        $booking->status = 1;
        $booking->save();

        $charge = false;
            
        try{
            $stripe = new \Stripe\StripeClient(
                env("STRIPE_SK")
              );
            $charge = $stripe->charges->create(array(
                "amount" => $booking->booking_totals * 100,
                "currency" => "usd",
                "customer" => $customer->stripe_id
              ));
            }catch(\Stripe\Exception\CardException $e){
                // $response = ['status' => '401' , 'message' => 'Unable to charge','exception' => $e];
                // return $response = $response;
            }
            $payment_id = 0; 
            if($charge){
                $payment = new Payment();
                $payment->amount = $booking->booking_totals;
                $payment->name = 'Tidy Home Service Payment';
                $payment->customer_stripe_id = $customer->stripe_id;
                $payment->stripe_response = json_encode($charge) ;
                $payment->save();
                $payment_id = $payment->id;
            }
            if($booking->booking_type == 2 && $booking->recurring_type == 5){
                if($booking->custom_days){
                    $custom_days = json_decode($booking->custom_days);
                    foreach($custom_days as $key => $cd){
                       if($cd->check){
                            $day_ = date('w');
                            if($key == $day_ ){
                                $date = $booking->date; 
                            }else if($key > $day_){
                                $days = $key + $day_;
                                $date = date('Y-m-d', strtotime($days , strtotime($booking->date)));

                            }
                            else if($key < $day_){
                                $days = $day_ - $key;
                                $date = date('Y-m-d', strtotime($days , strtotime($booking->date)));
                            }
                            $service = new BookingService();
                            $service->booking_id = $booking->id;
                            $service->date = $date;
                            $service->time = $booking->time;
                            $service->total_price = $booking->booking_totals;
                            $service->round = 1;
                            $service->payment_id = $payment_id;
                            $service->payment_status = $payment_id != 0 ? 1 : 0;
                            $service->status = $payment_id != 0 ? 0 : 1;
                            $service->save();
                            $this->create_service_rounds($service);
                        }
                    }
                }
               
            } 
            
             else {
                $service = new BookingService();
                $service->booking_id = $booking->id;
                $service->date = $booking->date;
                $service->time = $booking->time;
                $service->total_price = $booking->booking_totals;
                $service->round = 1;
                $service->payment_id = $payment_id;
                $service->payment_status = $payment_id != 0 ? 1 : 0;
                $service->status = $payment_id != 0 ? 0 : 1;
                $service->save();
                $this->create_service_rounds($service);

            }
            
            if($booking->booking_type == 2){
                if($booking->recurring_type == 1){
                    // Daily Recurring
                  
                    $booking->nsd = date('Y-m-d', strtotime('+1 days' , strtotime($booking->date)));
                    $booking->save();
                }
                else if($booking->recurring_type == 2){
                    // Weekly Recurring
                    $booking->nsd = date('Y-m-d', strtotime('+7 days' , strtotime($booking->date)));
                    $booking->save();
                }
                else if($booking->recurring_type == 3){
                    // Fornightly Recurring
                    $booking->nsd = date('Y-m-d', strtotime('+14 days' , strtotime($booking->date)));
                    $booking->save();
                }
                else if($booking->recurring_type == 4){
                    // Monthly Recurring
                    $booking->nsd = date('Y-m-d', strtotime('+1 months' , strtotime($booking->date)));
                    $booking->save();
                }
                else if($booking->recurring_type == 5){
                    // Custom Recurring
                    if($booking->custome_type == 1){
                        // Weekly Recurring
                        $booking->nsd = date('Y-m-d', strtotime('+7 days' , strtotime($booking->date)));
                        $booking->save();
                    }
                    else if($booking->custome_type == 2){
                        // Fornightly Recurring
                        $booking->nsd = date('Y-m-d', strtotime('+14 days' , strtotime($booking->date)));
                        $booking->save();
                    }
                    else if($booking->recurring_type == 3){
                        // Monthly Recurring
                        $booking->nsd = date('Y-m-d', strtotime('+1 months' , strtotime($booking->date)));
                        $booking->save();
                    }
                }
            }
    }
    public function get_customer_bookings(Request $request){
        $bookings = Booking::where('customer_id',$request->customer_id)->with('service','sub_service')->get();
        if($bookings){
            $response = ['status' => '200' , 'bookings' => $bookings];
            return $response = $response;
        }else{
            $response = ['status' => '404' ];
            return $response = $response;
        }
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

    public function validate_gift_card_details(Request $request){
        if($request->amount < 10 || $request->amount > 500){
            return response()->json([
                'status' => false,
                'message' => 'Amount Should be between $10 to $500.',
            
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
            'email' => $customer->email,
            'source' =>  $token->id
        ]);
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
            'message' => 'Customer Card Updated SuccessFully',
            'stripe_customer' => $stripe_customer
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

    public function get_vendor_quotes(Request $request){
        $quotes = VendorQuote::where('booking_id',$request->id)->with('vendor')->orderby('quote','desc')->limit(3)->get();
        return response()->json([
            'message' => "Vendor Quotes",
            'data' => $quotes,
        ]);
    }


  public function get_checklists(){
        $checklists = ServiceCheck::where('delete_status',0)->get();
        return response()->json([
            'message' => "Checklists",
            'data' => $checklists,
        ]);
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

    public function get_booking_by_id(Request $request){
        $bookings = Booking::where('id',$request->id)->with('service','sub_service','booking_services','vendor')->first();
        $bookings->information = BookingInformation::where('booking_id', $request->id)->first();
        //$bookings->vendor_qoutes = VendorQuote::where('booking_id',$bookings->id)->with('vendor')->orderby('quote','desc')->limit(3)->get();
        $bookings = Booking::where('id',$request->id)->with('service','sub_service','information','booking_services','vendor')->first();
        return response()->json([
            'message' => "Bookings",
            'data' => $bookings,
        ]);
    }
    public function get_service_by_id(Request $request){
        $category = Category::where('id',$request->id)->with('subcategory')->first();
        //$bookings->vendor_qoutes = VendorQuote::where('booking_id',$bookings->id)->with('vendor')->orderby('quote','desc')->limit(3)->get();
        return response()->json([
            'message' => "Category",
            'category' => $category,
        ]);
    }

    public function service_details(Request $request){
        $bookings = BookingService::where('id',$request->id)->with('booking')->first();
        $bookings->booking_information = BookingInformation::where('booking_id',$bookings->booking_id)->first();
        $bookings->vendor_info = Vendor::where('id',$bookings->booking['vendor_id'])->first();
        $s_round = ServiceRound::where('service_id',$request->id)->get();
        $complaints = Complaint::where('service_id' , $request->id)->get();
        return response()->json([
            'message' => "Bookings and ServiceRounds",
            'data' => $bookings,
            'serviceRounds' => $s_round,
            'complaints' => $complaints
        ]);
    }

    public function update_checklist(Request $request){
        $checklist = ServiceRound::where('service_id',$request->id)->first();
        $checklist->check_list = json_encode($request->updatedChecklist);
        $checklist->save();
    }

    public function start_service(Request $request){
        $st_service = ServiceRound::where('id',$request->id)->update([
            'start_time' => date('H:i:s'),
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Service Started Successfully'
        ];
        return $response;
    }

    public function end_service(Request $request){

        $end_service = ServiceRound::where('id',$request->id)->update([
            'end_time' => date('H:i:s'),
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Service Ended Successfully'
        ];
        return $response;
    }

    public function complaint_round($complain){
        $service_round_two = BookingService::where('id',$complain->service_id)->first();
        $service_round_two -> round=(int) $service_round_two->round+1;
        $service_round_two -> save();


        $service_round = new ServiceRound();
        $service_round->service_id = $complain->service_id;
        $service_round->round = $service_round_two -> round; 
        $service_round->check_list = json_encode(ServiceCheck::all());
        $service_round->save();
    }

    public function submit_complain(Request $request){
        if($request->checkBox == true)
        {
            $complain = new Complaint();
            $complain->service_id = $request->id;
            $complain->complaints = $request->complain;
            $complain->save();
            $this->complaint_round($complain);
        }else{
            $complain = new Complaint();
            $complain->service_id = $request->id;
            $complain->complaints = $request->complain;
            $complain->save();
        }
        return response()->json([
            'status' => 200,
            'message' => "Complaint Submitted Successfully",
            'data' => $complain,
        ]);
    }
    
    public function upload_service_images(Request $request){
        $url = 'noimage.png';
        try{
            if ($request->hasFile('file')) {
                $file = $request->file;
                $filename = $file->getClientOriginalName();
                $image = date('His') . $filename;
                $destination_path = public_path() . '/images/';
                $file->move($destination_path, $image);
                $url = $image;
                $service = BookingService::where('id',$request->service_id)->first();
                $sr = ServiceRound::where('service_id',$request->service_id)->where('round',$service->round)->first();
                if($request->type == 'b'){
                    $bi = $sr->before_images == null ? [] : json_decode($sr->before_images);
                    array_push($bi,$url);
                    $sr->before_images = json_encode($bi);
                    $sr->save();
                }else if($request->type == 'a'){
                    $ai = $sr->after_images == null ? [] : json_decode($sr->after_images);
                    array_push($ai,$url);
                    $sr->after_images = json_encode($ai);
                    $sr->save(); 
                }
                $response = [
                    'status' => 200 , 
                    'msg' =>'File Uploaded.','url' => $url , 
                    'service_round' =>  $sr];
                return $response;
            }
            
        }catch(Exception $e){
            $response = [
                'status' => 401 , 
                'msg' => 'Error in File Uploaded.',
                'error' => $e];
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
    public function service_details_by_id(Request $request){
        $bookings = BookingService::where('id',$request->id)->with('booking')->first();
        $s_round = ServiceRound::where('service_id',$request->id)->first();
        return response()->json([
            'message' => "Service Details",
            'data' => $bookings,
            'serviceRounds' => $s_round
        ]);
    }
    public function send_contectus_email(Request $request) {
        $validator = Validator::make($request->all(), [
            'sender_name' => 'required',
            'sender_email' => 'required',
            'sender_phone' => 'required',
            'message' => 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()     
            ]);
        }
        $details =[
            'name' => $request->sender_name,
            'email' => $request->sender_email,
            'phone' => $request->sender_phone,
            'message' => $request->message,
        ];
        Mail::to("info@tidyhome.com.au")->send(new ContactusEmail($details));
        $response = [
            'status' => 200,
            'msg' => 'Email Send',
        ];
        return $response;
    }
}
