<?php

namespace App\Http\Controllers\Admin;

use App\Faq;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get_all_faqs(){
        $faqs = Faq::all();
        return $faqs;
    }
    public function get_faqs_by_type(Request $request){
        $faqs = Faq::where('type',$request->type)->get();
        return $faqs;
    }
    public function add_faq(Request $request){
        // return 1;
        $validator = Validator::make($request->all(), [
            'question' => 'required',
            'answer' => 'required',
            'type' => 'required'
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $faq = new Faq();
            $faq->question = $request->question;
            $faq->answer = $request->answer;
            $faq->type = $request->type;
            $faq->save();
            $response = ['status' => 200 , 'msg' => 'Faq added.'];
            return $response;
        }
    }
    public function edit_faq(Request $request)
    {
        $faq = Faq::where('id', $request->id)->first();
        $response = [
            'status' => 200,
            'msg' => 'Faq',
            'data' => $faq
        ];
        return $response;
    }

    public function update_faq(Request $request) {
        $faq = Faq::where('id', $request->id)->update([
            'question' => $request->question,
            'answer' => $request->answer,
            'type' => $request->type
        ]);

        $response = [
            'status' => 200,
            'msg' => 'Updated Successfully'
        ];
        return $response;
    }

    public function delete_faq(Request $request) {
        $faq = Faq::where('id', $request->id)->delete();
        $response = [
            'status' => 200,
            'msg' => 'Successfully Deleted'
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
