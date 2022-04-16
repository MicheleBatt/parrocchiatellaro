class Count < ApplicationRecord
  has_many :movements, dependent: :destroy
  has_many :expensive_items, dependent: :destroy
end
