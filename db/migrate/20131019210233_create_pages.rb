class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.integer :issue_id
      t.text :body

      t.timestamps
    end
  end
end
