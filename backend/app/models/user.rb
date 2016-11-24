class User < ApplicationRecord
	validates :username, presence: true
	validates :fullname, presence: true
	validates :email, presence: true
	validates :password, presence: true	
	has_many :notes 
	has_many :tags
end
