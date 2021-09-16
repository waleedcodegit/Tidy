<html>
<head>
    <style>
        .wrapper_div {
            height: auto;
            width: 100%;
        }

        header {
            text-align: center;
            font-size: 20px;
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
<div class="panel panel-body">
    <section>
        <header>
            <h3> {{$emails -> email_title}} </h3>
        </header>
        <img src="https://tidyhome.zacuta.com/public/images/site-logo.png" />
        <h3> {!! $content !!} </h3>
        <table >
            <tr>
            <a href="https://www.facebook.com/tidyhomeAU"><img src="https://img.icons8.com/external-justicon-flat-justicon/50/000000/external-facebook-social-media-justicon-flat-justicon.png"
            height="20" width="20"/></a>
            <a href="https://www.instagram.com/tidyhome21/"><img src="https://img.icons8.com/color/48/000000/instagram-new--v1.png" 
            height="20" width="20"/></a>
            <a href="https://www.linkedin.com/company/tidyhome"><img src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-linkedin-social-media-justicon-flat-justicon.png" 
            height="20" width="20"/></a>
            </tr>
        </table>
    </section>
    <footer>
        
    </footer>
</div>
</body>
</html>