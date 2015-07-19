$(document).ready( function(){
	$(".timeline-badge").waypoint(function(){
		$(this).fadeTo('slow', 1);
	}, {
		offset: 'bottom-in-view',
		triggerOnce: true
	});

	$(".timeline-panel").waypoint(function(){
		$(this).fadeTo('slow', 1);
		$(this).animate({'right': '0%'},'fast');
	}, {
		offset: '95%',
		triggerOnce: true
	});

	$(".progress-bar-striped").waypoint(function() {
		console.log("asdf");
		$(this).animate({"width":$(this).attr('aria-valuenow')+"%"}, 1000);
	}, {
		offset: '95%',
		triggerOnce: true
	});


});
