(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $(document).ready(function(){
      $('.modal').modal();
    });
    $(document).ready(function(){
      $('.tap-target').tapTarget();
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function(){
  $('.tabs').tabs();
});

      