import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Author from "~/server/models/author.schema";
import Manga from "~/server/models/manga.schema";
import Tag from "~/server/models/tag.schema";
import User from "~/server/models/user.schema";

(async () => {
  const config = useRuntimeConfig();
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB!");
  } catch (e) {
    console.error(e);
  }
})();
