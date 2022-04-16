class Backoffice::ExpensiveItemsController < BackofficeController
  before_action :set_expensive_item, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /expensive_items or /expensive_items.json
  def index
    @expensive_items = Count.find(params[:count_id].to_i).expensive_items
  end

  # GET /expensive_items/1 or /expensive_items/1.json
  def show
  end

  # GET /expensive_items/new
  def new
    @expensive_item = ExpensiveItem.new
  end

  # GET /expensive_items/1/edit
  def edit
  end

  # POST /backoffice/expensive_items or /backoffice/expensive_items.json
  def create
    begin
      @expensive_item = ExpensiveItem.new(expensive_item_params)
      @expensive_item.save!

      render json: @expensive_item
    rescue StandardError => e
      Rails.logger.warn e
      render json: { message: e.message }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /expensive_items/1 or /expensive_items/1.json
  def update
    begin
      @expensive_item.update!(expensive_item_params)

      render json: @expensive_item
    rescue StandardError => e
      Rails.logger.warn e
      render json: { message: e.message }, status: :unprocessable_entity
    end
  end

  # DELETE /expensive_items/1 or /expensive_items/1.json
  def destroy
    @expensive_item.destroy

    respond_to do |format|
      format.html { redirect_to backoffice_count_expensive_items_url, notice: "Categoria cancellata con successo!" }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_expensive_item
      @expensive_item = ExpensiveItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def expensive_item_params
      params.require(:expensive_item).permit(:description, :color, :count_id)
    end
end
