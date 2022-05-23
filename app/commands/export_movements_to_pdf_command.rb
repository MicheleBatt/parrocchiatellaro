module ExportMovementsToPdfCommand
  require "prawn"

  def self.call(count, movements, out_amount, in_amount, in_out_amount, movements_amounts_by_expensive_item, params = {})
    pdf = Prawn::Document.new do
      font 'Helvetica', style: 'bold'
      font_size 26
      text 'Movimenti del ' + count.name.to_s
      text ' '

      # Stampo sul pdf gli eventuali filtri specificati dall'utente per filtrare i movimenti di cassa
      font 'Helvetica', style: 'normal'
      font_size 16
      if params[:expensive_item_id].present?
        expensive_item = ExpensiveItem.find(params[:expensive_item_id])
        text 'Categoria: ' + expensive_item.description.titleize
      end
      if params[:movement_type].present?
        text 'Tipologia di movimenti: Sole ' + (params[:movement_type].downcase == 'in' ? 'Entrate' : 'Uscite')
      end
      if params[:from_date].present? || params[:to_date].present?
        text 'Periodo di riferimento:' +
               (params[:from_date].present? ? ' a partire dal ' + params[:from_date].in_time_zone("Europe/Rome").try(:strftime, '%d/%m/%Y').to_s : '') +
               (params[:to_date].present? ? ' entro il ' + params[:to_date].in_time_zone("Europe/Rome").try(:strftime, '%d/%m/%Y').to_s : '')
      end
      if params[:min_amount].present?
        text 'Ammontare Minimo: ' + params[:min_amount].to_f.round(2).to_s + '€'
      end
      if params[:max_amount].present?
        text 'Ammontare Massimo: ' + params[:max_amount].to_f.round(2).to_s + '€'
      end

      if !params[:expensive_item_id].present? && !params[:movement_type].present? && !params[:from_date].present? &&
         !params[:to_date].present? && !params[:min_amount].present? && !params[:max_amount].present?
        text ' '
        text 'FONDO CASSA ATTUALE: ' + (count.initial_amount + in_amount - out_amount).to_f.round(2).to_s + '€'
      end


      # Costruisco la tabella che riporta il dettaglio di tutti i singoli movimenti
      if movements.present?
        text ' '
        background_colors = []
        table_rows = [%w[Data Causale Importo]]
        movements.each do | movement |
          table_rows += [
            [
              movement.currency_date.in_time_zone("Europe/Rome").try(:strftime, '%d/%m/%Y').to_s,
              movement.causal,
              (movement.movement_type.downcase == 'in' ? '+' : '-') + movement.amount.round(2).to_s + '€'
            ]
          ]
          background_colors << movement.expensive_item.color.gsub('#', '')
        end

        table(
          table_rows,
          :header => true,
          :column_widths => [180, 180, 180],
          row_colors: background_colors,
          :cell_style => { :size => 13, :position => :center }
        ) do
          row(0).font_style = :bold
        end

        text ' '


        # Costruisco la tabella che riporta i totali
        table_rows = []
        if params[:movement_type] != 'out'
          table_rows += [['TOTALE ENTRATE: ', in_amount.round(2).to_s + '€']]
        end
        if params[:movement_type] != 'in'
          table_rows += [['TOTALE USCITE: ', out_amount.round(2).to_s + '€']]
        end
        unless params[:movement_type].present?
          table_rows += [['DIFFERENZA ENTRATE / USCITE: ', in_out_amount.round(2).to_s + '€']]
        end
        table(
          table_rows,
          :column_widths => [360, 180],
          row_colors: ['4FA845', 'F24423', in_out_amount <= 0.0 ? 'F24423' : '4FA845'],
          :cell_style => { :size => 13, :position => :center }
        )


        # Costruisco la tabella che riporta i totali categorizzati per voce di spesa
        unless params[:expensive_item_id].present?
          text ' '
          background_colors = []
          table_rows = []
          count.expensive_items.each do | expensive_item |
            amount_by_expensive_item = movements_amounts_by_expensive_item["#{expensive_item.id.to_s}"]
            table_rows += [
              [
                'AMMONTARE ' + expensive_item.description.to_s.upcase,
                amount_by_expensive_item.round(2).to_s + '€'
              ]
            ]
            background_colors << expensive_item.color.gsub('#', '')
          end

          table(
            table_rows,
            :column_widths => [360, 180],
            row_colors: background_colors,
            :cell_style => { :size => 13, :position => :center }
          )
        end
      end
    end

    pdf.render
  end
end
