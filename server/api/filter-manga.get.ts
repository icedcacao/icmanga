import Manga from "~/server/models/manga.schema";
import escapeStringRegexp from "escape-string-regexp";
import { filterMangaSchema } from "../utils/zodIndex";
import projectingManga from "../utils/projectingManga";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (body) =>
    filterMangaSchema.parse(body)
  );
  const title = query.title;
  const status = query.status;
  const includetags = query.includetags;
  const excludetags = query.excludetags;
  const authors = query.authors;
  const limit = query.limit;
  const page = query.page;
  const sort = query.sort;
  const chapterslice = query.chapterslice;
  const mangaoption = query.mangaoption;

  let findQuery = [];
  let projection = projectingManga(mangaoption, chapterslice);

  if (title !== "") {
    findQuery.push({
      title: new RegExp(`.*${escapeStringRegexp(title)}.*`, "i"),
    });
  }
  if (status !== -1) findQuery.push({ status: status });
  if (includetags[0] !== "") findQuery.push({ tags: { $all: includetags } });
  if (excludetags[0] !== "") findQuery.push({ tags: { $nin: excludetags } });
  if (authors[0] !== "") findQuery.push({ authors: { $all: authors } });

  const result = await Manga.find(
    findQuery.length > 0 ? { $and: findQuery } : {},
    projection
  )
    .sort(config.sortingOrder[sort])
    .skip((page - 1) * limit)
    .limit(limit);
  return result;
});
