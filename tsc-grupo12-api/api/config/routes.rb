Rails.application.routes.draw do

  root :to => 'home#index'

  use_doorkeeper
  post 'assignation', to: 'notes#assign'
  resources :users, defaults: { format: 'json' } do
  	resources :notes
  	resources :tags
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end