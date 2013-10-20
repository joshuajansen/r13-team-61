class WelcomeController < ApplicationController
  def index
    @organisation = Organisation.new
    @latest_issues = Issue.limit(8).order("created_at DESC")
    render layout: 'frontpage'
  end
end
