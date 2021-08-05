<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\State;

class StateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $states = State::where('delete_status',0)->get();
        $response = [
            'status' => 200,
            'states' => $states
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
        ]);
        if($validator->fails()){
            $response = [
                'status' => 219,
                'msg' => $validator->errors()->first(), 
                'errors' => $validator->errors()
            ];
            return $response;
        }else{
            $state = new State();
            $state->name = $request->name;
            $state->save();
            $response = [
                'status' => 200,
                'msg' => 'State added successfully', 
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
        $state = State::where('id', $id)->first();
        $response = [
            'status' => 200,
            'states' => $state];
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
        ]);
        if($validator->fails()){
            $response = [
                'status' => 219,
                'msg' => $validator->errors()->first(), 
                'errors' => $validator->errors()
            ];
            return $response;
        }else{
            $sta = State::find($request->id);
            $sta->name = $request->name;
            $sta->save();
            $response = [
                'status' => 200 ,
                'msg' => 'State updated successfully.'
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
            $state = State::find($request->id);
            $state->is_deleted = 1;
            $state->save();
            $response = ['status' => 200 ,
                'msg' => 'State deleted successfully.'];
            return $response;
        }
    }
    public function delete_State(Request $request) {
        
        $state = State::where('id', $request->id)->update([
            'delete_status' => true,
           
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Successfully Deleted'
        ];
        return $response;
    }
}
