class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :set_organisation_tenant
  set_current_tenant_through_filter

  def current_organisation
    return @current_organisation if defined?(@current_organisation)
    @current_organisation = Organisation.where(url: request.host).first
  end

  def set_organisation_tenant
    set_current_tenant(current_organisation)
  end

end
