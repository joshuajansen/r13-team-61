class IssuesController < ApplicationController
  before_filter :require_organisation
  before_action :set_issue, only: [:show, :edit, :update, :destroy]

  def index
    @issues = Issue.all
  end

  def show
    render layout: "issue"
  end

  def new
    @issue = Issue.new
  end

  def edit
  end

  def create
    @issue = Issue.new

    if @issue.save
      redirect_to issue_pages_url(@issue), notice: 'Issue was successfully created.'
    else
      render action: 'new'
    end
  end

  def update
    if @issue.update(issue_params)
      redirect_to issue_pages_url(@issue), notice: 'Issue was successfully updated.'
    else
      render action: 'edit'
    end
  end

  def destroy
    @issue.destroy
    redirect_to issues_url
  end

  private

    def set_issue
      @issue = Issue.find(params[:id])
    end


    def issue_params
      params.require(:issue).permit(:name, :css)
    end
end
