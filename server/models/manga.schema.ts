import { Schema, model } from "mongoose";

const ChapterSchema = new Schema({
  translator: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  images: [String],
});

const MangaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authors: [String],
    status: {
      type: Boolean,
      required: true,
      default: 0,
    },
    chapter_count: {
      type: Number,
      required: true,
      default: 0,
    },
    last_chapter: {
      translator: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
    },
    cover_image_url: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: [String],
    rating: {
      type: Number,
      required: true,
      default: 0.0,
    },
    rating_count: {
      type: Number,
      required: true,
      default: 0,
    },
    favorite_count: {
      type: Number,
      default: 0,
    },
    chapters: [
      {
        chapter_number: {
          type: Number,
        },
        chapter: [ChapterSchema],
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default model("Manga", MangaSchema);
