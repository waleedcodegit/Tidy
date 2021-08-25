<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\HomeContents;

class HomeContentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function edit_content(Request $request)
    {
        $content = HomeContents::where('id',1)->first();
        $response =[
            'status' => 200,
            'msg' => 'content',
            'data' => $content
        ];
        return $response;
    }

    public function update_content(Request $request){
        $content = HomeContents::where('id', $request->id)->update([
            'reviews' => $request -> reviews,
            'modern_lives' => $request -> modern_lives,
            'services' => $request -> services,
            'get_leads' => $request -> get_leads,
            'how_cleaning_works' => $request -> how_cleaning_works
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Updated Successfully'
        ];
        return $response;
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
