class RenameSubdomainToUrlForOrganisations < ActiveRecord::Migration
  def change
    rename_column :organisations, :subdomain, :url
  end
end
