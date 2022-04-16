class CreateExpensiveItems < ActiveRecord::Migration[7.0]
  def change
    create_table :expensive_items do |t|
      t.text :description

      t.timestamps
    end
  end
end
