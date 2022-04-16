class RenameExpensiveItemsIdToExpensiveItemIdOnMovements < ActiveRecord::Migration[7.0]
  def change
    rename_column :movements, :expensive_items_id, :expensive_item_id
  end
end
