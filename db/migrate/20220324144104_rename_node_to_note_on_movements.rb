class RenameNodeToNoteOnMovements < ActiveRecord::Migration[7.0]
  def change
    rename_column :movements, :node, :note
  end
end
