class WelcomeController < ApplicationController
  def index
    @organisation = Organisation.new
    @latest_issues = Issue.newest().limit(8)
    render layout: 'frontpage'
  end
end
