$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
});

$.getJSON('../dataset/academics.json', function (data) {
                var items=[];
                $.each(data.branch, function(key, val) {
                    items.push("<option value='"+ val +"'>"+ val +"</option>");
                });

                $("#signup #branch").append(items.join(""));
		            items=[];
                $.each(data.year, function(key, val) {
                    items.push("<option value='"+ val +"'>"+ val +"</option>");
                });

                $("#signup #year").append(items.join(""));
		            items=[];
                $.each(data.section, function(key, val) {
                    items.push("<option value='"+ val +"'>"+ val +"</option>");
                });

                $("#signup #section").append(items.join(""));
            });

$('#signup #email').on("focus blur",function(){
        if($('#signup #email')[0].value!=''){
            $.ajax({
                url:"https://ebullience.herokuapp.com/checkemail.php",
                data:{
                    "email":$('#signup #email')[0].value,
                },
                cache: false,
                dataType: 'jsonp',
                success:function(json){
                    console.log(json);
                    if(json['error']!=0){
                        alert('Please Try Again Later');
                    }
                    else{
                        if(json['unique']!=1){
                            $('#signup #email')[0].value='';
                            $('#signup #email')[0].placeholder='Try Another Email!';
                        }
                        else{
                            $('#signup #email')[0].placeholder='';
                        }
                    }
                },
                error:function(){
                    $('#signup #email')[0].placeholder='Please Try Again!';
                }      
            });
        }
        else{
          $('#signup #email')[0].placeholder='';
        }
  });

  $('#signup #rollno').on("focus blur",function(){
        if($('#signup #rollno')[0].value!=''){
            $.ajax({
                url:"https://ebullience.herokuapp.com/checkrollno.php",
                data:{
                    "rollno":$('#signup #rollno')[0].value,
                },
                cache: false,
                dataType: 'jsonp',
                success:function(json){
                    console.log(json);
                    if(json['error']!=0){
                        alert('Please Try Again Later');
                    }
                    else{
                        if(json['unique']!=1){
                            $('#signup #rollno')[0].value='';
                            $('#signup #rollno')[0].placeholder='Try Another RollNo!';
                        }
                        else{
                            $('#signup #rollno')[0].placeholder='';
                        }
                    }
                },
                error:function(){
                    $('#signup #rollno')[0].placeholder='Please Try Again!';
                }      
            });
        }
        else{
          $('#signup #email')[0].placeholder='';
        }
  });

