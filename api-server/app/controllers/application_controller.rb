class ApplicationController < ActionController::API
  require 'open-uri'

  def email_from_token(token)
    resp = open("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=#{token}").read
    json = JSON.parse(resp)
    json["email"]
  rescue OpenURI::HTTPError => e
    render :status => :bad_request, text: e.message
  end

  def set_user
    email = email_from_token(params[:access_token])
    @user = User.find_by(email: email) || User.create(email: email)

    unless @user
      head :bad_request
    end
  end
end
