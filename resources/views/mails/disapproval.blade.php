<html>
<head>
    <style>
        .wrapper_div {
            height: auto;
            width: 100%;
        }

        header {
            text-align: center;
            font-size: 30px;
            font-family: sans-serif;
            color: #2db7c5;
        }

        section {
            width: 80%;
            margin: 0 auto;
            display: block;
        }

        a {
            box-shadow: 7px 6px 9px 0px grey;
            height: 50px;
            width: 100px;
            border-radius: 5px;
            background: #2db7c5;
            color: white;
            font-family: sans-serif;
            font-size: 20px;
            letter-spacing: 1px;
            cursor: pointer;
        }

        .button_center {
            width: 23%;
            margin: 0 auto;
        }

        .bold {
            font-weight: bold;
        }

    </style>
</head>
<body>
<div class="wrapper_div">
    <header>
        <h3>Subject:</h3> {{$emails -> email_title}}
    </header>
    <section>
        
        <h3>Name:</h3> {{$data->first_name}} {{$data->last_name}}
        <h3>Email:</h3> {{$data->email}}
        <h3>This is from emails</h3> {!! $emails->email_content !!}
        
        <!-- <h3>password:</h3> tidy{{$data->id}}home -->
    </section>
    <footer>
        
    </footer>
</div>
</body>
</html>