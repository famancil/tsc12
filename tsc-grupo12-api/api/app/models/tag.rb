class Tag < ApplicationRecord
	validates :tagname, presence: true
	validates :description, presence: true
	belongs_to :user
	has_and_belongs_to_many :notes
end
