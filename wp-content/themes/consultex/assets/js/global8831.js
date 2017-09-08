/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main JS file that contains custom style rules used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: "Title"*/
/* Version: 1.0 Initial Release*/
/* Build Date: 06-02-2016*/
/* Author: Title*/
/* Copyright: (C) 2016 */
/*-------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */

var _functions = {};

jQuery(function() {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, headerH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = jQuery(window).width();
		winH = jQuery(window).height();
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	if(_ismobile) jQuery('body').addClass('mobile');
	_functions.pageCalculations();

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	jQuery(window).load(function(){
		_functions.initSwiper();
		jQuery('body').addClass('loaded');
		jQuery('#loader-wrapper').fadeOut();
	});

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
	};
	if(!_ismobile){
		jQuery(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*==============================*/
	/* 06 - function on page scroll */
	/*==============================*/
	
	jQuery(window).scroll(function(){
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = jQuery(window).scrollTop();

		if (winScr > 130){
			jQuery(".tt-header").addClass("stick fadeInDown animated");
		} else {
			jQuery(".tt-header").removeClass("stick fadeInDown animated");
		}
		
	};
	
	
	
	
	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	_functions.initSwiper = function(){
		jQuery('.swiper-container').not('.initialized').each(function(){								  
			var $t = jQuery(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.find('.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
		        loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):5000,
		        breakpoints: ($t.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) } } : {},
		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
		        keyboardControl: true,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        spaceBetween: ($t.is('[data-space-between]'))?parseInt($t.data('space-between'), 10):0,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
				onSlideChangeEnd: function(swiper){
					var animationBlocks = $t.find('.swiper-slide-active .text-animation');
					for (var i = 0; i < animationBlocks.length; ++i ){
						jQuery(animationBlocks[i]).addClass('animated ' + jQuery(animationBlocks[i]).attr("data-animation"));
					}
				},		        
				onSlideChangeStart: function(swiper){
					var animationBlocks = $t.find('.swiper-slide-active .text-animation');
					for (var i = 0; i < animationBlocks.length; ++i ){
						jQuery(animationBlocks[i]).removeClass('animated ' + jQuery(animationBlocks[i]).attr("data-animation"));
					}
				},		        
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});
		jQuery('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+jQuery(this).attr('id')].params.control = swipers['swiper-'+jQuery(this).parent().find('.swiper-control-bottom').attr('id')];
		});
		jQuery('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+jQuery(this).attr('id')].params.control = swipers['swiper-'+jQuery(this).parent().find('.swiper-control-top').attr('id')];
		});
	};

	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

	//menu
	jQuery('.cmn-toggle-switch').on('click', function(e){
		jQuery(this).toggleClass('active');
		jQuery(this).parents('header').find('.toggle-block').slideToggle();
		e.preventDefault();
	});
	jQuery('.main-nav .menu-toggle').on('click', function(e){
		jQuery(this).closest('li').toggleClass('select').siblings('.select').removeClass('select');
		jQuery(this).closest('li').siblings('.menu-item-has-children').find('ul').slideUp();
		jQuery(this).closest('a').siblings('ul').slideToggle();
		e.preventDefault();
	});

	/*tt-load-more*/
	jQuery('.tt-load-more').on('click', function(e){
		var $cloneHtml = jQuery(this).closest('.tt-block').find('.row:first-child').clone();
		jQuery(this).parent().prev().prev().append($cloneHtml)
	  	e.preventDefault();        		
	});

    //Tabs
	var tabFinish = 0;
	jQuery('.tt-nav-tab-item').on('click', function(e){		
	    var $t = jQuery(this);
	    if(tabFinish || $t.hasClass('active')) e.preventDefault();
	    tabFinish = 1;
	    $t.closest('.tt-nav-tab').find('.tt-nav-tab-item').removeClass('active');
	    $t.addClass('active');
	    var index = $t.parent().parent().find('.tt-nav-tab-item').index(this);
	    $t.parents('.tt-tab-wrapper').find('.tt-tab-select select option:eq('+index+')').prop('selected', true);
	    $t.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function(){
	    	var $tabActive  = $t.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
	    	$tabActive.css('display','block').css('opacity','0');
	    	$tabActive.animate({opacity:1});
	    	 tabFinish = 0;
	    });
	});
	jQuery('.tt-tab-select select').on('change', function(e){
	    var $t = jQuery(this);
	    if(tabFinish) e.preventDefault();
	    tabFinish = 1;    
	    var index = $t.find('option').index(jQuery(this).find('option:selected'));
	    $t.closest('.tt-tab-wrapper').find('.tt-nav-tab-item').removeClass('active');
	    $t.closest('.tt-tab-wrapper').find('.tt-nav-tab-item:eq('+index+')').addClass('active');
	    $t.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function(){
	    	var $tabActive  = $t.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
	    	$tabActive.css('display','block').css('opacity','0');
	    	$tabActive.animate({opacity:1});
	    	 tabFinish = 0;
	    });
	});

	/*tabs from hash*/
	var hash = location.hash.replace('#', '');
	if(hash){
		hashTab();
	}
	function hashTab(){
		var $tabSel = jQuery('.tt-nav-tab-item[data-tab="' +hash+ '"]').addClass('active');
	    $tabSel.closest('.tt-nav-tab').find('.tt-nav-tab-item').removeClass('active');
	    $tabSel.addClass('active');
	    var index = $tabSel.parent().parent().find('.tt-nav-tab-item').index($tabSel);
	    $tabSel.parents('.tt-tab-wrapper').find('.tt-tab-select select option:eq('+index+')').prop('selected', true);
	    $tabSel.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function(){
	    	var $tabActive  = $tabSel.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
	    	$tabActive.css('display','block').css('opacity','0');
	    	$tabActive.animate({opacity:1});
	    });	
	}
	jQuery(window).on("hashchange", function() {
	    if(window.location.hash) {
	        hash = location.hash.replace('#', '');
	        hashTab();
	    }		
	});

	/* accordeon */
	jQuery('.tt-accordeon-title').on('click', function(){
		jQuery(this).closest('.tt-accordeon').find('.tt-accordeon-title').not(this).removeClass('active').next().slideUp();
		jQuery(this).toggleClass('active').next().slideToggle();
		
		
	});		

	/*submit form*/
	jQuery('form.tt-submit-form').on('submit',function(e){
	   submitShedule(jQuery(this));
	   e.preventDefault();
	});
    function submitShedule($form) {
        jQuery.ajax({type:'POST', url:'email-action.php', data:$form.serialize(), success: function(response) {
           $form.find('input[type="submit"]').html('sent');
           $form.find('.tt-reply-success').html('Your message was sent successfully').addClass('active');
           $form[0].reset();                               
        }});                
        return false;
    }

	/* 10 - counter */
    jQuery(function(){
    function setTimer(){                        
        var today = new Date();
        var finalTime = new Date("Sep,1,2018");
        var interval = finalTime - today;
        if(interval<0) interval = 0;
        var days = parseInt(interval/(1000*60*60*24));
        var daysLeft = interval%(1000*60*60*24);
        var hours = parseInt(daysLeft/(1000*60*60));
        var hoursLeft = daysLeft%(1000*60*60);
        var minutes = parseInt(hoursLeft/(1000*60));
        var minutesLeft = hoursLeft%(1000*60);
        var seconds = parseInt(minutesLeft/(1000));
        jQuery('.days').text(days);
        jQuery('.hours').text(hours);
        jQuery('.minutes').text(minutes);
        jQuery('.seconds').text((seconds<10)?'0'+seconds:seconds);
    }
    setTimer();
    setInterval(function(){setTimer();}, 1000);
	}); 
	

	/*=====================*/
	/* 12 - LIGHT-BOX */
	/*=====================*/

	var lightbox = '.lightbox';
	if(jQuery(lightbox).length){
		var instanceG = jQuery(lightbox).imageLightbox({
			quitOnDocClick:	false,
			onStart:		function() {arrowsOn(instanceG, lightbox);overlayOn(); closeButtonOn(instanceG);},
			onEnd:			function() {arrowsOff();captionOff(); overlayOff(); closeButtonOff(); activityIndicatorOff();},
			onLoadStart: 	function() {captionOff(); activityIndicatorOn();},
			onLoadEnd:	 	function() {jQuery('.imagelightbox-arrow').css('display', 'block');captionOn(); activityIndicatorOff();}
		});		
	}		
	
	/*activity indicator functions*/
	var activityIndicatorOn = function(){
		jQuery('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
	};
	var activityIndicatorOff = function(){
		jQuery('#imagelightbox-loading').remove();
	};
	
	/*close button functions*/
	var closeButtonOn = function(instance){
		jQuery('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function(){ jQuery(this).remove(); instance.quitImageLightbox(); return false; });
	};
	var closeButtonOff = function(){
		jQuery('#imagelightbox-close').remove();
	};
	
	/*overlay*/
	var overlayOn = function(){jQuery('<div id="imagelightbox-overlay"></div>').appendTo('body');};
	var overlayOff = function(){jQuery('#imagelightbox-overlay').remove();};
	
	/*caption*/
	var captionOff = function(){jQuery('#imagelightbox-caption').remove();};
	var captionOn = function(){
		var description = jQuery('a[href="' + jQuery('#imagelightbox').attr('src') + '"] img').attr('alt');
		if(description.length)
			jQuery('<div id="imagelightbox-caption">' + description +'</div>').appendTo('body');
	};

	/*arrows*/
    var arrowsOn = function(instance, selector) {
        var $arrows = jQuery('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"><i class="fa fa-chevron-left"></i></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"><i class="fa fa-chevron-right"></i></button>');
        $arrows.appendTo('body');
        $arrows.on('click touchend', function(e) {
            e.preventDefault();
            var $this = jQuery(this);
            if( $this.hasClass('imagelightbox-arrow-left')) {
                instance.loadPreviousImage();
            } else {
                instance.loadNextImage();
            }
            return false;
        });
    };	
	var arrowsOff = function(){jQuery('.imagelightbox-arrow').remove();};	
			
			
 
    

});



