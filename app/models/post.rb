# frozen_string_literal: true

class Post < ApplicationRecord
  has_one_attached :image

  before_save :write_uploaded_at

  private

  def write_uploaded_at
    self.uploaded_at = Time.zone.now
  end
end
