require 'test_helper'
 
class TodoItemsIntegrationTest < ActionDispatch::IntegrationTest
	fixtures :todo_items

	test "should redirect to index with not found error" do

		get "/todo_items/3"
		assert_response :redirect
		assert_redirected_to controller: "todo_items", action: "index"
		follow_redirect!
		assert_select "div.alert-error", "To-Do item not found"

	end

	test "submit a todo item check/uncheck request" do

		id = "1";

		get "/todo_items/" + id;
		assert_response :success

		put "/todo_items/complete/" + id, :completed => 1
		assert_response :success

		assert TodoItem.find(1).completed

		put "/todo_items/complete/" + id, :completed => 0
		assert_response :success

		assert !TodoItem.find(1).completed

	end
end