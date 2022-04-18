json.extract! count, :id, :name, :description, :iban, :initial_amount, :created_at, :updated_at
json.url count_url(count, format: :json)

json.out_amount @out_amount
json.in_amount @in_amount
json.in_out_amount @in_out_amount
json.amounts_by_expensive_items @movements_amounts_by_expensive_item

json.movements do
  json.partial! 'backoffice/counts/movements', as: :movements
end