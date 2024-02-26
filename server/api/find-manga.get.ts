import Manga from "~/server/models/manga.schema";
import { z } from "zod";

const config = useRuntimeConfig();

const mangaSchema = z.object({
  title: z.string().default(""),
  status: z
    .string()
    .transform((v) => parseInt(v))
    .default("-1"),
  includetags: z
    .string()
    .transform((v) => v.split(","))
    .default(""),
  excludetags: z
    .string()
    .transform((v) => v.split(","))
    .default(""),
  limit: z
    .string()
    .transform((v) => parseInt(v))
    .default("1"),
  page: z
    .string()
    .transform((v) => parseInt(v))
    .default("1"),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (body) =>
    mangaSchema.safeParse(body)
  );
  if (!query.success) throw query.error.issues;
  return query.data;
});