//Blog search
	jQuery('.mobileSearch').on('click', function() {
	
		jQuery(this).toggleClass('searchOpen')
		jQuery(this).parent().find('.blogAside').slideToggle(350);
	});


//Filter drop down


	jQuery('.responsiveFilter').on('click', function() {
	
		jQuery(this).toggleClass('searchOpen')
		jQuery(this).parent().find('.portfolio-sorting').slideToggle(350);
	});

 


//  js    //


    jQuery(document).ready(function(){
		
		
        if (Modernizr.touch) {
            // show the close overlay button
            jQuery(".close-overlay").removeClass("hidden");
            // handle the adding of hover class when clicked
            jQuery(".tumbWrapper").click(function(e){
                if (!jQuery(this).hasClass("hover")) {
                    jQuery(this).addClass("hover");
                }
            });
            // handle the closing of the overlay
            jQuery(".close-overlay").click(function(e){
                e.preventDefault();
                e.stopPropagation();
                if (jQuery(this).closest(".tumbWrapper").hasClass("hover")) {
                    jQuery(this).closest(".tumbWrapper").removeClass("hover");
                }
            });
        } else {
            // handle the mouseenter functionality
            jQuery(".tumbWrapper").mouseenter(function(){
                jQuery(this).addClass("hover");
            })
            // handle the mouseleave functionality
            .mouseleave(function(){
                jQuery(this).removeClass("hover");
            });
        }
		
		
		//search
				jQuery( ".search" ).on( "click", function() {
            jQuery( "#cd-search" ).show();
});
		jQuery( "#close-search-btn" ).on( "click", function() {
            jQuery( "#cd-search" ).hide();
});

//owl-one

jQuery('.owl-one ').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                    nav: true,
					autoplay:true,
                  },
				  400: {
                    items: 2,
                    nav: true,
					autoplay:true,
                  },
                  600: {
                    items: 3,
                    nav: true,
					autoplay:true,
                  },
                  1000: {
                    items: 4,
                    nav: true,
                    loop: false,
                    margin: 20,
					autoplay:true,
					
                  }
                }
				
              })
			   jQuery( ".owl-prev").html('<i class="fa fa-angle-left"></i>');
 jQuery( ".owl-next").html('<i class="fa fa-angle-right"></i>');
		
	//owl-two	
		
		    jQuery('.owl-two ').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                    nav: true,
					autoplay:true,
                  },
                  600: {
                    items: 3,
                    nav: false,
					autoplay:true,
                  },
                  1000: {
                    items: 6,
                    nav: false,
                    loop: false,
                    margin: 20,
					autoplay:true,
                  }
                }
				
              })
		
		//owl-three
		
		jQuery('.owl-three ').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                    nav: true,
					autoplay:true,
                  },
                  600: {
                    items: 1,
                    nav: false,
					autoplay:true,
					
                  },
                  1000: {
                    items: 1,
                    nav: true,
                    loop: false,
                    margin: 20,
					autoplay:true,
                  }
                }
				
              })
			   jQuery( ".owl-prev").html('<i class="fa fa-angle-left"></i>');
 jQuery( ".owl-next").html('<i class="fa fa-angle-right"></i>');
 //owl-four

              jQuery('.owl-four ').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                     nav: false,
					autoplay:true,
                  },
                  600: {
                    items: 3,
                    nav: false,
					autoplay:true,
                  },
                  1000: {
                    items: 4,
                    nav: false,
                    loop: false,
                    margin: 20,
					autoplay:true,
                  }
                }
				
              });
		
			shuffleme.init(); //filter portfolio
	
    });
	/*=====================*/
	/* 8 - Page -Scrolling */
	/*=====================*/

