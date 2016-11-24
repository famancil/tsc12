class ApplicationController < ActionController::Base
  include ActionController::HttpAuthentication::Basic::ControllerMethods
  before_action :doorkeeper_authorize!
end
