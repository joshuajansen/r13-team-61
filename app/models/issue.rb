class Issue < ActiveRecord::Base
  acts_as_tenant :organisation

  belongs_to :organisation
  has_many :pages, dependent: :destroy
end
