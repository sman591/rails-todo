(function() {

  $().ready(function(){
    $('.regular-checkbox').change(function() {
      var id = $("#" + $(this).attr('id') + "_id").val();
      var completed; 
      if ($(this).is(':checked')) {
        completed = '1';
      } else {
        completed = '0';
      } 
      $.ajax({
          type: "PUT",
          url: "/todo_items/complete/" + id,
          data: { completed: completed }
       });
       sync_checkbox(this);     
    });
  });

  function current_url(num) {
    
    var path = window.location.pathname.split('/');
    
    return path[num];
    
  }

  function sync_checkbox(checkbox) {

    var fadeTime = 800;

    if ($(checkbox).is(':checked')) {
      
      if ($(checkbox).parent().parent().is('tr'))
        $title = $(checkbox).parent().parent().find('td:nth-child(2) a');
      else
        $title = $(checkbox).parent().parent().find('h3');

      $title.removeClass('incomplete').addClass('complete');

      if (current_url(2) == 'incomplete') {
        $(checkbox).attr('disabled', 'disabled');
        $(checkbox).parent().parent().children().children().delay(200).fadeOut(fadeTime);
        setTimeout(function() {
          $(checkbox).parent().parent().remove();
        }, fadeTime);
      }
    
    }
    else {
    
      if ($(checkbox).parent().parent().is('tr'))
        $title = $(checkbox).parent().parent().find('td:nth-child(2) a.complete');
      else
        $title = $(checkbox).parent().parent().find('h3');

      $title.removeClass('complete').addClass('incomplete');
    
      if (current_url(2) == 'complete') {
        $(checkbox).attr('disabled', 'disabled');
        $(checkbox).parent().parent().children().children().delay(200).fadeOut(fadeTime);
        setTimeout(function() {
          $(checkbox).parent().parent().remove();
        }, fadeTime);
      }
    
    }

  }

})();