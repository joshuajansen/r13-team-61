class AddBackgroundImageToPages < ActiveRecord::Migration
  def change
    add_attachment :pages, :background_image
  end
end
