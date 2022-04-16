class ExpensiveItem < ApplicationRecord
  has_many :movements, dependent: :destroy
  belongs_to :count

  validates :description, presence: true, :uniqueness => { scope: :count }
  validates :color, presence: true, :uniqueness => { scope: :count }
end
