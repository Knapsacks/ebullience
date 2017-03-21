$(document).ready(function(){
    if(navigator.cookieEnabled=='false'){
        alert('Please Enable Cookie and Visit Us Again');
        window.location="http://www.wikihow.com/Enable-Cookies-in-Your-Internet-Web-Browser.html";
    }
    else if(getCookie("email")!=""){
        if(getCookie("basics")==0){
            $.getJSON('dataset/academics.json', function (data) {
                var items=[];
                $.each(data.branch, function(key, val) {
                    items.push("<option value='"+ val +"'>"+ val +"</option>");
                });

                $("#basic_details_form #branch2").append(items.join(""));
                $.each(data.year, function(key, val) {
                    items.push("<option value='"+ val +"'>"+ val +"</option>");
                });

                $("#basic_details_form #year").append(items.join(""));
                $.each(data.section, function(key, val) {
                    items.push("<option value='"+ val +"'>"+ val +"</option>");
                });

                $("#basic_details_form #section").append(items.join(""));
            });

            $('#basic_details').fadeIn('slow');

            $('#basic_details_form #rollno').on("focus blur",function(){
                if($('#basic_details_form #rollno')[0].value!=''){
                    $.ajax({
                        url:"https://ebullience.herokuapp.com/checkrollno.php",
                        data:{
                            "rollno":$('#basic_details_form #rollno')[0].value,
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
                                    $('#basic_details_form #rollno')[0].value='';
                                    $('#basic_details_form #rollno')[0].placeholder='ALREADY REGISTERED! TRY ANOTHER!';
                                }
                                else{
                                    $('#basic_details_form #rollno')[0].placeholder='';
                                }
                            }
                        },
                        error:function(){
                            alert("Please Try Again Later!");
                        }      
                    });
                }
            });

            $("#basic_details_form").submit(function(event) {
                var formdata=$('#basic_details_form').serializeArray();
                $.ajax({
                        url:"https://ebullience.herokuapp.com/checkrollno.php",
                        data:{
                            "rollno":$('#basic_details_form #rollno')[0].value,
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
                                    $('#basic_details_form #rollno')[0].value='';
                                    $('#basic_details_form #rollno')[0].placeholder='ALREADY REGISTERED! TRY ANOTHER!';
                                }
                                else{
                                    $.ajax({
                                        url:"https://ebullience.herokuapp.com/submitbasics.php",
                                        data: {
                                          "email": getCookie("email"),
                                          "phone": formdata[0].value,
                                          "rollno": formdata[1].value,
                                          "branch": formdata[2].value,
                                          "section": formdata[3].value,
                                          "year": formdata[4].value,
                                          "visits": Number(getCookie("visits"))+1,
                                        },
                                        cache: false,
                                        dataType: 'jsonp',
                                        success:function(json){
                                            console.log(json);
                                            if(json['error']!=0){
                                                alert('Please Try Again Later');
                                            }
                                            else{
                                                setCookie("phone", formdata[0].value,100);
                                                setCookie("rollno", formdata[1].value,100);
                                                setCookie("branch", formdata[2].value,100);
                                                setCookie("section", formdata[3].value,100);
                                                setCookie("year", formdata[4].value,100);
                                                setCookie("visits", Number(getCookie("visits"))+1,100);
                                                setCookie("basics",1,100);
                                                location.reload();
                                            }
                                        },
                                        error:function(){
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
        }
        else{
            $('#profile_description_name')[0].innerHTML=getCookie('name');
            $('#profile_description_email')[0].innerHTML=getCookie('email');
            $('#profile_description_phone')[0].innerHTML=getCookie('phone');
            $('#profile_description_branch')[0].innerHTML=getCookie('branch');
            $('#profile_description_section')[0].innerHTML=getCookie('section');
            $('#profile_description_year')[0].innerHTML=getCookie('year');
            $('#profile_description_registered')[0].innerHTML=getCookie('totalregistered')+" registered events.";
            $('#user_image')[0].src=getCookie('picture');
            $.getJSON('dataset/notification.json', function (data) {
                var items=[];
                $.each(data.notification, function(key, val) {
                    items.push("<div><h3>"+val.headline+" | <sub>"+val.date+" - "+val.time+"</sub></h3><p>"+val.details+"</p><hr></div>");
                });
                items.reverse();
                $("#dashboard_notification").append(items.join(""));
            });
            setTimeout(load_event_page, 1000);
            function load_event_page(){
                $('#user_image').fadeIn('slow', function(){
                    if($(window).width()>=900){
                            $('#Profile').css('transform','translate(-290%,-150%)');
                            $('#profile_description').css('opacity','1');
                            $('#profile_description').css('transform','translate(-180%,-20%)');
                            $('#dashboard').css('width','650px');
                            $('#dashboard').css('opacity','1');
                            $('#dashboard').css('transform','translate(+15%,-0.5%)');
                            $('#logout_button').css('opacity','1');
                            $('#logout_button').css('transform','translate(-180%,+350%)');
                            $('#feedback_button').css('opacity','1');
                            $('#feedback_button').css('transform','translate(-180%,+455%)');
                    }
                    else if($(window).width()>=700){
                        $('#Profile').css('transform','translate(-200%,-150%)');
                        $('#profile_description').css('opacity','1');
                        $('#profile_description').css('transform','translate(-125%,-20%)');
                        $('#dashboard').css('width','450px');
                        $('#dashboard').css('opacity','1');
                        $('#dashboard').css('transform','translate(+20%,-0.5%)');
                        $('#logout_button').css('opacity','1');
                        $('#logout_button').css('transform','translate(-125%,+350%)');
                        $('#feedback_button').css('opacity','1');
                        $('#feedback_button').css('transform','translate(-125%,+455%)');
                    }
                    else{
                        $('#Profile').css('transform','translate(0px,-150%)');
                        $('#profile_description').css('opacity','1');
                        $('#profile_description').css('transform','translate(0px,-20%)');
                        $('#dashboard').css('width','90%');
                        $('#dashboard').css('opacity','1');
                        $('#dashboard').css('transform','translate(0px,+100%)');
                        $('#logout_button').css('opacity','1');
                        $('#logout_button').css('transform','translate(0,+350%)');
                        $('#feedback_button').css('opacity','1');
                        $('#feedback_button').css('transform','translate(0,+455%)');
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
                    $(first_dash).fadeIn(1);
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
                    $('#dashboard_nav_mobile ul').css('background-color', color);
                }
            }

            //code for event block
            var uniqueevents,events,academics;
            $.getJSON('dataset/uniqueevents.json', function (data) {
                uniqueevents=data;
            });
            $.getJSON('dataset/events.json', function (data) {
                events=data;
            });
            $.getJSON('dataset/academics.json', function (data) {
                academics=data;
            });
            var type;
           $('#technical').click(function(){
                type=$('#technical').text();
                //  alert(type);
                $('#first').hide(1,function(){
                    $('#branch').fadeIn();
                });
            });
            function branch_click(branch){
                $('#branch').fadeOut(1,function(){
                    var items=[];
                    var check=0;
                    items.push("<div class='b-btn' id='back_ename'>BACK</div>");
                    $.each(uniqueevents, function(key, val) {
                        if(events.technical.indexOf(val["Unique ID"])>-1 & val["Branch which is conducting this"]==branch)
                        {
                            check=1;
                            items.push("<div id="+ val["Unique ID"] +" class='event-block'><h3><b>"+ val["Event Name"] +"</b> ></h3><hr></div>");
                        }
                    });
                    if(check!=1){
                            items.push("<div><h3>No Event Registered In This Branch Yet. Check Again Later.</h3></div>");
                    }
                    $("#ename").append(items.join(""));
                    $('#ename').fadeIn();
                });
                //alert();
            }
            $('#back_branch').click(function(){
                $('#branch').fadeOut(1,function(){
                    $('#first').fadeIn();
                });
            });
            function back_ename(type){
                $("#ename")[0].innerHTML='';
                if(type=="TECHNICAL"){
                        $('#ename').fadeOut(1,function(){
                            $('#branch').fadeIn();
                    });
                }
                else
                {
                    $('#ename').fadeOut(1,function(){
                            $('#first').fadeIn();
                        });
                }
            }
            $(document).on('click','#back_ename',function(){
                back_ename(type);
            });
            $('#CSE').click(function(){
                    branch_click('CSE');
            });
            $('#IT').click(function(){
                    branch_click('IT');
            });
            $('#ME').click(function(){
                    branch_click('ME');
            });
            $('#EC').click(function(){
                    branch_click('EC');
            });
            $('#CHEM').click(function(){
                    branch_click('CHEM');
            });
            $('#CIVIL').click(function(){
                    branch_click('CIVIL');
            });
            $('#MCA').click(function(){
                    branch_click('MCA');
            });
            $('#EN').click(function(){
                    branch_click('EN');
            });
            $('#BIO').click(function(){
                    branch_click('BIO');
            });
            $('#MBA').click(function(){
                    branch_click('MBA');
            });
            $('#PHARMACY').click(function(){
                    branch_click('PHARMACY');
            });    
            $(document).on('click','#back_eventd',function(){
                $('#eventd')[0].innerHTML='';
                $('#eventd').fadeOut(1,function(){
                    $('#ename').fadeIn();
                });
            });
            $('#common').click(function(){
                $('#first').fadeOut(1,function(){
                    type=null;
                    var items=[];
                    var check=0;
                    items.push("<div class='b-btn' id='back_ename'>BACK</div>");
                    $.each(uniqueevents, function(key, val) {
                        if(events.common.indexOf(val["Unique ID"])>-1)
                        {
                            check=1;
                            items.push("<div id="+ val["Unique ID"] +" class='event-block'><h3><b>"+ val["Event Name"] +"</b> ></h3><hr></div>");
                        }
                    });
                    if(check!=1){
                            items.push("<div><h3>No Event Registered In This Section Yet. Check Again Later.</h3></div>");
                    }
                    $("#ename").append(items.join(""));
                    $('#ename').fadeIn();
                });
            });
            $('#sports').click(function(){
                $('#first').fadeOut(1,function(){
                    type=null;
                    var items=[];
                    var check=0;
                    items.push("<div class='b-btn' id='back_ename'>BACK</div>");
                    $.each(uniqueevents, function(key, val) {
                        if(events.sports.indexOf(val["Unique ID"])>-1)
                        {
                            check=1;
                            items.push("<div id="+ val["Unique ID"] +" class='event-block'><h3><b>"+ val["Event Name"] +"</b> ></h3><hr></div>");
                        }
                    });
                    if(check!=1){
                            items.push("<div><h3>No Event Registered In This Branch Yet. Check Again Later.</h3></div>");
                    }
                    $("#ename").append(items.join(""));
                    $('#ename').fadeIn();
                });
            });
            for(var i=0;i<64;i++){
                $(document).on('click','#'+i,function(){
                    var id=this.id;
                    $('#ename').fadeOut(1,function(){
                        var items=[];
                        var check=0;
                        items.push("<div class='b-btn' id='back_eventd'>BACK</div>");
                        $.each(uniqueevents, function(key, val) {
                            if(val["Unique ID"]==id)
                            {
                                check=1;
                                items.push(`<div>
                                <hr>
                                <h3><b>`+ val["Event Name"] +` - <span id=register`+ id +` class='event_register_button'>REGISTER</span></b></h3>
                                <h4><b>Team Event</b> - `+ val["Team Event ?"] +`</h4>
                                <h4><b>No Of Maximum Members</b> - `+ val["No Of Team Members (just enter no)"] +`</h4>
                                <h4><b>Event Day</b> - `+ val["Event Day"] +`</h4>
                                <h4><b>Event Begins At</b> - `+ val["Event Time Hour (24 Hrs)"] +` `+ val["Event Time Minutes"] +`</h4>
                                <h4><b>Event Location</b> - `+ val["Event Room (just enter no)"] +` `+ val["Event Block (Building)"] +`</h4>
                                <h4><b>Student Coordinator</b> : `+ val["Student Coordinator 1 (Name - Number)"] +` `+ val["Student Coordinator 2 (Name - Number)"] +`</h4>
                                <h4><b>Faculty Coordinator</b> : `+ val["Faculty Coordinator 1 (Name - Number)"] +` `+ val["Faculty Coordinator 2 (Name - Number)"] +`</h4>
                                <h4><b>Description</b> -</h4>
                                <p>`+ val["Event Description"] +`</p>
                                <hr></div>`);
                            }
                        });
                        if(check!=1){
                                items.push("<div><h3>No Description Added In This Event Yet. Check Again Later.</h3></div>");
                        }
                        $("#eventd").append(items.join(""));
                        $('#eventd').fadeIn();
                    });
                });

                $(document).on('click','#register'+i,function(){
                    var id=this.id.substr(8);
                    //console.log(id);
                    $('#eventd').fadeOut(1,function(){
                        var items=[];
                        items.push("<div class='b-btn' id='back_eventdetail'>BACK</div>");
                        $("#eventregistration").append(items.join(""));
                        $.each(uniqueevents, function(key, val) {
                            if(val["Unique ID"]==id)
                            {
                                items=[];
                                items.push(`
                                    <div id="unique_event_id">`+ id +`</div>
                                    <h2>Register For `+ val["Event Name"] +`</h2>
                                    <p>This is event require `+ val["No Of Team Members (just enter no)"] +` maximum people. First member is always submitted with your name by default.</p>
                                    <h4><b>Member Number 1</b></h4>
                                    <p>Already Filled For you</p>
                                    <form id="event_registration_form" class="topBefore">`);
                               $("#eventregistration").append(items.join(""));
                               items=[];
                                for(var x=1;x<val["No Of Team Members (just enter no)"];x++){
                                    items.push(`
                                <h4><b>Enter Details For Member Number `+ String(Number(x)+1) +`</b></h4>
                                <div><label for="name">Enter Full Name</label>
                                <input id="name`+ x +`" type="text" name="name"></div>

                                <div><label for="phone">PhoneNumber</label>
                                <input id="phone`+ x +`" type="number" name="phone"></div>

                                <div><label for="rollno">RollNumber</label>
                                <input id="rollno`+ x +`" type="number" name="rollno"></div>

                                <div><label for="branch">Branch</label>
                                <select id="branch`+ x +`" name="branch"></select></div>

                                <div><label for="section">Section</label>
                                <select id="section`+ x +`" name="section"></select></div>

                                <div><label for="year">Year</label>
                                <select id="year`+ x +`" name="year"></select></div>`);
                               $("#event_registration_form").append(items.join(""));
                               items=[];
                                var options=[];
                                $.each(academics.branch, function(key, val) {
                                    options.push("<option value='"+ val +"'>"+ val +"</option>");
                                });
                                $("#branch"+ x).append(options.join(""));
                                options=[];

                                $.each(academics.section, function(key, val) {
                                    options.push("<option value='"+ val +"'>"+ val +"</option>");
                                });
                                $("#section"+ x).append(options.join(""));
                                options=[];

                                $.each(academics.year, function(key, val) {
                                    options.push("<option value='"+ val +"'>"+ val +"</option>");
                                });
                                $("#year"+ x).append(options.join(""));
                            }
                            $("#event_registration_form").append(`
                                    <input id="eventsubmit" type="submit" value="SUBMIT" class="registersubmit">
                                    </form>`);
                        }
                        });
                        $('#eventregistration').fadeIn();
                    });
                });
            }

            $(document).on('click','#back_eventdetail',function(){
                $('#eventregistration').fadeOut(1,function(){
                        $("#eventregistration")[0].innerHTML='';
                        $('#eventd').fadeIn();
                });
            });

            $(document).on('submit','#event_registration_form',function(){
                team=$('#event_registration_form').serialize();
                console.log($('#unique_event_id')[0].innerHTML);
                console.log(team);
                $.ajax({
                        url:"https://ebullience.herokuapp.com/registerevent.php",
                        data:{
                            "name": getCookie("name"),
                            "email": getCookie("email"),
                            "phone": getCookie("phone"),
                            "rollno": getCookie("rollno"),
                            "branch": getCookie("branch"),
                            "section": getCookie("section"),
                            "year": getCookie("year"),
                            "team": team,
                            "event": Number($('#unique_event_id').innerHTML),
                        },
                        cache: false,
                        dataType: 'jsonp',
                        success:function(json){
                            console.log(json);
                            if(json['error']!=0){
                                alert('Please Try Again Later!');
                            }
                            else{
                                alert("Registration Successful");
                                $('#eventregistration').fadeOut(1,function(){
                                        $("#eventregistration")[0].innerHTML='';
                                        $('#eventd').fadeIn();
                                });
                            }
                        },
                        error:function(){
                            alert("Please Try Again Later!");
                        }
                    });
                event.preventDefault();
            });

            $(document).on('submit','#feedback_form',function(){
                var formdata=$('#feedback_form').serializeArray();
                $.ajax({
                        url:"https://ebullience.herokuapp.com/feedback.php",
                        data:{
                            "rating":formdata[0].value,
                            "comment":formdata[1].value
                        },
                        cache: false,
                        dataType: 'jsonp',
                        success:function(json){
                            console.log(json);
                            if(json['error']!=0){
                                alert('Please Try Again Later!');
                            }
                            else{
                                alert("Feedback Submitted");
                            }
                        },
                        error:function(){
                            alert("Please Try Again Later!");
                        }
                    });
                $('#feedback').fadeOut();
                event.preventDefault();
            });
        }
    }

    else{
        alert("Please Login First!");
        window.location="/ebullience/";
    }

    $("#feedback_button").click(function(){
        //add code to reduce opacity of background
        $('#curtain').fadeIn('slow');
        $('#feedback').fadeIn('slow');
    });

    $("#logout_button").click(function(){
        setCookie('name','',1);
        setCookie('email','',1);
        setCookie('phone','',1);
        setCookie('branch','',1);
        setCookie('section','',1);
        window.location="/ebullience/";
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
});