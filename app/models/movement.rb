class Movement < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :expensive_item
  belongs_to :count

  enum movement_type: %w[in out].index_by(&:itself), _prefix: :movement_type

  before_save { self.year = currency_date.year if currency_date }
  before_save { self.month = currency_date.month if currency_date }
  before_save { self.year_month = (currency_date.year.to_s + currency_date.month.to_s.rjust(2, '0')).to_i if currency_date }

  before_update { self.year = currency_date.year if currency_date }
  before_update { self.month = currency_date.month if currency_date }
  before_update { self.year_month = (currency_date.year.to_s + currency_date.month.to_s.rjust(2, '0')).to_i if currency_date }

  def parsed_currency_date
    self.currency_date.in_time_zone('Europe/Rome').strftime('%-d %B %Y, %H:%M')
  end
end