$("#signup").submit(function(event) {
                $('#signupsubmit').replaceWith('<h4 style="color:red" id="signupsubmitwait"><b>PLEASE WAIT</b></h4>');
                var formdata=$('#signup').serializeArray();
                //console.log(formdata);
                $.ajax({
                        url:"https://ebullience.herokuapp.com/checkrollno.php",
                        data:{
                            "rollno":$('#signup #rollno')[0].value,
                        },
                        cache: false,
                        dataType: 'jsonp',
                        success:function(json){
                            console.log(json);
                            if(json['error']!=0){
                                alert('Please Try Again Later');
                            }
                            else{
                                if(json['unique']!=1){
                                    $('#signup #rollno')[0].value='';
                                    $('#signup #rollno')[0].placeholder='ALREADY REGISTERED! TRY ANOTHER!';
                                }
                                else{
                                    $.ajax({
                                      url:"https://ebullience.herokuapp.com/connection.php",
                                      data:{
                                        "name": formdata[0].value,
                                        "email": formdata[1].value,
                                        "picture":"https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png",
                                      },
                                      cache: false,
                                      dataType: 'jsonp',
                                      success:function(json){
                                        console.log(json);
                                        if(json['error']!=0){
                                          $('#signupsubmitwait').replaceWith('<button id="signupsubmit"type="submit" class="button button-block"/>Get Started</button>');
                                          alert('Please Try Again Later');
                                        }
                                        else{
                                              $.ajax({
                                                  url:"https://ebullience.herokuapp.com/submitbasics.php",
                                                  data: {
                                                    "email": formdata[1].value,
                                                    "phone": formdata[3].value,
                                                    "rollno": formdata[2].value,
                                                    "branch": formdata[5].value,
                                                    "section": formdata[4].value,
                                                    "year": formdata[6].value,
                                                    "visits": 1,
                                                  },
                                                  cache: false,
                                                  dataType: 'jsonp',
                                                  success:function(json){
                                                      console.log(json);
                                                      if(json['error']!=0){
                                                          alert('Please Try Again Later');
                                                          $('#signupsubmitwait').replaceWith('<button id="signupsubmit"type="submit" class="button button-block"/>Get Started</button>');
                                                      }
                                                      else{
                                                          setCookie("phone", formdata[3].value,100);
                                                          setCookie("rollno", formdata[2].value,100);
                                                          setCookie("branch", formdata[5].value,100);
                                                          setCookie("section", formdata[4].value,100);
                                                          setCookie("year", formdata[6].value,100);
                                                          setCookie("basics",1,100);
						                                              window.location="/ebullience/events.html";
                                                      }
                                                  },
                                                  error:function(){
                                                      alert("Please Try Again Later!");
                                                      $('#signupsubmitwait').replaceWith('<button id="signupsubmit"type="submit" class="button button-block"/>Get Started</button>');
                                                  }      
                                              });

                                        }
                                      },
                                      error:function(){
                                          $('#signupsubmitwait').replaceWith('<button id="signupsubmit"type="submit" class="button button-block"/>Get Started</button>');
                                        alert("Please Try Again Later!");
                                      }      
                                    });
                                }
                            }
                        },
                        error:function(){
                                          $('#signupsubmitwait').replaceWith('<button id="signupsubmit"type="submit" class="button button-block"/>Get Started</button>');
                            alert("Please Try Again Later!");
                        }      
                    });
                event.preventDefault();
            });


$("#loginf").submit(function(event) {
    $('#loginsubmit').replaceWith('<h4 style="color:red" id="loginsubmitwait"><b>PLEASE WAIT</b></h4>');
    var formdata=$('#loginf').serializeArray();
    $.ajax({
            url:"https://ebullience.herokuapp.com/checkemailrollno.php",
            data:{
                "rollno": formdata[1].value,
                "email": formdata[0].value,
            },
            cache: false,
            dataType: 'jsonp',
            success:function(json){
                console.log(json);
                if(json['error']!=0){
                    alert('Please Try Again Later');
                }
                else{
                    console.log(json['present']);
                    if(json['present']==0){
                        $('#loginsubmitwait').replaceWith('<button id="loginsubmit" class="button button-block"/>Log In</button>');
                        alert('Details not present, signup first');
                    }
                    else{
                      $.ajax({
                          url:"https://ebullience.herokuapp.com/connection.php",
                          data:{
                            "email": formdata[0].value,
                          },
                          cache: false,
                          dataType: 'jsonp',
                          success:function(json){
                            console.log(json);
                            if(json['error']!=0){
                              $('#loginsubmitwait').replaceWith('<button id="loginsubmit" class="button button-block"/>Log In</button>');
                              alert('Please Try Again Later');
                            }
                            else{
                              if(json['basics']==0){
                                $('#loginsubmitwait').replaceWith('<button id="loginsubmit" class="button button-block"/>Log In</button>');
                                alert("Contact Website Team");
                              }
                              else{
                                setCookie('basics',1,100);
                                setCookie('name',json['name'],100);
                                setCookie('email',formdata[0].value,100);
                                setCookie('picture',json['picture'],100);
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
                            $('#loginsubmitwait').replaceWith('<button id="loginsubmit" class="button button-block"/>Log In</button>');
                            alert("Please Try Again Later!");
                          }      
                        });
                    }
                }
            },
            error:function(){
                alert("Please Try Again Later!");
            }      
        });
    event.preventDefault();
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

	function checkCookie() {
		var user = getCookie("username");
		if (user != "") {
			alert("Welcome again " + user);
		} else {
			user = prompt("Please enter your name:", "");
			if (user != "" && user != null) {
				setCookie("username", user, 365);
			}
		}
	}