class WelcomeController < ApplicationController
  def index
    @organisation = Organisation.new
    @latest_issues = Issue.limit(10).newest
    render layout: 'frontpage'
  end
end
