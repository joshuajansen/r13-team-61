class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_organisation
  before_filter :set_organisation_tenant
  set_current_tenant_through_filter
  
  before_filter :redirect_railsrumble


  def redirect_railsrumble
    redirect_to "http://flipsum.com" if request.host == "flipsum.r13.railsrumble.com"
  end

  def current_organisation
    return @current_organisation if defined?(@current_organisation)
    @current_organisation = Organisation.where(url: request.host).first
  end

  def set_organisation_tenant
    set_current_tenant(current_organisation)
  end

  def require_organisation
    unless current_organisation
      redirect_to root_url, notice: "Organisation is required for this action."
    end
  end
end
