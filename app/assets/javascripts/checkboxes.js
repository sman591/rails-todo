(function() {

  $().ready(function(){

    $('.regular-checkbox').change(function() {
      checkbox_clicked(this); 
    });

    $('.check-all').click(function() {
      checkbox_change_all('check');
    });
    $('.uncheck-all').click(function() {
      checkbox_change_all('uncheck');
    });

  });

  function current_url(num) {

    var path = window.location.pathname.split('/');
    
    return path[num];
    
  }

  function checkbox_clicked(checkbox) {

    /* Handles when checkboxes get clicked */

    var completed; 
    if ($(checkbox).is(':checked')) {
      completed = '1';
    } else {
      completed = '0';
    }

    checkbox_change(checkbox, completed);

  }

  function checkbox_change(checkbox, completed) {

    /* Submit request to server */

    var id = $("#" + $(checkbox).attr('id') + "_id").val();
    
    if (id == undefined) {
      return;
    }

    $.ajax({
        type: "PUT",
        url: "/todo_items/complete/" + id,
        data: { completed: completed }
     });

     sync_checkbox(checkbox, completed); 

  }

  function sync_checkbox(checkbox, completed) {

    /* Updates checkbox & title on page to reflect correct checkmark */

    var fadeTime = 800;

    if (completed == 1) {
      
      if (!$(checkbox).is(":checked"))
        $(checkbox).prop('checked', true);

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
    else if (completed == 0) {
    
      if ($(checkbox).is(":checked"))
        $(checkbox).prop('checked', false);

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

  function checkbox_change_all(action) {

    /* Take all of the items on the page and mark them checked/unchecked, process the request to the server */

    switch (action) {

      case 'check':
        completed = 1;
      break;
      case 'uncheck':
        completed = 0;
      break;
      default: 
        alert('Invalid action: ' + action);
        return;
      break;

    }

    $('table.todo-list > tbody > tr').each(function() {

      checkbox_change($(this).find('input[type=checkbox]'), completed);

    });

  }

})();