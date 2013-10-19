class CreateIssues < ActiveRecord::Migration
  def change
    create_table :issues do |t|
      t.string :name
      t.integer :organisation_id

      t.timestamps
    end
  end
end
