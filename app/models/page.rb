class Page < ActiveRecord::Base
  belongs_to :issue
  has_attached_file :background_image, :styles => { :retina => "1536x2048#", :fitting => "768x1024#", :thumb => "192x256#" }
end
