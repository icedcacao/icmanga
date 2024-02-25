import { Schema, model } from "mongoose";

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model("Tag", TagSchema);
