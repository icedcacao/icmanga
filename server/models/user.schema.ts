import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "guest",
    },
    avatar_image_url: {
      type: String,
    },
    description: {
      type: String,
    },
    favorite_manga: [
      {
        type: Schema.Types.ObjectId,
        ref: "Manga",
      },
    ],
  },
  { timestamps: true }
);

export default model("User", UserSchema);
