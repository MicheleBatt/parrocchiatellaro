class AddColumnsToMovements < ActiveRecord::Migration[7.0]
  def change
    add_reference :movements, :count, null: false, foreign_key: true
    change_column :movements, :amount, :float, null: false
    change_column :movements, :causal, :text, null: false
    change_column :movements, :movement_type, :string, null: false
    change_column :movements, :currency_date, :datetime, null: false
    add_column :movements, :year, :integer, null: false
    add_column :movements, :month, :integer, null: false
    add_column :movements, :year_month, :integer, null: false
    remove_column :movements, :user_id
  end
end
