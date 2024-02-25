import { Schema, model } from "mongoose";

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model("Author", AuthorSchema);
