$.noConflict();
jQuery( document ).ready(function( $ ) {

    // sidebar menu active class
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

    // sidebar scroll
    function changeSize() {
      var width = parseInt($("#Width").val());
      var height = parseInt($("#Height").val());

      if(!width || isNaN(width)) {
        width = 600;
      }
      if(!height || isNaN(height)) {
        height = 400;
      }
      $("#sidebar").width(width).height(height);
      Ps.update(document.getElementById('sidebar'));
    }
    $(function() {
      Ps.initialize(document.getElementById('sidebar'));
    });

});
