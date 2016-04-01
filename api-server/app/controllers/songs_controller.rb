class SongsController < ApplicationController
  before_action :set_playlist

  def index
    # playlist = @user.playlists.find_by(title: params[:playlist_title])
    songs = @playlist.songs
    render json: songs, only: [:video_id, :created_at]
  end

  def create
    # playlist = @user.playlists.find_by(title: params[:playlist_title])
    song = @playlist.songs.create(song_params)
    
    # NOTE: is it unnecessary to do this?
    if song.persisted?
      render json: song
    else
      head :unprocessable_entity
    end
  end

  private

  def song_params
    params.permit(:video_id, :title)
  end

  def set_playlist
    set_user
    @playlist = @user.playlists.find_by(title: params[:playlist_title])
    head :unprocessable_entity unless @playlist
  end
end
