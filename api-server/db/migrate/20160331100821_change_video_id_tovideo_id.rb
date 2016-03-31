class ChangeVideoIdTovideoId < ActiveRecord::Migration
  def change
    rename_column :songs, :videoId, :video_id
  end
end
