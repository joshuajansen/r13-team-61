Flipsum::Application.routes.draw do
  constraints lambda { |request| request.subdomains.include?('www') || request.subdomains.empty? } do
    root 'welcome#index'
  end

  constraints lambda { |request| request.subdomains.any? && !request.subdomains.include?('www') } do
    get '/', to: 'kiosk#index'
  end

  resources :organisations, only: [:new, :create]

  resources :issues do
    resources :pages
  end
end
