(function() {

  $().ready(function(){

    /* All checkbox-relavent onReady code */

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
      if (current_path_value_at(2) % 1 == 0)
        id = current_path_value_at(2);
      else
        return;
    }

    $.ajax({
        type: "PUT",
        url: "/todo_items/complete/" + id,
        data: { completed: completed }
     });

    update_local();

    sync_checkbox(checkbox, completed); 

  }

  function sync_checkbox(checkbox, completed) {

    /* Updates checkbox & title on page to reflect correct checkmark */

    var fadeTime = 500;

    if (completed == 1) {
      
      if (!$(checkbox).is(":checked"))
        $(checkbox).prop('checked', true);

      if ($(checkbox).parent().parent().is('tr'))
        $title = $(checkbox).parent().parent().find('td:nth-child(2) a');
      else
        $title = $(checkbox).parent().parent().find('h3');

      $title.removeClass('incomplete').addClass('complete');

      if (current_path_value_at(2) == 'incomplete') {
        $(checkbox).attr('disabled', 'disabled');
        $(checkbox).parent().parent().children().children().delay(fadeTime/4).fadeOut(fadeTime);
        setTimeout(function() {
          $(checkbox).parent().parent().remove();
          sync_table_empty_messages();
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
    
      if (current_path_value_at(2) == 'complete') {
        $(checkbox).attr('disabled', 'disabled');
        $(checkbox).parent().parent().children().children().delay(200).fadeOut(fadeTime);
        setTimeout(function() {
          $(checkbox).parent().parent().remove();
          sync_table_empty_messages();
        }, fadeTime);
      }
    
    }

  }

  function sync_table_empty_messages() {

    /* Display empty table message if table has no remaining rows */

    if ($('table.todo-list > tbody > tr').size() < 1) {

      if (current_path_value_at(2) == undefined)
        id_extension = 'todos';
      else
        id_extension = current_path_value_at(2);

      console.log('#no-' + id_extension);

      $('.multi-actions').remove()
      $('#no-' + id_extension).fadeIn(300);

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