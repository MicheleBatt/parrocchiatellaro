class AddIndexesToExpensiveItems < ActiveRecord::Migration[7.0]
  def change
    add_index :expensive_items, [:count_id, :description], unique: true
    add_index :expensive_items, [:count_id, :color], unique: true
  end
end
