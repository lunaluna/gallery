'use strict';

// scroll
(function($){
  $('a[href^="#"]').on('click',function(){
    var speed = 500;
    var href = $(this).attr('href');
    var offset = 0;
    var offTop = 0;
    if($(href).length){
      offTop = $(href).offset().top;
    }
    var position = offTop - offset;
    $('html, body').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
})(jQuery);

// 768px
(function($) {
  $(window).on('load resize',function(){
    if(window.matchMedia('(min-width: 768px)').matches){
      pageTop();
    }else{
    }

    function matchFunction(){
      if(window.matchMedia('(min-width:768px)').matches){
        pageTop();
      }
    }
    window.matchMedia('(max-width:767px)').addListener(matchFunction);
  });

  function pageTop(){
    $(window).on('scroll',function(){
      if($(this).scrollTop() > 300){
        $('.pagetop').fadeIn('slow').css('visibility','visible');
      }else{
        $('.pagetop').fadeOut('slow').css('visibility','hidden');
      }
    });

    $(window).on('scroll', function() {
      var scrollHeight = $(document).height();
      var scrollPosition = $(window).height() + $(window).scrollTop();
      if(scrollHeight - scrollPosition  <= 640){
        $('.pagetop').css({
          'position':'absolute',
          'bottom': '670px'
        });
      }else{
        $('.pagetop').css({
          'position':'fixed',
          'bottom': '30px'
        });
      }
    });

    $('.pagetop>a').on('click',function(){
      $('body,html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  }
})(jQuery);
