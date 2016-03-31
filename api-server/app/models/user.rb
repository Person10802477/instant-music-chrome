class User < ActiveRecord::Base
  validates :email, presence: true
  validates :email, uniqueness: true

  has_many :playlists, dependent: :destroy
end
