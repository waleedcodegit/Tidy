<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Email;

class EmailsController extends Controller
{
    public function create_emails(Request $request){
        // return 1;
        $validator = Validator::make($request->all(), [
            'email_title' => 'required',
            // 'email_content' => 'required',
            // 'editor_content' => 'required'
            
            
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $email = new Email();
            $email->email_title = $request->email_title;
            $email->email_content = $request->email_content;
            
           
            
            $email->save();
            $response = ['status' => 200 , 'msg' => 'Email added.'];
            return $response;
        }
       

    }
   
    public function index()
    {
        $emails = Email::where('delete_status',0)->get();
        $response= ['status' => 200 ,
                'emails' => $emails];
        return $response;
    }
    public function delete_email(Request $request) {
        
        $EMAIL = Email::where('id', $request->id)->update([
            'delete_status' => true,
           
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Successfully Deleted'
        ];
        return $response;
    }
    public function edit_email(Request $request)
    {
        $email = Email::where('id', $request->id)->first();
        $response = [
            'status' => 200,
            'msg' => 'Email',
            'data' =>  $email
        ];
        return $response;
    }
    public function update(Request $request) {
        $email = Email::where('id', $request->id)->update([
            'email_title' => $request->email_title,
            'email_content' => $request->email_content
            
        ]);

        $response = [
            'status' => 200,
            'msg' => 'Updated Successfully'
        ];
        return $response;
    }
}
