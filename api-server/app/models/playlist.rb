class Playlist < ActiveRecord::Base
  validates :title, presence: true

  belongs_to :user

  has_many :songs, dependent: :destroy
end

# How do I ensure one user cannot have two playlists with the same title?
