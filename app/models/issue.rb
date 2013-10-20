class Issue < ActiveRecord::Base
  acts_as_tenant :organisation

  belongs_to :organisation
  has_many :pages, dependent: :destroy

  scope :newest, order('created_at DESC')

  def preview_image_url
    page_with_background = pages.order(:sort_order).where('background_image_file_name is not null').first

    if page_with_background
      return page_with_background.background_image.url(:thumb)
    end
  end
end
