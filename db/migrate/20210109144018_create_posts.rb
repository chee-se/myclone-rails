# frozen_string_literal: true

class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.datetime :uploaded_at, null: false
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
