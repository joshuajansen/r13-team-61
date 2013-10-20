class Organisation < ActiveRecord::Base
  has_many :issues

  validates :name, presence: true
  validates :url, presence: true, uniqueness: true
end
