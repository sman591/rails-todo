var dirty_bit;

$().ready(function() {

	dirty_bit = document.getElementById('page_is_dirty');
	if (dirty_bit.value == '1') restore_local();
	else init_local();

});

function mark_page_dirty() {
	dirty_bit.value = '1';
}

function get_todo_items() {

	data = JSON.parse(localStorage["todo_items"] || "null");
	return data == null ? {} : data;

}

function save_todo_items(data) {
	
	localStorage["todo_items"] = JSON.stringify(data);

}

function restore_local() {
	debug('restore');

	todo_items = get_todo_items();

	if (parseInt(current_path_value_at(2)) % 1 === 0) {

		id = current_path_value_at(2);

		if (current_path_value_at(3) == 'edit')
			$('.todo-item input#todo_item_title').val(todo_items[id].title);
		else {

			$('.todo-item h3').text(todo_items[id].title);

			if (todo_items[id].completed == '1')
				$('.todo-item h3').not('.complete').addClass('complete');
			else
				$('.todo-item h3.complete').removeClass('complete');

		}

		$('.todo-item input[type=checkbox]').prop('checked', (todo_items[id].completed == '1'));

	}
	else {

		$('table.todo-list > tbody > tr').each(function() {

			id = $(this).data('id');

			$(this).find('td:nth-child(1) input[type=checkbox]').prop('checked', (todo_items[id].completed == '1'));
			$(this).find('td:nth-child(2) a').text(todo_items[id].title);

			if (todo_items[id].completed == '1')
				$(this).find('td:nth-child(2) a').not('.complete').addClass('complete');
			else
				$(this).find('td:nth-child(2) a').removeClass('complete');

		});

	}

}

function update_local() {

	debug('update');

	switch (current_path_value_at(2)) {
		case 'complete':
		case 'incomplete':
			remove_deleted_from_local();
		break;
		case undefined:

		break;
		default:

		break;
	}

	load_current_to_local();

}

function load_current_to_local() {

	debug('load current to local');

	todo_items = get_todo_items();

	if (current_path_value_at(2) % 1 === 0) {
		todo_items[current_path_value_at(2)] = {
			'title'		: current_path_value_at(3) == 'edit' ? $('.todo-item input#todo_item_title').val() : $('.todo-item h3').text(),
			'completed'	: ($('.todo-item input[type=checkbox]').is(':checked') ? '1' : '0')
		};
	}
	else {

		$('table.todo-list > tbody > tr').each(function() {

			var id 			= $(this).data('id');
			var title		= $(this).find('td:nth-child(2) a').text();
			var completed 	= $(this).find('td:nth-child(1) input[type=checkbox]').is(':checked') ? 1 : 0;

			todo_items[id] = {
				'title'		: title,
				'completed'	: completed
			};

		});

	}

	save_todo_items(todo_items);

}

function remove_deleted_from_local() {

	debug('remove deleted from local')

	todo_items = get_todo_items();

	if (Object.size(todo_items) == 0)
		return;

	$.each(todo_items, function(id, item){
		if (item.completed == completed_string_to_int(current_path_value_at(2)) && $('table.todo-list > tbody > tr[data-id=' + id + ']').length == 0)
			delete todo_items[id];
	});

	save_todo_items(todo_items);

}

function init_local() {

	debug('init');

	if (localStorage["todo_items"] == undefined || current_path_value_at(2) == undefined)
		localStorage["todo_items"] = "";

	update_local();

}