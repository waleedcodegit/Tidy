<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Employee;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\VendorAuthMeta;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $emp = Employee::get();
        $response = [
            'status' => 200,
            'employee' => $emp
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
            'username' => 'required',
            'password' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $vendor = VendorAuthMeta::where('token', $request->token)->first();
            $emp = new Employee();
            $emp->name = $request->name;
            $emp->username = $request->username;
            $emp->password = Hash::make($request->password);
            $emp->password_string = $request->password;
            if($vendor){
                $emp->vendor_id = $vendor->id;
            } else {
                $response = ['status' => 219 , 'msg' => 'vendor not found' , 
                'errors' => 'vendor not found'];
                return $response;
            }            
            $emp->save();
            if ($request->image != $emp->image) {
                $name = time() . '.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
                \Image::make($request->image)->save(public_path('images/') . $name);
                Employee::where('id', $emp->id)->update([
                    'image' => $name,
                ]);
            }

            
            $response = ['status' => 200 , 'msg' => 'Employee added successfully' , 
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
        $employee = Employee::find($id);
        $response = [
            'status' => 200 ,
            'employee' => $employee
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
        $employee = Employee::find($request->id);
        $employee->name = $request->name;
        $employee->username = $request->username;
        $employee->password = Hash::make($request->password);
        $employee->password_string = $request->password;
        $employee->save();
        if ($request->image != $employee->image) {
            $name = time() . '.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
            \Image::make($request->image)->save(public_path('images/') . $name);
            Employee::where('id', $request->id)->update([
                'image' => $name,
            ]); 
        } 
        $response = ['status' => 200 ,
            'msg' => 'Subcategory updated successfully.'];
        return $response;
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
