<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\UrlMeta;
use App\ServiceCheck;


class UrlMetasController extends Controller
{
    
    public function index()
    {
        $url = UrlMeta::where('delete_status',0)->get();
        $response= [
            'status' => 200 ,
            'url' => $url];
        return $response;
    }

    public function create_url_meta(Request $request){
        
        $validator = Validator::make($request->all(), [
            'path' => 'required',
            'title' => 'required',
            'description' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $url = new UrlMeta();
            $url->path = $request->path;
            $url->title = $request->title;
            $url->description = $request->description;
            $url->save();
            $response = ['status' => 200 , 'msg' => 'URL Added Successfully'];
            return $response;
        }
       

    }
    
    
    public function edit_url(Request $request)
    {
        $url = UrlMeta::where('id', $request->id)->first();
        $response = [
            'status' => 200,
            'msg' => 'URL',
            'data' =>  $url
        ];
        return $response;
    }

    public function update_url(Request $request) {
        $url = UrlMeta::where('id', $request->id)->update([
            'path' => $request->path,
            'title' => $request->title,
            'description' => $request->description
        ]);

        $response = [
            'status' => 200,
            'msg' => 'URL Updated Successfully'
        ];
        return $response;
    }

    public function delete_url(Request $request) {
        
        $url = UrlMeta::where('id', $request->id)->update([
            'delete_status' => true,
           
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Successfully Deleted'
        ];
        return $response;
    }
    public function create_service_check(Request $request){
        // return $request;
        
        $validator = Validator::make($request->all(), [
            'type' => 'required',
            'item' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $servicecheck = new ServiceCheck();
            $servicecheck->type = $request->type;
            $servicecheck->item = $request->item;
            $servicecheck->save();
            $response = ['status' => 200 , 'msg' => 'URL Added Successfully'];
            return $response;
        }
       

    }
    public function service_check_list(){
            $servicecheck = ServiceCheck::all();
            $response = [
                'status' => 200,
                'servicecheck' => $servicecheck
            ];
            return $response;
        }
        public function edit_service_check(Request $request)
        {
            $servicecheck = ServiceCheck::where('id', $request->id)->first();
            $response = [
                'status' => 200,
                'msg' => 'ServiceCheck',
                'data' =>  $servicecheck
            ];
            return $response;
        }
        public function update_service_check(Request $request) {
            $servicecheck = ServiceCheck::where('id', $request->id)->update([
                'type' => $request->type,
                'item' => $request->item,
            ]);
    
            $response = [
                'status' => 200,
                'msg' => 'Service Check Updated Successfully'
            ];
            return $response;
        }
        public function delete_service_check(Request $request) {
        
            $servicecheck = ServiceCheck::where('id', $request->id)->delete();
            $response = [
                'status' => 200,
                'msg' => 'Successfully Deleted'
            ];
            return $response;
        }
}

