json.extract! note, :id, :title, :description, :tags, :user_id, :created_at, :updated_at
json.url user_note_url(note.user_id, note.id)