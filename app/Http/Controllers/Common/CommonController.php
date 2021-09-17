<?php

namespace App\Http\Controllers\Common;

use App\CustomerChat;
use App\CustomerMessage;
use App\CustomerVendorChats;
use App\CustomerVendorMessage;
use App\Http\Controllers\Controller;
use App\VendorChat;
use App\VendorMessage;
use Illuminate\Http\Request;
use \Pusher\Pusher;

class CommonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function pusher_auth(Request $request,$id){
        $socketid = $request->socket_id;
        $channelName = $request->channel_name;

        $pusher = new Pusher('3c05605319c17caeddab','c2ecac16949acb291f76','1244695',[
            'cluster' => 'ap4',
            'encrypted' => 'true'
        ]);
        $presence_data = ['name' => 'n'];
        $key = $pusher->presence_auth($channelName,$socketid,$id,$presence_data);
            
        return response($key);
    }

    public function vendor_message_sender(Request $request){
        $vendor_chat = VendorChat::where('vendor_id',$request->vendor_id)->first();
        if(!$vendor_chat){
            $vendor_chat = new VendorChat();
            $vendor_chat->vendor_id = $request->vendor_id;
            $vendor_chat->last_active = date("Y-m-d h:i:sa");
            $vendor_chat->save();
        }else{
            $vendor_message = new VendorMessage();
            $vendor_message->sender = $request->sender;
            $vendor_message->chat_id = $vendor_chat->id;
            $vendor_message->message = $request->message;
            $vendor_message->time = date("h:i:sa");
            $vendor_message->date = date("d-m-Y");
            $vendor_message->save();

            $vendor_chat =  VendorChat::where('id',$vendor_chat->id)->first();
            $vendor_chat->last_active = date("Y-m-d h:i:sa");
            $vendor_chat->last_msg_id = $vendor_message->id;
            $vendor_chat->save();
        }
        $response = ['status' => 200 , 'message' => 'Message Sent'];
        return $response;
    }

    public function get_vendor_messages(Request $request){
        $vendor_chat = VendorChat::where('vendor_id',$request->vendor_id)->first();
        if($vendor_chat){
            $vendor_messages = VendorMessage::where('chat_id',$vendor_chat->id)->get();
            $response = ['status' => 200 , 'messages' => $vendor_messages , 'chat' => $vendor_chat];
            return $response;
        }else{
            $response = ['status' => 404 , 'message' => 'Message Are not existed'];
            return $response;
        }
    }

    public function get_vendor_chat_messages(Request $request){
        $vendor_chat = VendorChat::where('id',$request->chat_id)->first();
        if($vendor_chat){
            $vendor_messages = VendorMessage::where('chat_id',$vendor_chat->id)->get();
            $response = ['status' => 200 , 'messages' => $vendor_messages];
            return $response;
        }else{
            $response = ['status' => 404 , 'message' => 'Message Are not existed'];
            return $response;
        }
    }
    public function get_vendor_chats(Request $request){
        $vendor_chats = VendorChat::join('vendors','vendors.id','=','vendor_chats.vendor_id')
        ->select('vendor_chats.id','vendor_chats.vendor_id','vendor_chats.last_active','vendors.first_name'
        ,'vendors.last_name','vendors.email','vendors.business_name'
        )
        ->get();
        return $vendor_chats;
    }

    public function customer_message_sender(Request $request){
        $customer_chat = CustomerChat::where('customer_id',$request->customer_id)->first();
        if(!$customer_chat){
            $customer_chat = new CustomerChat();
            $customer_chat->customer_id = $request->customer_id;
            $customer_chat->last_active = date("Y-m-d h:i:sa");
            $customer_chat->save();
        }else{
            $customer_message = new CustomerMessage();
            $customer_message->sender = $request->sender;
            $customer_message->chat_id = $customer_chat->id;
            $customer_message->message = $request->message;
            $customer_message->time = date("h:i:sa");
            $customer_message->date = date("d-m-Y");
            $customer_message->save();

            $customer_chat =  CustomerChat::where('id',$customer_chat->id)->first();
            $customer_chat->last_active = date("Y-m-d h:i:sa");
            $customer_chat->last_msg_id = $customer_message->id;
            $customer_chat->save();
        }
        $response = ['status' => 200 , 'message' => 'Message Sent'];
        return $response;
    }

    public function get_customer_messages(Request $request){
        $customer_chat = CustomerChat::where('customer_id',$request->customer_id)->first();
       
        if($customer_chat){
            $customer_messages = CustomerMessage::where('chat_id',$customer_chat->id)->get();
            $response = ['status' => 200 , 'messages' => $customer_messages , 'chat' => $customer_chat];
            return $response;
        }else{
            $response = ['status' => 404 , 'message' => 'Message Are not existed'];
            return $response;
        }
    }

    public function get_customer_chat_messages(Request $request){
        $customer_chat = CustomerChat::where('id',$request->chat_id)->first();
        if($customer_chat){
            $customer_messages = CustomerMessage::where('chat_id',$customer_chat->id)->get();
            $response = ['status' => 200 , 'messages' => $customer_messages];
            return $response;
        }else{
            $response = ['status' => 404 , 'message' => 'Message Are not existed'];
            return $response;
        }
    }
    public function get_customer_chats(Request $request){
        $vendor_chats = CustomerChat::join('customers','customers.id','=','customer_chats.customer_id')
        ->select('customer_chats.id','customer_chats.customer_id','customer_chats.last_active','customers.first_name'
        ,'customers.last_name','customers.email','customers.image'
        )
        ->get();
        return $vendor_chats;
    }

    // --------------------


    public function vendor_customer_message_sender(Request $request){

        $vendor_chat = CustomerVendorChats::where('id',$request->chat_id)->first();

        $vendor_message = new CustomerVendorMessage();
        $vendor_message->sender = $request->sender;
        $vendor_message->chat_id = $vendor_chat->id;
        $vendor_message->message = $request->message;
        $vendor_message->time = date("h:i:sa");
        $vendor_message->date = date("d-m-Y");
        $vendor_message->save();

        $vendor_chat =  VendorChat::where('id',$vendor_chat->id)->first();
            $vendor_chat->last_active = date("Y-m-d h:i:sa");
            $vendor_chat->last_msg_id = $vendor_message->id;
            $vendor_chat->save();
        $response = ['status' => 200 , 'message' => 'Message Sent'];
        return $response;
    }

    public function get_vendor_customer_messages(Request $request){
        $vendor_chat = CustomerVendorChats::where('customer_id',$request->customer_id)->where('booking_id',$request->booking_id)->first();
        if($vendor_chat){
            $vendor_messages = CustomerVendorMessage::where('chat_id',$vendor_chat->id)->get();
            $response = ['status' => 200 , 'messages' => $vendor_messages , 'chat' => $vendor_chat];
            return $response;
        }else{
            $response = ['status' => 404 , 'message' => 'Message Are not existed'];
            return $response;
        }
    }

    public function get_customer_vendor_chat_messages(Request $request){
        $vendor_chat = CustomerVendorChats::where('id',$request->chat_id)->first();
        if($vendor_chat){
            $vendor_messages = CustomerVendorMessage::where('chat_id',$vendor_chat->id)->get();
            $response = ['status' => 200 , 'messages' => $vendor_messages];
            return $response;
        }else{
            $response = ['status' => 404 , 'message' => 'Message Are not existed'];
            return $response;
        }
    }
    public function get_vendor_customer_chats(Request $request){
        $vendor_chats = CustomerVendorChats::join('vendors','vendors.id','=','vendor_chats.vendor_id')
        ->select('vendor_chats.id','vendor_chats.vendor_id','vendor_chats.last_active','vendors.first_name'
        ,'vendors.last_name','vendors.email','vendors.business_name'
        )
        ->get();
        return $vendor_chats;
    }

    public function customer_ven_message_sender(Request $request){
        $customer_chat = CustomerVendorChats::where('customer_id',$request->customer_id)->where('booking_id',$request->booking_id)->first();
        if(!$customer_chat){
            $customer_chat = new CustomerVendorChats();
            $customer_chat->customer_id = $request->customer_id;
            $customer_chat->vendor_id = $request->vendor_id;
            $customer_chat->booking_id = $request->booking_id;
            $customer_chat->last_active = date("Y-m-d h:i:sa");
            $customer_chat->save();
        }
        $customer_message = new CustomerVendorMessage();
        $customer_message->sender = $request->sender;
        $customer_message->chat_id = $customer_chat->id;
        $customer_message->message = $request->message;
        $customer_message->time = date("h:i:sa");
        $customer_message->date = date("d-m-Y");
        $customer_message->save();

        $customer_chat =  CustomerVendorChats::where('id',$customer_chat->id)->first();
        $customer_chat->last_active = date("Y-m-d h:i:sa");
        $customer_chat->last_msg_id = $customer_message->id;
        $customer_chat->save();
        $response = ['status' => 200 , 'message' => 'Message Sent'];
        return $response;
    }

    // public function get_customer_ven_messages(Request $request){
    //     $customer_chat = CustomerVendorChats::where('customer_id',$request->customer_id)->first();
       
    //     if($customer_chat){
    //         $customer_messages = CustomerMessage::where('chat_id',$customer_chat->id)->get();
    //         $response = ['status' => 200 , 'messages' => $customer_messages , 'chat' => $customer_chat];
    //         return $response;
    //     }else{
    //         $response = ['status' => 404 , 'message' => 'Message Are not existed'];
    //         return $response;
    //     }
    // }

    // public function get_customer_chat_messages(Request $request){
    //     $customer_chat = CustomerChat::where('id',$request->chat_id)->first();
    //     if($customer_chat){
    //         $customer_messages = CustomerMessage::where('chat_id',$customer_chat->id)->get();
    //         $response = ['status' => 200 , 'messages' => $customer_messages];
    //         return $response;
    //     }else{
    //         $response = ['status' => 404 , 'message' => 'Message Are not existed'];
    //         return $response;
    //     }
    // }
    // public function get_customer_chats(Request $request){
    //     $vendor_chats = CustomerChat::join('customers','customers.id','=','customer_chats.customer_id')
    //     ->select('customer_chats.id','customer_chats.customer_id','customer_chats.last_active','customers.first_name'
    //     ,'customers.last_name','customers.email','customers.image'
    //     )
    //     ->get();
    //     return $vendor_chats;
    // }

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
