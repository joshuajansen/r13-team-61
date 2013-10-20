class Organisation < ActiveRecord::Base
  has_many :issues

  validates :name, presence: true
  validates :url, presence: true
  validates :url, uniqueness: true

  after_create :create_example_issue

  def create_example_issue
    issue = self.issues.new(name: "Example Issue", css: "
      #page-1 h1{
        color:white;
        text-shadow: 0px 0px 5px rgba(150, 150, 150, 1);
      }
    ")
    
    front_img = File.open(Rails.root.join('lib', 'assets', 'example_issue', 'front.jpg'))
    front_page = Page.new(body: "# Example Magazine")
    front_page.background_image = front_img
    front_img.close
    issue.pages << front_page

    middle_page = File.read(Rails.root.join('lib', 'assets', 'example_issue', 'page.txt'))
    info_page = Page.new(body: middle_page )
    issue.pages << info_page

    back_img = File.open(Rails.root.join('lib', 'assets', 'example_issue', 'back.jpg'))
    back_page = Page.new(body: "# RailsRumble 2013")
    back_page.background_image = back_img
    back_img.close
    issue.pages << back_page

    issue.save!
  end
end
