module ApplicationHelper
  def flash_messages
    flash.map do |name, msg|
      content_tag :div, msg, :class => "alert alert-#{name}"
    end.join.html_safe
  end
end
