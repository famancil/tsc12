json.extract! tag, :id, :tagname, :description, :user_id, :created_at, :updated_at
json.url user_tag_url(tag.user_id, tag.id)