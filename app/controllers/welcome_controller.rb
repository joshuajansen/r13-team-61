class WelcomeController < ApplicationController
  def index
    @organisation = Organisation.new
    @latest_issues = Issue.limit(8).newest
    render layout: 'frontpage'
  end
end
