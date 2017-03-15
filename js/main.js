$(document).ready(function(){
	
	//index.html

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

	//events.html

	setTimeout(load_event_page, 1000);
	function load_event_page(){
		$('#user_image').fadeIn('slow', function(){
			if($(window).width()>=900){
					$('#Profile').css('transform','translate(-290%,-150%)');
					$('#profile_description').css('opacity','1');
					$('#profile_description').css('transform','translate(-180%,-30%)');
					$('#dashboard').css('width','650px');
					$('#dashboard').css('opacity','1');
					$('#dashboard').css('transform','translate(+15%,-0.5%)');
			}
			else if($(window).width()>=700){
				$('#Profile').css('transform','translate(-200%,-150%)');
				$('#profile_description').css('opacity','1');
				$('#profile_description').css('transform','translate(-125%,-30%)');
				$('#dashboard').css('width','450px');
				$('#dashboard').css('opacity','1');
				$('#dashboard').css('transform','translate(+20%,-0.5%)');
			}
			else{
				$('#Profile').css('transform','translate(0px,-150%)');
				$('#profile_description').css('opacity','1');
				$('#profile_description').css('transform','translate(0px,-30%)');
				$('#dashboard').css('width','90%');
				$('#dashboard').css('opacity','1');
				$('#dashboard').css('transform','translate(0px,+70%)');
			}
		});
	}

	$('#dashboard_nav_events').click(function(){
		change_dashboard('#dashboard_nav_events', '#dashboard_nav_registered', '#dashboard_nav_notification', '#dashboard_events', '#dashboard_registered', '#dashboard_notification');
	});

	$('#dashboard_nav_registered').click(function(){
		change_dashboard('#dashboard_nav_registered', '#dashboard_nav_events', '#dashboard_nav_notification', '#dashboard_registered', '#dashboard_events', '#dashboard_notification');
	});

	$('#dashboard_nav_notification').click(function(){
		change_dashboard('#dashboard_nav_notification', '#dashboard_nav_registered', '#dashboard_nav_events', '#dashboard_notification', '#dashboard_registered', '#dashboard_events');
	});

	function change_dashboard(first_nav, second_nav, third_nav, first_dash, second_dash, third_dash){
		//alert();
		if($(first_nav).css('color')!='rgb(255, 255, 255)' & $(first_nav).css('color')!='white' & $(first_nav).css('color')!='ffffff' & $(first_nav).css('color')!='	ff'){
			$('#dashboard').css('border-color', $(first_nav).css('color'));
			$('#dashboard #dashboard_nav ul').css('border-bottom-color', $(first_nav).css('color'));
		}

		$(first_nav).css('color','white');
		$(first_nav+' .back').css('transform', 'scale(1)');
		$(first_nav+' .back').css('opacity', '1');

		$(second_nav+' .back').css('transform', 'scale(0.1)');
		$(second_nav+' .back').css('opacity', '0');
		$(third_nav+' .back').css('transform', 'scale(0.1)');
		$(third_nav+' .back').css('opacity', '0');

		$(second_dash).fadeOut(1);
		$(third_dash).fadeOut(1 , function(){
			$(first_dash).fadeIn(1000);
		});

		change_color(second_nav);
		change_color(third_nav);

		function change_color(nav){
			if(nav=='#dashboard_nav_registered'){
				$(nav).css('color','rgb(15,157,88)');
			}
			else if(nav=='#dashboard_nav_events'){
				$(nav).css('color','rgb(244,180,0)');
			}
			else{
				$(nav).css('color','rgb(57,123,249)');
			}
		}

	}

	$('#dashboard_nav_mobile_selected').click(function(){
		$('#dashboard_nav_mobile').toggle(500);
	})

	$('#dashboard_nav_mobile li').click(function(){
		$('#dashboard_nav_mobile').toggle(500);
		change_mobile_dashboard(this.id);
	});

	function change_mobile_dashboard(selected_nav){
		if(selected_nav=='dashboard_nav_mobile1'){
			change_color('rgb(244,180,0)');
			$('#dashboard_nav_mobile_selected h3')[0].innerHTML='Events';
			$('#dashboard_registered').fadeOut(1);
			$('#dashboard_notification').fadeOut(1 , function(){
				$('#dashboard_events').fadeIn(1000);
			});
		}
		else if(selected_nav=='dashboard_nav_mobile2'){
			change_color('rgb(15,157,88)');
			$('#dashboard_nav_mobile_selected h3')[0].innerHTML='Registered';
			$('#dashboard_events').fadeOut(1);
			$('#dashboard_notification').fadeOut(1 , function(){
				$('#dashboard_registered').fadeIn(1000);
			});
		}
		else{
			change_color('rgb(57,123,249)');
			$('#dashboard_nav_mobile_selected h3')[0].innerHTML='Notification';
			$('#dashboard_events').fadeOut(1);
			$('#dashboard_registered').fadeOut(1 , function(){
				$('#dashboard_notification').fadeIn(1000);
			});
		}
		function change_color(color){
			$('#dashboard_nav_mobile_selected').css('background-color', color);
			$('#dashboard').css('border-color', color);
		}
	}
});

