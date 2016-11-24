json.user do 
	json.id user.id
	json.username user.username
	json.password user.password
	json.fullname user.fullname
	json.email user.email
	json.notes do
		json.array! user.notes do |note|
			json.id note.id
			json.title note.title
			json.description note.description
			json.tags do
				json.array! note.tags, :tagname, :description, :user_id
			end
			json.user_id note.user_id
		end
	end
end
json.url user_url user