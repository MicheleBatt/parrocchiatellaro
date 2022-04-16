class Movement < ApplicationRecord
  belongs_to :expensive_item
  belongs_to :count

  validates :amount, :causal, :movement_type, :currency_date, :year, :month, :year_month, presence: true
  validate :is_valid_amount

  enum movement_type: %w[in out].index_by(&:itself), _prefix: :movement_type

  before_save { self.year = currency_date.year if currency_date }
  before_save { self.month = currency_date.month if currency_date }
  before_save { self.year_month = (currency_date.year.to_s + currency_date.month.to_s.rjust(2, '0')).to_i if currency_date }

  before_update { self.year = currency_date.year if currency_date }
  before_update { self.month = currency_date.month if currency_date }
  before_update { self.year_month = (currency_date.year.to_s + currency_date.month.to_s.rjust(2, '0')).to_i if currency_date }


  def is_valid_amount
    if self.amount.to_f < 0.0
      errors.add(:amount, 'Amount must be positive')
    end
  end

  def parsed_currency_date
    self.currency_date.in_time_zone('Europe/Rome').strftime('%-d %B %Y, %H:%M')
  end
end
