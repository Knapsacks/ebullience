setTimeout(preloader_magic, 4500);
function preloader_magic(){
		$('#cssload-contain').fadeOut('slow');
		$('#Landing').fadeIn('slow');
		setTimeout(S.init,250);
}