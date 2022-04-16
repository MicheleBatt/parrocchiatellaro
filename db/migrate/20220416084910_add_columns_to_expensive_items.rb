class AddColumnsToExpensiveItems < ActiveRecord::Migration[7.0]
  def change
    add_reference :expensive_items, :count, null: false, foreign_key: true
    add_column :expensive_items, :color, :string, null: false
    change_column :expensive_items, :description, :string, null: false
  end
end
