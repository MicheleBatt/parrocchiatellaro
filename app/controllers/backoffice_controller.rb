class BackofficeController < ApplicationController
  layout 'backoffice'
  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordNotUnique do |exception|
    redirect_back fallback_location: backoffice_root_path, alert: exception.message
  end
end
