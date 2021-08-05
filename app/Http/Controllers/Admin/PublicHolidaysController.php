<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\PublicHoliday;
use Illuminate\Support\Facades\Validator;

class PublicHolidaysController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $holidays = PublicHoliday::where('delete_status',0)->get();
        $response = ['status' => 200 ,
                'holidays' => $holidays];
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
            'title' => 'required',
            'date' => 'required',
            
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $p_holiday = new PublicHoliday();
            $p_holiday->title = $request->title;
            $p_holiday->date = $request->date;
            $p_holiday->save();
            $response = [
                'status' => 200,
                'msg' => 'Holiday added successfully', 
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
            $holiday = PublicHoliday::find($request->id);
            $response = [
                'status' => 200,
                'holiday' => $holiday
            ];
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
        $h = PublicHoliday::find($id);
        $response = [
            'status' => 200,
            'holiday' => $h
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
            'title' => 'required',
            'date' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $data = PublicHoliday::find($request->id);
            $data->title = $request->title;
            $data->date = $request->date;
            $data->save();
            $response = [
                'status' => 200 ,
                'msg' => 'Public Holidays Updated successfully.'
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
            $data = PublicHoliday::find($request->id);
            $data->is_deleted = 1;
            $data->save();
            $response = [
                'status' => 200 ,
                'msg' => 'category deleted successfully.'
            ];
            return $response;
        }
    }
    public function delete_holiday(Request $request) {
        
        $data = PublicHoliday::where('id', $request->id)->update([
            'delete_status' => true,
           
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Successfully Deleted'
        ];
        return $response;
    }
}
