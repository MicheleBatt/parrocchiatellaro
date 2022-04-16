module ApplicationHelper
  def from_jbuilder(template, options = {})
    JbuilderTemplate
      .new(self) { |json| json.partial! template, options }.attributes!
  end
end
