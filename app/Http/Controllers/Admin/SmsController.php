<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\SmsTemplate;


class SmsController extends Controller
{
    
    public function index()
    {
        $sms = SmsTemplate::where('delete_status',0)->get();
        $response= ['status' => 200 ,
                'sms' => $sms];
        return $response;
    }

    public function create_sms(Request $request){
        
        $validator = Validator::make($request->all(), [
            'sms_title' => 'required',
            
            
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $sms = new SmsTemplate();
            $sms->sms_title = $request->sms_title;
            $sms->sms_content = $request->sms_content;
            
           
            
            $sms->save();
            $response = ['status' => 200 , 'msg' => 'SMS added.'];
            return $response;
        }
       

    }
    
    
    public function edit_sms(Request $request)
    {
        $sms = SmsTemplate::where('id', $request->id)->first();
        $response = [
            'status' => 200,
            'msg' => 'SMS',
            'data' =>  $sms
        ];
        return $response;
    }

    public function update(Request $request) {
        $sms = SmsTemplate::where('id', $request->id)->update([
            'sms_title' => $request->sms_title,
            'sms_content' => $request->sms_content
            
        ]);

        $response = [
            'status' => 200,
            'msg' => 'Updated Successfully'
        ];
        return $response;
    }

    public function delete_sms(Request $request) {
        
        $sms = SmsTemplate::where('id', $request->id)->update([
            'delete_status' => true,
           
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Successfully Deleted'
        ];
        return $response;
    }
}
