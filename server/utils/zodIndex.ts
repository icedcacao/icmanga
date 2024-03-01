import { z } from "zod";

const config = useRuntimeConfig();

export const findQuerySchema = z
  .object({
    title: z
      .string()
      .transform((val) => val.trim())
      .default(""),
    status: z
      .string()
      .transform((val) => parseInt(val))
      .default("-1"),
    includetags: z
      .string()
      .transform((val) => val.split(",").map((v) => v.trim()))
      .default(""),
    excludetags: z
      .string()
      .transform((val) => val.split(",").map((v) => v.trim()))
      .default(""),
    authors: z
      .string()
      .transform((val) => val.split(",").map((v) => v.trim()))
      .default(""),
    limit: z
      .string()
      .transform((val) => parseInt(val))
      .default(`${config.searchLimit.min}`),
    page: z
      .string()
      .transform((val) => parseInt(val))
      .default("1"),
    sort: z
      .string()
      .transform((val) => val.trim())
      .default("updatedDes"),
    chapterslice: z
      .string()
      .transform((val) => parseInt(val))
      .default("-1"),
    mangaoption: z
      .string()
      .transform((val) => val.trim())
      .default("minimal"),
  })
  .refine((data) => data.status >= -1 && data.status <= 1, {
    path: ["status"],
    message: "Status is invalid",
  })
  .refine(
    (data) =>
      data.limit >= config.searchLimit.min &&
      data.limit <= config.searchLimit.max,
    { path: ["limit"], message: "Limit is invalid" }
  )
  .refine((data) => data.page > 0, {
    path: ["page"],
    message: "Page is invalid",
  })
  .refine((data) => config.sortingOrder[data.sort] !== undefined, {
    path: ["sort"],
    message: "Sort is invalid",
  })
  .refine((data) => data.chapterslice >= -9999 && data.chapterslice <= 9999, {
    path: ["chapterslice"],
    message: "Chapterslice is invalid",
  })
  .refine((data) => config.mangaOption[data.mangaoption] !== undefined, {
    path: ["mangaoption"],
    message: "Mangaoption is invalid",
  });
