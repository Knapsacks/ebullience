<?php
// google API dependencies
include_once '../google/gpConfig.php';
include_once '../google/User.php';
if(isset($_GET['code'])){
	$gClient->authenticate($_GET['code']);
	$_SESSION['token'] = $gClient->getAccessToken();
	header('Location: ' . filter_var($redirectURL, FILTER_SANITIZE_URL));
}/* 
    A test security measure : no access without authentication.
                                already taken care of by google API
    else {
	header('Location: http://ebullience.ankitrai.net/');*/
}

if (isset($_SESSION['token'])) {
	$gClient->setAccessToken($_SESSION['token']);
}

if ($gClient->getAccessToken()) {
	//Get user profile data from google
	$gpUserProfile = $google_oauthV2->userinfo->get();
	
	//Initialize User class
	$user = new User();
	
	//Insert or update user data to the database
    $gpUserData = array(
        'oauth_provider'=> 'google',
        'oauth_uid'     => $gpUserProfile['id'],
        'first_name'    => $gpUserProfile['given_name'],
        'last_name'     => $gpUserProfile['family_name'],
        'email'         => $gpUserProfile['email'],
        'gender'        => $gpUserProfile['gender'],
        'picture'       => $gpUserProfile['picture'],
        'link'          => $gpUserProfile['link']
    );
    $userData = $user->checkUser($gpUserData);
	
	//Storing user data into session
	$_SESSION['userData'] = $userData;
	
	//Render facebook profile data
    if(!empty($userData)){
        $pic = $userData['picture'];
        $name = $userData['first_name'].' '.$userData['last_name'];
        $email = $userData['email'];
    }
}
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
        <meta name="description" content="Student Profile">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

        <link rel="stylesheet" href="../css/normalize.min.css">
        <link rel="stylesheet" href="../css/events.css">
    </head>
<body>
	<!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    <canvas></canvas>

    <div id="Profile" class="profile_load">
        <img id="user_image" src="<?echo $pic;?>"/>
    </div>

    <div id="profile_description">
        <div></div>
        <ul>
            <li><?echo $name;?></li>
            <li><?echo $email;?></li>
        </ul>
    </div>

    <div id="dashboard">
        <div id="dashboard_nav">
            <ul>
                <li id="dashboard_nav_events"><h3><div class="back"></div>Events</h3></li>
                <li id="dashboard_nav_registered"><h3><div class="back"></div>Registered</h3></li>
                <li id="dashboard_nav_notification"><h3><div class="back"></div>Notification</h3></li>
            </ul>
        </div>
        <div id="dashboard_nav_mobile">
            <ul>
                <li id="dashboard_nav_mobile1"><h3 id="dashboard_nav_events2">Events</h3></li>
                <li id="dashboard_nav_mobile2"><h3 id="dashboard_nav_registered2">Registered</h3></li>
                <li id="dashboard_nav_mobile3"><h3 id="dashboard_nav_notification2">Notification</h3></li>
            </ul>
        </div>
        <div id="dashboard_nav_mobile_selected">
            <h3 id="dashboard_nav_events2">Events</h3>
            <img src="../img/chevron.svg"></div>
        <div id="dashboard_events" class="dashboard_desc">
            <h3>Events Goes Here</h3>
        </div>
        <div id="dashboard_registered" class="dashboard_desc">
            <h3>Registered Events Goes Here</h3>
        </div>
        <div id="dashboard_notification" class="dashboard_desc">
            <h3>Notification Goes Here</h3>
        </div>
    </div>

	<script
	  src="https://code.jquery.com/jquery-3.1.1.js"
	  integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA="
	  crossorigin="anonymous"></script>
    <script src='../js/zepto.min.js'></script>
	<script type="text/javascript" src="../js/events.js"></script>
	<script type="text/javascript" src="../js/main.js"></script>
	<script>
		(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
		function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
		e=o.createElement(i);r=o.getElementsByTagName(i)[0];
		e.src='//www.google-analytics.com/analytics.js';
		r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
		ga('create','http://ebullience.ankitrai.net','auto');ga('send','pageview');
	</script>
</body>
</html>
