<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\SubCategory;
use Illuminate\Support\Facades\Validator;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sub_categories = SubCategory::all();
        $response = ['status' => 200 ,
                'subcategory' => $sub_categories];
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
            'category_id' => 'required',
            'name' => 'required',
        ]);
        if($validator->fails()){
            $response = ['status' => 219 , 'msg' => $validator->errors()->first() , 
            'errors' => $validator->errors()];
            return $response;
        }else{
            $new_category = new SubCategory();
            $new_category->name = $request->name;
            $new_category->category_id = $request->category_id;
            $new_category->save();
            // if ($request->image != $new_category->image) {
            //     $name = time() . '.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
            //     \Image::make($request->image)->save(public_path('images/') . $name);
            //     SubCategory::where('id', $new_category->id)->update([
            //         'image' => $name,
            //     ]);
            // }

            
            $response = ['status' => 200 , 'msg' => 'Subcategory added successfully' , 
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
        $subcategory = SubCategory::find($id);
        $response = ['status' => 200 ,
        'subcategory' => $subcategory];
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
        $category = SubCategory::find($request->id);
        $category->name = $request->name;
        $category->category_id = $request->category_id;
        $category->save();
        if ($request->image != $category->image) {
            $name = time() . '.' . explode('/', explode(':', substr($request->image, 0, strpos($request->image, ';')))[1])[1];
            \Image::make($request->image)->save(public_path('images/') . $name);
            SubCategory::where('id', $request->id)->update([
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
        $subcategory = SubCategory::where('id', $id)->delete();
        return 1;
    }
}
