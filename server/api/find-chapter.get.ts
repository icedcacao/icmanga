import Manga from "~/server/models/manga.schema";
import mongoose from "mongoose";
import { findChapterByIdSchema } from "../utils/zodIndex";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (body) =>
    findChapterByIdSchema.parse(body)
  );
  const mangaid = query.mangaid;
  const chaptersid = query.chaptersid;
  const chapterid = query.chapterid;
  const result = await Manga.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(mangaid),
      },
    },
    {
      $unwind: "$chapters",
    },
    {
      $match: {
        "chapters._id": new mongoose.Types.ObjectId(chaptersid),
      },
    },
    {
      $unwind: "$chapters.chapter",
    },
    {
      $match: {
        "chapters.chapter._id": new mongoose.Types.ObjectId(chapterid),
      },
    },
    {
      $project: {
        images: "$chapters.chapter.images",
      },
    },
  ]);
  return result;
});
