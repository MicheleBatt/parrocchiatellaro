class Backoffice::ExpensiveItemsController < BackofficeController
  before_action :set_expensive_item, only: %i[ show edit update destroy ]

  # GET /expensive_items or /expensive_items.json
  def index
    @expensive_items = ExpensiveItem.all
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

  # POST /expensive_items or /expensive_items.json
  def create
    @expensive_item = ExpensiveItem.new(expensive_item_params)

    respond_to do |format|
      if @expensive_item.save
        format.html { redirect_to expensive_item_url(@expensive_item), notice: "Expensive item was successfully created." }
        format.json { render :show, status: :created, location: @expensive_item }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @expensive_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /expensive_items/1 or /expensive_items/1.json
  def update
    respond_to do |format|
      if @expensive_item.update(expensive_item_params)
        format.html { redirect_to expensive_item_url(@expensive_item), notice: "Expensive item was successfully updated." }
        format.json { render :show, status: :ok, location: @expensive_item }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @expensive_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /expensive_items/1 or /expensive_items/1.json
  def destroy
    @expensive_item.destroy

    respond_to do |format|
      format.html { redirect_to expensive_items_url, notice: "Expensive item was successfully destroyed." }
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
      params.require(:expensive_item).permit(:description)
    end
end
