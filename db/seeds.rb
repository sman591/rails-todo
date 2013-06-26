# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)
TodoItem.create(:title => 'Finish all todo items', :completed => false, :notes => "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ullamcorper nulla non metus auctor fringilla.");
TodoItem.create(:title => 'Fix browser back/forward actions', :completed => true, :notes => "Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.");
TodoItem.create(:title => 'Color the entire whiteboard', :completed => false, :notes => 'The entire whiteboard must be colored in!');
TodoItem.create(:title => 'Utilize local storage', :completed => true, :notes => 'Can be used to fix the back/forward action bug');
TodoItem.create(:title => 'Create repository on GitHub', :completed => true, :notes => 'Create a new repository on GitHub and continue to push commits to to.');
TodoItem.create(:title => 'Run a marathon', :completed => false);
TodoItem.create(:title => 'Create to-do categories', :completed => false, :notes => 'Add the ablity to sort to-do items into categories both in the list view and individual view.');
TodoItem.create(:title => 'Create JSON API to save/delete/add new to-do item(s)', :completed => false);
TodoItem.create(:title => 'Eat cake', :completed => true);
TodoItem.create(:title => 'Add checkboxes to list view', :completed => true, :notes => 'Each checkbox must be well sized and save to database when clicked.');
TodoItem.create(:title => 'Finish blog post', :completed => true, :notes => 'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.');