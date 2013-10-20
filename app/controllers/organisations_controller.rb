class OrganisationsController < ApplicationController

  def new
    @organisation = Organisation.new
  end

  def create
    @organisation = Organisation.new(organisation_params)

    if @organisation.valid?
      @organisation.url = "#{organisation_params[:url]}.#{request.host}"
    end

    if @organisation.save
      redirect_to "#{request.protocol}#{@organisation.url}/issues", notice: 'Organisation was successfully created.' 
    else
      render action: 'new', layout: 'frontpage'
    end
  end

  private

    def organisation_params
      params.require(:organisation).permit(:name, :url)
    end
end
