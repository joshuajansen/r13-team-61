class PagesController < ApplicationController
  before_action :set_issue, only: [:index, :show, :edit, :create, :update, :destroy]
  before_action :set_page, only: [:show, :edit, :update, :destroy]

  def index
    @pages = @issue.pages
  end

  def show
  end

  def new
    @issue = Issue.find(params[:issue_id])
    @page = @issue.pages.new
  end

  def edit
  end

  def create
    @page = @issue.pages.new(page_params)

    if @page.save
      redirect_to issue_page_url(@issue, @page), notice: 'Page was successfully created.' 
    else
      render action: 'new'
    end
  end

  def update
    if @page.update(page_params)
      redirect_to issue_page_url(@issue, @page), notice: 'Page was successfully updated.'
    else
      render action: 'edit' 
    end
  end

  def destroy
    @page.destroy
    redirect_to pages_url 
  end

  private

    def set_issue
      @issue = Issue.find(params[:issue_id])
    end
    
    def set_page
      @page = @issue.pages.where(id: params[:id]).first
    end


    def page_params
      params.require(:page).permit(:body)
    end
end
