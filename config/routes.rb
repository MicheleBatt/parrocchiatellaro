Rails.application.routes.draw do
  resources :counts
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'pages#homepage'


  devise_for :users

  #BACKOFFICE
  namespace :backoffice do
    resources :counts do
      resources :expensive_items
    end
    resources :movements
  end
end
