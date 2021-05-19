<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <title>Booking App</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    {{-- <meta name="csrf-token" content="{{ csrf_token() }}"> --}}
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>
    <link href="{{asset('admin-assets/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('admin-assets/css/nifty.min.css')}}" rel="stylesheet">
    <link href="{{asset('admin-assets/css/demo/nifty-demo-icons.min.css')}}" rel="stylesheet">
    <link href="{{asset('admin-assets/css/demo/nifty-demo-icons.min.css')}}" rel="stylesheet">
    <link href="{{asset('admin-assets/premium/icon-sets/icons/line-icons/premium-line-icons.min.css')}}" rel="stylesheet">
    <link href="{{asset('admin-assets/plugins/pace/pace.min.css')}}" rel="stylesheet">
    <script src="{{asset('admin-assets/plugins/pace/pace.min.js')}}"></script>
    <link href="{{asset('admin-assets/css/demo/nifty-demo.min.css')}}" rel="stylesheet">
    <link href="{{asset('admin-assets/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">
    <link href="{{asset('admin-assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.min.css')}}" rel="stylesheet">
    <link href="{{asset('admin-assets/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">
    <link href="{{asset('admin-assets/plugins/summernote/summernote.min.css')}}" rel="stylesheet">
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</head>
<body>
    <div id="root">
       
    </div>
    <script src="https://js.stripe.com/v3/"></script>
    <script src="{{asset('admin-assets/js/jquery.min.js')}}"></script>
    <script src="{{asset('admin-assets/js/bootstrap.min.js')}}"></script>
    <script src="{{asset('admin-assets/js/nifty.min.js')}}"></script>
    <script src="{{asset('admin-assets/js/nifty.js')}}"></script>
    <script type="text/javascript" src ="{{asset('js/app.js')}}"></script>
    <script src="{{asset('admin-assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.min.js')}}"></script>
    <script src="{{asset('admin-assets/js/demo/form-component.js')}}"></script>
    {{-- <script src="{{asset('admin-assets/js/demo/nifty-demo.min.js')}}"></script> --}}
    <script src="{{asset('admin-assets/plugins/summernote/summernote.min.js')}}"></script>
    <script src="{{asset('admin-assets/plugins/flot-charts/jquery.flot.min.js')}}"></script>
    <script src="{{asset('admin-assets/plugins/flot-charts/jquery.flot.categories.min.js')}}"></script>
    <script src="{{asset('admin-assets/plugins/flot-charts/jquery.flot.orderBars.min.js')}}"></script>
    <script src="{{asset('admin-assets/plugins/flot-charts/jquery.flot.tooltip.min.js')}}"></script>
    <script src="{{asset('admin-assets/plugins/flot-charts/jquery.flot.resize.min.js')}}"></script>
</body>
</html>


