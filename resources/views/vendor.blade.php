<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Vendor</title>
        <meta name="csrf-tocken" content="{{csrf_token()}}">
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <!-- Styles -->
        {{-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"> --}}
        <link rel="stylesheet" href="/vendor-assets/css/app.min.css">
        <!-- Template CSS -->
        <link rel="stylesheet" href="/vendor-assets/css/style.css">
        <link rel="stylesheet" href="/css/main.css">
        <link rel="stylesheet" href="/vendor-assets/css/components.css">
        <!-- Custom style CSS -->
        <link rel="stylesheet" href="/vendor-assets/css/custom.css">
        <link rel="stylesheet" href="/vendor-assets/bundles/bootstrap-social/bootstrap-social.css">
        <link rel="stylesheet" href="/vendor-assets/bundles/summernote/summernote-bs4.css">
    </head>
    <body>
        <div >
            <div id="root">
            </div>
        </div>

       
       
        <script src="https://js.stripe.com/v3/"></script>
        
        <script type="text/javascript" src="{{asset('js/app.js')}}"></script>
       
         <!-- General JS Scripts -->
        <script src="/vendor-assets/js/app.min.js"></script>
        <!-- JS Libraies -->
        {{-- <script src="assets/bundles/apexcharts/apexcharts.min.js"></script> --}}
        <!-- Page Specific JS File -->
        <script src="/vendor-assets/js/page/index.js"></script>
        <!-- Template JS File -->
        <script src="/vendor-assets/js/scripts.js"></script>
        <!-- Custom JS File -->
        <script src="/vendor-assets/js/custom.js"></script>

        <script src="/vendor-assets/bundles/summernote/summernote-bs4.js"></script>
        

    </body>
</html>
