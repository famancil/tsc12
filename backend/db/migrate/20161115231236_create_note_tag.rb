class CreateNoteTag < ActiveRecord::Migration[5.0]
  def change
    create_table :notes_tags do |t|
      t.references :note, foreign_key: true
      t.references :tag, foreign_key: true
    end
    add_index :notes_tags, [:note_id, :tag_id], :unique => true
  end
end
