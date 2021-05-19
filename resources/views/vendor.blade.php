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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css">

        <link rel="stylesheet"type="text/css" href="{{asset('vendor-assets/css/app.css')}}">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"/>
        <link href="{{asset('vendor-assets/css/toggle-switch.css')}}" rel="stylesheet" />
        <link rel="stylesheet" href="{{asset('vendor-assets/css/bootstrap.min.css')}}" >
        <link href="{{asset('vendor-assets/css/animate-css/animate.min.css')}}" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Codystar&family=Darker+Grotesque:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="{{asset('vendor-assets/assets/css/main.css')}}"> 
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-191431104-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-191431104-1');
        </script>
    </head>
    <body>
        <div >
            <div id="root">
            </div>
        </div>

        <script src="{{asset('vendor-assets/js/popper.min.js')}}" ></script>
        <script src="{{asset('vendor-assets/js/revo-custom.js')}}" ></script>
        <script src="{{asset('vendor-assets/js/main.js')}}" ></script>
        <script src="{{asset('vendor-assets/js/jquery-3.4.1.slim.min.js')}}" ></script>
        <script src="{{asset('vendor-assets/js/bootstrap.min.js')}}" ></script>
        <!-- jQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <!-- Popper JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <!-- Latest compiled JavaScript -->
        
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <script src="https://js.stripe.com/v3/"></script>
        <script type="text/javascript" src="{{asset('js/app.js')}}"></script>
        <script src="{{asset('vendor-assets/assets/js/libs/jquery-3.3.1.min.js')}}"></script> 
        <script src="{{asset('vendor-assets/assets/js/libs/jquery-migrate-1.4.1.min.js')}}"></script>   
        <script src="{{asset('vendor-assets/assets/js/components/slick.js')}}"></script>
        <script src="{{asset('vendor-assets/assets/js/components/fitvids.js')}}"></script>
        <script src="{{asset('vendor-assets/assets/js/main.js')}}"></script> 
       

    </body>
</html>
