class CreateTodoItems < ActiveRecord::Migration
  def change
    create_table :todo_items do |t|
      t.string :title
      t.boolean :completed
      t.text :notes

      t.timestamps
    end
  end
end
