class Backoffice::CountsController < BackofficeController
  before_action :set_count, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /counts or /counts.json
  def index
    @counts = Count.all.order(id: :asc)
  end

  # GET /counts/1 or /counts/1.json
  def show
    @movements = Movement.where(count_id: @count.id).order(currency_date: :desc, id: :desc)

    @movements = filter_movements(@movements, params)

    @movements = @movements.order(currency_date: :desc, id: :desc)

    @out_amount = @movements.where(movement_type: 'out').sum(&:amount).to_f
    @in_amount = @movements.where(movement_type: 'in').sum(&:amount).to_f
    @in_out_amount = @in_amount - @out_amount

    @movements_amounts_by_expensive_item = Hash.new(0)

    @movements.each do | movement |
      if movement.expensive_item_id.present?
        @movements_amounts_by_expensive_item[movement.expensive_item_id.to_s] += movement.amount
      end
    end

    respond_to do |format|
      format.html { render :show }
      format.json {
        render 'backoffice/counts/count'
      }
    end
  end

  # GET /counts/new
  def new
    @count = Count.new
  end

  # GET /counts/1/edit
  def edit
  end

  # POST /counts or /counts.json
  def create
    @count = Count.new(count_params)

    respond_to do |format|
      if @count.save
        format.html { redirect_to backoffice_counts_url, notice: "Conto Corrente creato con successo!" }
        format.json { render :show, status: :created, location: @count }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @count.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /counts/1 or /counts/1.json
  def update
    respond_to do |format|
      if @count.update(count_params)
        format.html { redirect_to backoffice_counts_url, notice: "Conto Corrente aggiornato con successo!" }
        format.json { render :show, status: :ok, location: @count }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @count.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /counts/1 or /counts/1.json
  def destroy
    @count.destroy

    respond_to do |format|
      format.html { redirect_to backoffice_counts_url, notice: "Conto Corrente cancellato con successo!" }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_count
      @count = Count.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def count_params
      params.require(:count).permit(:name, :description, :initial_amount)
    end

    def filter_movements(movements, params)
      movements = movements.where(expensive_item_id: params[:expensive_item_id]) if params[:expensive_item_id].present?
      movements = movements.where(movement_type: params[:movement_type]) if params[:movement_type].present?
      movements = movements.where('movements.currency_date::date >= ?', params[:from_date]) if params[:from_date].present?
      movements = movements.where('movements.currency_date::date <= ?', params[:to_date]) if params[:to_date].present?
      movements = movements.where('movements.amount::float >= ?', params[:min_amount].to_f) if params[:min_amount].present?
      movements = movements.where('movements.amount::float <= ?', params[:max_amount].to_f) if params[:max_amount].present?
      movements
    end
end
