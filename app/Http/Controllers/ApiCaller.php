<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiCaller extends Controller
{
    public function Call_Api(Request $request){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $request->url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt($ch, CURLOPT_USERAGENT , "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)");
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST, 1);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $parameters);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        $response = curl_exec($ch);
        return $response;
    }
}
