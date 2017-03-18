$(document).ready(function(){
	if(navigator.cookieEnabled=='false'){
		alert('Please Enable Cookie and Visit Us Again');
		window.location="http://www.wikihow.com/Enable-Cookies-in-Your-Internet-Web-Browser.html";
	}
	setTimeout(preloader_magic, 4000);
	//setTimeout(flyby, 21775);
	setTimeout(show_login, 21775);
	//setTimeout(registerbox, 22150);
	
	function preloader_magic(){
			$('#cssload-contain').fadeOut('slow', function(){
				$('#landing').fadeIn('slow');
				setTimeout(S.init,250);
				setTimeout(set_button,300);
			});
	}
	function set_button(){
		$("#login_button").css('line-height',$("#login_button").css('height'));
	}
	function flyby(){
		$('#Landing').fadeOut('slow');
	}
	function show_login(){
		$('#login_button').fadeIn('slow');
	}

	// Facebook login with JavaScript SDK
	function fbLogin() {
		FB.login(function (response) {
			if (response.authResponse) {
				// Get and display the user profile data
				getFbUserData();
			} else {
				alert('User cancelled login or did not fully authorize.');
			}
		}, {scope: 'email'});
	}

	// Fetch the user profile data from facebook
	function getFbUserData(){
		FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
		function (response) {
			var name = response.first_name+" "+response.last_name;
			var email = response.email;
			var picURL = response.picture.data.url;
			$.ajax({
				url:"https://ebullience.herokuapp.com/connection.php",
				data:{
					"name":name,
					"email":email,
					"picture":picURL,
				},
				cache: false,
				dataType: 'jsonp',
				success:function(json){
					console.log(json);
					if(json['error']!=0){
						alert('Please Try Again Later');
					}
					else{
						if(json['basics']==0){
							setCookie('basics',0,100);
							setCookie('name',name,100);
							setCookie('email',email,100);
							setCookie('picture',picURL,100);
						}
						else{
							setCookie('basics',1,100);
							setCookie('name',name,100);
							setCookie('email',email,100);
							setCookie('picture',picURL,100);
							setCookie('rollno',json['rollno'],100);
							setCookie('phone',json['phone'],100);
							setCookie('branch',json['branch'],100);
							setCookie('year',json['year'],100);
							setCookie('section',json['section'],100);
							setCookie('totalregistered',json['totalregistered'],100);
							setCookie('visits',Number(json['visits'])+1,100);
						}
						window.location="/ebullience/events.html";
					}
				},
				error:function(){
					alert("Please Try Again Later!");
				}      
			});
		});
	}

	$('#fb_login').click(function(){
		if(getCookie("email")=="")
			fbLogin();
		else window.location="/ebullience/events.html";
	});

	// Generic Cookie Handling Functions

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
});

