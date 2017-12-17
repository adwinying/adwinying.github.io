var main = function(){
	$('.menu-button').click(function(){
		$('.mobile-nav').toggleClass('show');
	});

	$(window).scroll(function(){
		var scroll 			= $(window).scrollTop();
		var aboutTrigger	= $('#about.section').offset().top - 250;
		var skillsTrigger	= $('#skills.section').offset().top - 250;
		var projectsTrigger	= $('#projects.section').offset().top - 250;
		var connectTrigger	= $('#connect.section').offset().top - 250;
    
		if(scroll >= aboutTrigger){
			$('#about.section').addClass("toggle");
		}else{
			$('#about.section').removeClass("toggle");
		}

		if(scroll >= skillsTrigger){
			$('#skills.section').addClass("toggle");
		}else{
			$('#skills.section').removeClass("toggle");
		}

		if(scroll >= projectsTrigger){
			$('#projects.section').addClass("toggle");
		}else{
			$('#projects.section').removeClass("toggle");
		}

		if(scroll >= connectTrigger){
			$('#connect.section').addClass("toggle");
		}else{
			$('#connect.section').removeClass("toggle");
		}
	});

	//Smooth Scrolling
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 500, 'swing', function () {
	        window.location.hash = target;
	    });
	});
	
};

$(document).ready(main);
