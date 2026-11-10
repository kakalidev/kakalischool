$(document).ready(function(){
  const fontSizeScript = document.createElement('script');
  fontSizeScript.src = 'js/font-size-controls.js';
  document.head.append(fontSizeScript);

  $('#search-box').on('submit', function(e){
    e.preventDefault();
  });

  $('#search-icon').click(function(){
    $(this).toggleClass('fa-times');
    $('#search-box').toggleClass('active');
  });

  $('#menu').click(function(){
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('resize', function(){
    if(window.innerWidth > 991){
      $('#menu').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');
    }
  });

  $(window).on('scroll load',function(){

    $('#search-icon').removeClass('fa-times');
    $('#search-box').removeClass('active');

    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if($(window).scrollTop() > 0){
      $('header').addClass('sticky');
    }else{
      $('header').removeClass('sticky');
    }

  });

  $('a[href*="#"]').on('click',function(e){
    if ($(this).hasClass('skip-link')) return;
    e.preventDefault();
    $('html, body').animate({
      scrollTop : $($(this).attr('href')).offset().top,
    }, 500, 'linear');
  });

});
