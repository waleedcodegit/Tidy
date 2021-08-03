<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\City;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $city = City::with('state_name')->get();
        $response = [
            'status' => 200,
            'cities' => $city
        ];
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
            'name' => 'required',
            'state_id' => 'required'  
        ]);
        if($validator->fails()){
            $response = [
                'status' => 219,
                'msg' => $validator->errors()->first(), 
                'errors' => $validator->errors()
            ];
            return $response;
        }else{
            $city = new City();
            $city->name = $request->name;
            $city->state_id = $request->state_id;
            $city->lat = $request->lat;
            $city->long = $request->long;
            $city->save();
            $response = [
                'status' => 200,
                'msg' => 'City added successfully', 
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
        $city = City::where('id', $id)->first();
        $response = [
            'status' => 200,
            'cities' => $city
        ];
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
            'id' => 'required',
            'name' => 'required',
            'state_id' => 'required',
        ]);
        if($validator->fails()){
            $response = [
                'status' => 219,
                'msg' => $validator->errors()->first(), 
                'errors' => $validator->errors()
            ];
            return $response;
        }else{
            $city = City::find($request->id);
            $city->name = $request->name;
            $city->state_id = $request->state_id;
            $city->lat = $request->lat;
            $city->long = $request->long;
            $city->save();
            $response = [
                'status' => 200 ,
                'msg' => 'City updated successfully.'
            ];
            return $response;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
        ]);
        if($validator->fails()){
            $response = [
                'status' => 219,
                'msg' => $validator->errors()->first(), 
                'errors' => $validator->errors()
            ];
            return $response;
        }else{
            // $c = City::find($request->id);
            // $c->is_deleted = 1;
            // $c->save();
            $response = ['status' => 200 ,
                'msg' => 'City deleted successfully.'];
            return $response;
        }
    }
}
