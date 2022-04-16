class Movement < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :expensive_item

  enum movement_type: %w[in out].index_by(&:itself), _prefix: :movement_type

  def parsed_currency_date
    self.currency_date.in_time_zone('Europe/Rome').strftime('%-d %B %Y, %H:%M')
  end
end
