<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Page;
use Illuminate\Http\Request;
use Validator;

class PagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add_page(Request $request){
        $validator = Validator::make($request->all(), [
            'page_title' => 'required',
            'content' => 'required',
            
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }

        $page = new Page();
        $page->page_title = $request->page_title;
        $page->content = json_encode($request->content);
        $page->slug = strtolower(str_replace(' ', '-' , $request->page_title));
        $page->save();

        $response = ['status' => 200 , 'msg' => 'Data Saved.' , 
            ];
        return $response;

    }

    public function update_page(Request $request){
        $validator = Validator::make($request->all(), [
            'page_title' => 'required',
            'content' => 'required',
            
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }

        $page = Page::where('id',$request->id)->first();
        $page->page_title = $request->page_title;
        $page->content = json_encode($request->content);
        $page->slug = strtolower(str_replace(' ', '-' , $request->page_title));
        $page->save();

        $response = ['status' => 200 , 'msg' => 'Data Updated.' , 
            ];
        return $response;

    }

    public function get_content(Request $request){
        
        $content = Page::where('slug',$request->slug)->first();
        if($content){
            return $content;
        }
    }

    public function get_page_by_id(Request $request){
        $page = Page::where('id',$request->id)->first();
        return $page;
    }
   
    public function delete_page_by_id(Request $request){
        $page = Page::where('id',$request->id)->delete();
        return $page;
    }
    public function get_pages(){
        $pages = Page::all();
        return $pages;
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
