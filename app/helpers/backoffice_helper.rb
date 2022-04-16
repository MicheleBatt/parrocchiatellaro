module BackofficeHelper

  def current_count_amount(count)
    movements = Movement.where(count_id: count.id)
    out_amount = movements.where(movement_type: 'out').sum(&:amount).to_f
    in_amount = movements.where(movement_type: 'in').sum(&:amount).to_f

    (count.initial_amount.to_f + in_amount - out_amount).round(2)
  end

  def colors(count_id)
    all_colors = [ '#FEC134', '#EE96FC', '#F4B084', '#92D051', '#BFBFBF', '#7246A0', '#A9D08D', '#1BB1F0', '#FFD966', '#C5591E', '#FFFFFF' ]

    all_count_expensive_items = Count.find(count_id).expensive_items&.pluck(:color)

    all_colors - all_count_expensive_items
  end
end