jQuery('#btt').click(function() { 
       jQuery(window).scroll(function() {  
	   if(jQuery(this).scrollTop() != 0) {    
		   jQuery('#btt').fadeIn();           
		   } else {       
		   jQuery('#btt').fadeOut();            
		   }        
	   }); 
       
	   jQuery('#btt').click(function() { 
	   
	   jQuery('body,html').animate({scrollTop:0},800);  
	   
	   });   
});
/*---------Counter-----------*/
    function counting_data(){
        if( jQuery('.counter').length){
            jQuery('.counter').counterUp({
                delay:10,
                time:1000
            })
        }
    } 
    counting_data();
	
/* Mobile Menu */

if ( jQuery(window).width() < 991 ){
 jQuery( "body" ).addClass(function() {
  return "MobileHeader";
 });
}	
	
	
/* Custom js */

var shuffleme = (function( jQuery ) {
  'use strict';
  var $grid = jQuery('#grid'), //locate what we want to sort 
      $filterOptions = jQuery('.portfolio-sorting li'),  //locate the filter categories
      $sizer = jQuery('#grid').find('.shuffle_sizer'),    //sizer stores the size of the items

  init = function() {

    // None of these need to be executed synchronously
    setTimeout(function() {
      listen();
      setupFilters();
    }, 100);

    // instantiate the plugin
    $grid.shuffle({
      itemSelector: '[class*="col-"]',
      sizer: $sizer    
    });
  },

      

  // Set up button clicks
  setupFilters = function() {
    var $btns = $filterOptions.children();
    $btns.on('click', function(e) {
      e.preventDefault();
      var $this = jQuery(this),
          isActive = $this.hasClass( 'active' ),
          group = isActive ? 'all' : $this.data('group');

      // Hide current label, show current label in title
      if ( !isActive ) {
        jQuery('.portfolio-sorting li a').removeClass('active');
      }

      $this.toggleClass('active');

      // Filter elements
      $grid.shuffle( 'shuffle', group );
    });

    $btns = null;
  },

  // Re layout shuffle when images load. This is only needed
  // below 768 pixels because the .picture-item height is auto and therefore
  // the height of the picture-item is dependent on the image
  // I recommend using imagesloaded to determine when an image is loaded
  // but that doesn't support IE7
  listen = function() {
    var debouncedLayout = jQuery.throttle( 300, function() {
      $grid.shuffle('update');
    });

    // Get all images inside shuffle
    $grid.find('img').each(function() {
      var proxyImage;

      // Image already loaded
      if ( this.complete && this.naturalWidth !== undefined ) {
        return;
      }

      // If none of the checks above matched, simulate loading on detached element.
      proxyImage = new Image();
      jQuery( proxyImage ).on('load', function() {
       jQuery(this).off('load');
        debouncedLayout();
      });

      proxyImage.src = this.src;
    });

    // Because this method doesn't seem to be perfect.
    setTimeout(function() {
      debouncedLayout();
    }, 500);
  };      

  return {
    init: init
  };
}( jQuery ));


	