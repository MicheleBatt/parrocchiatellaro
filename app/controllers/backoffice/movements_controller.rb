class Backoffice::MovementsController < BackofficeController
  before_action :set_movement, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /movements or /movements.json
  def index
    @movements = Movement.all

    respond_to do |format|
      format.html { render :index }
      format.json {
        render 'index.json.jbuilder'
      }
    end
  end

  # GET /movements/1 or /movements/1.json
  def show
  end

  # GET /movements/new
  def new
    @movement = Movement.new
  end

  # GET /movements/1/edit
  def edit
  end

  # POST /movements or /movements.json
  def create
    begin
      @movement = Movement.new(movement_params)
      @movement.save!

      render json: @movement
    rescue StandardError => e
      render json: { messages: e.message }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /movements/1 or /movements/1.json
  def update
    begin
      @movement.update!(movement_params)

      render json: @movement
    rescue StandardError => e
      Rails.logger.warn e
      render json: { message: e.message }, status: :unprocessable_entity
    end
  end

  # DELETE /movements/1 or /movements/1.json
  def destroy
    begin
      @movement.destroy

      render json: {}
    rescue StandardError => e
      Rails.logger.warn e
      render json: { message: e.message }, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_movement
      @movement = Movement.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def movement_params
      params.require(:movement).permit(:expensive_item_id, :amount, :causal, :movement_type, :currency_date, :note, :count_id, :document)
    end
end
