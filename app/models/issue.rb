class Issue < ActiveRecord::Base
  belongs_to :organisation
  acts_as_tenant :organisation
end
