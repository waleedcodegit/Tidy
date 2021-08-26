<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Review;

class ReviewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $review = Review::where('delete_status',0)->get();
        $response= ['status' => 200 ,
                'review' => $review];
        return $response;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create_review(Request $request){
        
            $review = new Review();
            $review->name = $request->get_name;
            $review->designation = $request->get_designation;
            $review->comment = $request->get_comment;
            $review->rating = $request->get_rating;
            $review->image = $request->get_image;
            
            $review->save();
            $response = ['status' => 200 , 'msg' => 'Review added.'];
            return $response;
    }

    public function edit_review(Request $request)
    {
        $review = Review::where('id', $request->id)->first();
        $response = [
            'status' => 200,
            'msg' => 'REVIEWS',
            'data' =>  $review
        ];
        return $response;
    }

    public function update(Request $request) {
        $review = Review::where('id', $request->id)->update([
            'name' => $request->get_name,
            'designation' => $request->get_designation,
            'comment' => $request->get_comment,
            'rating' => $request->get_rating,
            'image' => $request->get_image
            
        ]);

        $response = [
            'status' => 200,
            'msg' => 'Updated Successfully'
        ];
        return $response;
    }

    public function delete_review(Request $request) {
        
        $review = Review::where('id', $request->id)->update([
            'delete_status' => true,
           
        ]);
        $response = [
            'status' => 200,
            'msg' => 'Successfully Deleted'
        ];
        return $response;
    }

    public function get_all_reviews (Request $request){
        $review = Review::where('delete_status',0)->get();
        return $review;
    }
}
