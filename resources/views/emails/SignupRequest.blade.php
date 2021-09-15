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
            width: 35%;
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
        <h3> {{$emails -> email_title}} </h3>
    </header>
    <section>
        <h3> {!! $content !!} </h3>
    </section>
    <footer>
        
    </footer>
</div>
</body>
</html>