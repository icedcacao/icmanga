import Manga from "~/server/models/manga.schema";
import { findMangaByIdSchema } from "../utils/zodIndex";

import projectingManga from "../utils/projectingManga";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (body) =>
    findMangaByIdSchema.parse(body)
  );
  const mangaid = query.mangaid;
  const chapterslice = query.chapterslice;
  const mangaoption = query.mangaoption;

  let projection = projectingManga(mangaoption, chapterslice);
  const result = await Manga.findById(mangaid, projection);
  return result;
});
