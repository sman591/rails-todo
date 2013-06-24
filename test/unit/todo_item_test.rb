require 'test_helper'

class TodoItemTest < ActiveSupport::TestCase
  test "Do not allow todos without title" do
  	item = TodoItem.new
  	assert !item.save, "Saved item without a title"
  end
end
