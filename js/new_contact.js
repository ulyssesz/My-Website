$(document).ready(function() {
	$('#send').click(function() {
		event.preventDefault();
		var name = $("input#name").val();
       	var email = $("input#email").val();
       	var message = $("textarea#message").val();

       	$("#error_message").html("").removeClass('alert-success').removeClass('alert-warning');
       	$.ajax({
                url: "contact_me.py",
                type: "POST",
                data: {name: name, email: email, message: message},
                cache: false,
                success: function() {
                	$("#error_message").html('Successfully sent').addClass('alert-success');
           		},
        		error: function(request, status, error) {
        			$("#error_message").html(request.responseText).addClass('alert-warning');
       			}

       	});
	});
});
