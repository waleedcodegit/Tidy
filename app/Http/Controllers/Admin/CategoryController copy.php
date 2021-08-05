<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Category;
use Illuminate\Support\Facades\Validator;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::where('delete_status',0)->get();
        $response = ['status' => 200 ,
                'categories' => $categories];
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
            'type' => 'required',
            'name' => 'required',
            
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $new_category = new Category();
            $new_category->name = $request->name;
            $new_category->slug = str_replace("/", "-", str_replace(" ", "-", strtolower($request->name)));
            $new_category->type = $request->type;

            if ($request->image) {
                $name = time() . '.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
                \Image::make($request->image)->save(public_path('images/') . $name);
                $new_category->image = $name;
            }

            $new_category->save();
            $response = ['status' => 200 , 'msg' => 'category added successfully' , 
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
            $category = Category::find($request->id);
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
        $category = Category::find($id);
        $response = ['status' => 200 ,
        'category' => $category];
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
            'type' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $category = Category::find($request->id);
            $category->name = $request->name;
            $category->slug =  str_replace("/", "-", str_replace(" ", "-", strtolower($request->name)));
            $category->type = $request->type;
            $category->save();
            if ($request->image != $category->image) {
                $name = time() . '.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
                \Image::make($request->image)->save(public_path('images/') . $name);
                Category::where('id', $request->id)->update([
                    'image' => $name,
                ]); 
            } 
            $response = ['status' => 200 ,
                'msg' => 'category updated successfully.'];
            return $response;
        }
    }
    public function delete_category(Request $request) {
        
        $category = Category::where('id', $request->id)->update([
            'delete_status' => true,
           
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Successfully Deleted'
        ];
        return $response;
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
            $category = Category::find($request->id);
            $category->is_deleted = 1;
            $category->save();
            $response = ['status' => 200 ,
                'msg' => 'category deleted successfully.'];
            return $response;
        }
    }
}



