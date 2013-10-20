require 'intercity/capistrano'
require 'bundler/capistrano'

set :application, "flipsum_production"
set :repository,  "git@github.com:railsrumble/r13-team-61.git"

set :scm, :git

server "flipsum.r13.railsrumble.com", :web, :app, :db, primary: true

after "deploy:restart", "deploy:cleanup"