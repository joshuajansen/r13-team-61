class WelcomeController < ApplicationController
  def index
    @organisation = Organisation.new
    render layout: 'frontpage'
  end
end
