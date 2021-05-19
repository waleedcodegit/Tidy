<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\ServicePricing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class ServicePricingController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ServicePricing = ServicePricing::with('category')->get();
        $response = ['status' => 200 ,
                'service_pricings' => $ServicePricing];
        return $response;
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
        $validator = Validator::make($request->all(), [
            'cat_id' => 'required',
            'title' => 'required',
            'price' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $new_service = new ServicePricing();        
            $new_service->cat_id = $request->cat_id;
            $new_service->title = $request->title;
            $new_service->price = $request->price;
            $new_service->save();
            $response = ['status' => 200 , 'msg' => 'Service added successfully' , 
                ];
            return $response;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $category = ServicePricing::find($request->id);
            $response = ['status' => 200 ,
                'category' => $category];
            return $response;
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $service = ServicePricing::with('category')->find($id);
        $response = ['status' => 200 ,
        'service_pricings' => $service];
        return $response;
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
        $validator = Validator::make($request->all(), [
            'cat_id' => 'required',
            'title' => 'required',
            'price' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            ServicePricing::where('id', $request->id)->update([
                'cat_id' => $request->cat_id,
                'title' => $request->title,
                'price' => $request->price
            ]);
            $response = ['status' => 200 ,
                'msg' => 'Service updated successfully.'];
            return $response;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $category = ServicePricing::find($request->id);
            $category->is_deleted = 1;
            $category->save();
            $response = ['status' => 200 ,
                'msg' => 'category deleted successfully.'];
            return $response;
        }
    }
}   
