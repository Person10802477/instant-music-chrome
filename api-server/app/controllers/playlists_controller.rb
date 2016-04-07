class PlaylistsController < ApplicationController
  before_action :set_user

  def index
    playlists = @user.playlists
    render json: playlists, include: [songs: { only: [:video_id, :title, :created_at] }]
  end

  def create
    playlist = @user.playlists.create(playlist_params)

    if params[:songs]
      songs = params[:songs].map { |s| {title: s[:title], video_id: s[:videoId]}}
      playlist.songs.create(songs)
    end

    if playlist.persisted?
      tracker = Staccato.tracker('UA-75139981-5')
      tracker.event(category: 'playlist', action: 'add', label: @user.email, value: playlist.title)
      render json: playlist, include: [songs: { only: [:video_id, :title, :created_at] }]
    else
      head :unprocessable_entity
    end
  end

  def destroy
    playlist = @user.playlists.find_by(title: params[:title])
    if playlist.destroy
      head :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def playlist_params
    params.permit(:title)
  end
end
