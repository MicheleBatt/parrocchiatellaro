class BackofficeController < ApplicationController
  layout 'backoffice'
  authorize_resource
  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordNotUnique do |exception|
    redirect_back fallback_location: backoffice_root_path, alert: exception.message
  end

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.html { redirect_to root_path, notice: exception.message }
    end
  end
end
