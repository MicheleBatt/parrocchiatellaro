json.array! @movements.each do | movement |
  json.id movement.id
  json.count_id movement.count_id
  json.amount movement.amount
  json.causal movement.causal
  json.note movement.note
  json.currency_date movement.currency_date.in_time_zone("Europe/Rome").try(:strftime, '%d/%m/%Y')
  json.movement_type movement.movement_type
  json.year movement.year
  json.month movement.month

  if movement.expensive_item.present?
    json.expensive_item_id movement.expensive_item_id
    json.expensive_item do
      json.call(movement.expensive_item, :id, :description, :color)
    end
  end
end