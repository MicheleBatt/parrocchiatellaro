class AddIbanToCounts < ActiveRecord::Migration[7.0]
  def change
    add_column :counts, :iban, :string
  end
end
