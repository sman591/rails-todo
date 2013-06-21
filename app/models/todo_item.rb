class TodoItem < ActiveRecord::Base
  attr_accessible :completed, :notes, :title
  validates_presence_of :title
end
