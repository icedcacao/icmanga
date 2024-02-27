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
      .transform((val) => parseInt(val))

      .default("0"),
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
  .refine(
    (data) => data.sort >= 0 && data.sort <= config.sortingOrder.length - 1,
    { path: ["sort"], message: "Sort is invalid" }
  );
