Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'pages#homepage'


  devise_for :users

  #BACKOFFICE
  namespace :backoffice do
    resources :expensive_items
    resources :movements
  end
end
