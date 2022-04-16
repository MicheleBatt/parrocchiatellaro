json.array! @expensive_items.each do | expensive_item |
  json.id expensive_item.id
  json.description expensive_item.description
  json.color expensive_item.color
end