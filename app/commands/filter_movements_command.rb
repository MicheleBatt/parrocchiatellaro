module FilterMovementsCommand
  def self.call(movements, params = {})

    # if params[:page].to_s == ''
    #
    # else
      movements = movements.where(expensive_item_id: params[:expensive_item_id]) if params[:expensive_item_id].present?
      movements = movements.where('movements.currency_date::date >= ?', params[:from_date]) if params[:from_date].present?
      movements = movements.where('movements.currency_date::date <= ?', params[:to_date]) if params[:to_date].present?
      movements = movements.where('movements.amount >= ?', params[:min_amount].to_f) if params[:min_amount].present?
      movements = movements.where('movements.amount <= ?', params[:min_amount].to_f) if params[:min_amount].present?
    # end

    movements
  end
end
