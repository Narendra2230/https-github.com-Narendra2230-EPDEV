$(document).ready(function(){
	$(".monthly_sheet ul li").click(function(){
		$(".monthly_sheet ul li").removeClass("active");
		$(this).addClass("active");
	});
	
	$(".submit").click(function(){
		$("body").addClass("white_bg");
		
	});
	$(".cancel_btn").click(function(){
		$("body").removeClass("white_bg");	
	});

	/*$(document).keydown(function (event) {
		if (event.keyCode == 123) { // Prevent F12
			return false;
		} else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
			return false;
		}
	});*/

});

