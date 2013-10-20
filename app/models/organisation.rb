class Organisation < ActiveRecord::Base
  has_many :issues

  validates :name, presence: true
  validates :url, presence: true
  validates :url, uniqueness: true
end
