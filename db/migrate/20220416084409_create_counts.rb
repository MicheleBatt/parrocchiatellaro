class CreateCounts < ActiveRecord::Migration[7.0]
  def change
    create_table :counts do |t|
      t.string :name, default: "", null: false
      t.text :description
      t.float :initial_amount, default: 0.0, null: false

      t.timestamps
    end
  end
end
