const config = useRuntimeConfig();

export default (mo: any, cs: Number) => {
  let projection = {
    ...config.mangaOption[mo],
    chapters: {
      $map: {
        input: {
          $slice: ["$chapters", cs],
        },
        as: "chapter",
        in: {
          chapter_number: "$$chapter.chapter_number",
          chapter: {
            $map: {
              input: "$$chapter.chapter",
              as: "info",
              in: {
                language: "$$info.language",
                translator: "$$info.translator",
              },
            },
          },
        },
      },
    },
  };
  return projection;
};
