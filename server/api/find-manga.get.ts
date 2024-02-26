import Manga from "~/server/models/manga.schema";
import { z } from "zod";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const searchFilter = {
    title: query.title,
    status: query.status,
  };
});
