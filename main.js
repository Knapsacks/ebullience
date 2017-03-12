setTimeout(preloader_magic, 4000);
setTimeout(flyby, 21775);
setTimeout(registerbox, 22150);
function preloader_magic(){
		$('#cssload-contain').fadeOut('slow');
		$('#Landing').fadeIn('slow');
		setTimeout(S.init,250);
}
function flyby(){
	$('#Landing').fadeOut('slow');
}
function registerbox(){
	$('#registerbox').fadeIn('slow');

}