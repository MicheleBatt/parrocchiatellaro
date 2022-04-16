class ExpensiveItem < ApplicationRecord
  has_many :movements, dependent: :destroy

  validates :description, presence: true, uniqueness: true
end
