import Manga from "~/server/models/manga.schema";
import { z } from "zod";

const config = useRuntimeConfig();

const mangaSchema = z.object({
  title: z.string().default(""),
  status: z
    .string()
    .transform((v) => parseInt(v))
    .default(""),
  includetags: z
    .string()
    .transform((v) => v.split(","))
    .default(""),
  excludetags: z
    .string()
    .transform((v) => v.split(","))
    .default(""),
  authors: z
    .string()
    .transform((v) => v.split(","))
    .default(""),
  limit: z
    .string()
    .transform((v) => parseInt(v))
    .default(""),
  page: z
    .string()
    .transform((v) => parseInt(v))
    .default(""),
  sort: z
    .string()
    .transform((v) => parseInt(v))
    .default(""),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (body) =>
    mangaSchema.safeParse(body)
  );
  if (!query.success) throw query.error.issues;
  const title = query.data.title;
  const status = query.data.status;
  const includetags = query.data.includetags;
  const excludetags = query.data.excludetags;
  const authors = query.data.authors;
  const limit = query.data.limit;
  const page = query.data.page;
  const sort = query.data.sort;
  let queryArr = [];
  if (title !== "")
    queryArr.push({ $text: { $search: title, $caseSensitive: false } });
  if (status >= 0 && status <= 1) queryArr.push({ status: status });
  if (includetags[0] !== "") queryArr.push({ tags: { $all: includetags } });
  return queryArr;
});
