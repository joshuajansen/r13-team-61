class KioskController < ApplicationController
  before_filter :require_organisation

  def index
    @organisation = current_organisation
    @issues = @organisation.issues
  end
end
