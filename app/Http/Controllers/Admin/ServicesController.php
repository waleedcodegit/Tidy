<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\ServiceContent;
use Illuminate\Http\Request;
use Validator;
class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create_services_content(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required',
            'service' => 'required',
            'description' => 'required',
            'included_text' => 'required',

        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }
        $ServiceContent = new ServiceContent();
        $ServiceContent->service_id = $request->service;
        $ServiceContent->image = $request->image;
        $ServiceContent->description = $request->description;
        $ServiceContent->included_text = $request->included_text;
        $ServiceContent->save();
        $response = ['status' => 200 , 'msg' => 'Success'];
            return $response;

    }
    public function update_services_content(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required',
            'service' => 'required',
            'description' => 'required',
            'included_text' => 'required',

        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }
        $ServiceContent = ServiceContent::where('id',$request->id)->first();
        $ServiceContent->service_id = $request->service;
        $ServiceContent->image = $request->image;
        $ServiceContent->description = $request->description;
        $ServiceContent->included_text = $request->included_text;
        $ServiceContent->save();
        $response = ['status' => 200 , 'msg' => 'Success'];
            return $response;

    }
    public function get_all_service_content (Request $request){
        $ServiceContent = ServiceContent::with('service')->get();
        return $ServiceContent;
    }
    public function get_service_content_by_id (Request $request){
        $ServiceContent = ServiceContent::where('id',$request->id)->first();
        return $ServiceContent;
    }

    public function delete_service_content (Request $request){
        $ServiceContent = ServiceContent::where('id',$request->id)->delete();
        return $ServiceContent;
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
