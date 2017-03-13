<?php
//Include GP config file && User class
include_once 'google/gpConfig.php';
include_once 'google/User.php';
$authUrl = $gClient->createAuthUrl();
$output = filter_var($authUrl, FILTER_SANITIZE_URL);
?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Ebullience 2k17</title>
        <meta name="description" content="The Annual Tech Fest of Noida Institute of Engineering and Technology">
        <meta name="author" content="Ankit Rai, Aaqa Istyak, Shashank Kumar, Snehil Verma">
        <meta name="keywords" content="college, tech, fest">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <link rel="stylesheet" href="css/normalize.min.css">
        <link rel="stylesheet" href="css/icons.css">
        <link rel="stylesheet" href="css/main.css">
    </head>
<body>
	<!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

	<!-- Preloader -->
	<div id="cssload-contain">
		<div class="cssload-wrap" id="cssload-wrap1">
			<div class="cssload-ball" id="cssload-ball1"></div>
		</div>

		<div class="cssload-wrap" id="cssload-wrap2">
				<div class="cssload-ball" id="cssload-ball2"></div>
		</div>
			
		<div class="cssload-wrap" id="cssload-wrap3">
			<div class="cssload-ball" id="cssload-ball3"></div>
		</div>
			
		<div class="cssload-wrap" id="cssload-wrap4">
			<div class="cssload-ball" id="cssload-ball4"></div>
		</div>
	</div>

	<!-- Landing page -->
	<div id="landing">
		<canvas class="canvas" id="canvas"></canvas>
	  	<div class="overlay"> 
	  	</div>
	</div>

	<!-- Login Button -->
	<div id="login_button">
		<li id="fb_login">
			<div class='entypo-facebook'></div>
		</li>
		<!--<li>
			<div class='entypo-twitter'></div>
			<span>Twitter</span>
		</li>-->
		<li id="google_login">
			<a href="<?echo $output;?>"><div class='entypo-gplus'></div></a>
		</li>
		<!--<li>
			<div class='entypo-linkedin'></div>
			<span>LinkedIn</span>
		</li>-->
		<!--<div class="g-signin2" data-onsuccess="onSignIn"></div>
		<div class="fb-login-button" data-max-rows="1" data-size="xlarge" data-show-faces="false" data-auto-logout-link="true"></div>
		-->
	</div>

	<script
	  src="https://code.jquery.com/jquery-3.1.1.js"
	  integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA="
	  crossorigin="anonymous"></script>
	<script type="text/javascript" src="js/landing.js"></script>
	<script type="text/javascript" src="js/main.js"></script>

	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8&appId=974242229341708";
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>

	<script src="https://apis.google.com/js/platform.js" async defer></script>

	<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
	<script>
		(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
		function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
		e=o.createElement(i);r=o.getElementsByTagName(i)[0];
		e.src='//www.google-analytics.com/analytics.js';
		r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
		ga('create','UA-XXXXX-X','auto');ga('send','pageview');
	</script>
</body>
</html>
