class RemoveNotNullValidationControlToUserIdOnMovements < ActiveRecord::Migration[7.0]
  def change
    change_column_null :movements, :user_id, :null => true
  end
end
