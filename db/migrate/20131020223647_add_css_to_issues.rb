class AddCssToIssues < ActiveRecord::Migration
  def change
    add_column :issues, :css, :text
  end
end
