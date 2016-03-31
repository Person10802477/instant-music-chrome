class SongsController < ApplicationController
  def index
    user = User.find_by(email: params[:email])
    playlist = user.playlists.find_by(title: params[:playlist_title])
    songs = playlist.songs
    render json: songs, only: [:video_id, :created_at]
  end

  def create
    user = User.find_by(email: params[:email])
    playlist = user.playlists.find_by(title: params[:playlist_title])
    song = playlist.songs.create(song_params)
    
    # NOTE: is it unnecessary to do this?
    if song.persisted?
      render json: song
    else
      head :unprocessable_entity
    end
  end

  private

  def song_params
    params.require(:song).permit(:video_id)
  end
end
