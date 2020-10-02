Rails.application.routes.draw do

  root 'welcome#index'

  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  defaults format: :json do
    resources :participants
    resources :interviews
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
