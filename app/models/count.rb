class Count < ApplicationRecord
  has_many :movements, dependent: :destroy
  has_many :expensive_items, dependent: :destroy

  validates :name, presence: true
  validate :is_valid_initial_amount

  def is_valid_initial_amount
    if self.initial_amount.to_f < 0.0
      errors.add(:initial_amount, 'Initial amount must be positive')
    end
  end
end
