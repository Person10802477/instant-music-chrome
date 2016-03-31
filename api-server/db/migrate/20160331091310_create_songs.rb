class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.references :playlist, index: true, foreign_key: true
      t.string :video_id, null: false
      t.string :title, null: false

      t.timestamps null: false
    end
  end
end
