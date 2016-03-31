class PlaylistsController < ApplicationController
  def index
    user = User.find_by(email: params[:email])
    playlists = user.playlists
    render json: playlists, include: [songs: { only: [:video_id, :created_at] }]
  end

  def create
    user = User.find_by(email: params[:email])
    playlist = user.playlists.create(playlist_params)

    if playlist.persisted?
      render json: playlist
    else
      head :unprocessable_entity
    end
  end

  def destroy
    user = User.find_by(email: params[:email])
    playlist = user.playlists.find_by(title: params[:title])
    if playlist.destroy
      head :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title)
  end
end
