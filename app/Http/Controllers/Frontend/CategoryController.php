<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\SubCategory;
use App\Category;

class CategoryController extends Controller
{
    public function getcategory(Request $request){
        $home_categories = Category::where('type' , 'home')->with('subcategory')->get();
        $bussiness_categories = Category::where('type' , 'bussiness')->with('subcategory')->get();
        $categories = [
            [
                'name' => 'Home Services',
                'image' => 'home.png',
                'subcategory' => $home_categories
             ] ,
            [
                'name' => 'Business Services',
                'image' => 'company.png',
                'subcategory' => $bussiness_categories
            ]
            ];
        $response = [
            'status' => 200 ,
            'msg' => 'Categories',
            'categories' => $categories
        ];
        return $response;
    }
    public function getallcategory(Request $request){
        $categories = Category::with('subcategory')->get();
        // $bussiness_categories = Category::where('type' , 'bussiness')->with('subcategory')->get();
     
        $response = [
            'status' => 200 ,
            'msg' => 'Categories',
            'categories' => $categories
        ];
        return $response;
    }
}
