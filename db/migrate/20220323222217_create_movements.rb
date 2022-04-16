class CreateMovements < ActiveRecord::Migration[7.0]
  def change
    create_table :movements do |t|
      t.references :user, null: false, foreign_key: true
      t.references :expensive_items, null: false, foreign_key: true
      t.float :amount
      t.text :causal
      t.string :movement_type
      t.datetime :currency_date
      t.text :node

      t.timestamps
    end
  end
end
