class Song < ActiveRecord::Base
  validates :video_id, presence: true

  belongs_to :playlist
end
