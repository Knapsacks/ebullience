$(document).ready(function(){
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
});

