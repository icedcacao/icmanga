db.collection.aggregate([
  {
    $match: {
      title: "Fake Manga Title",
    },
  },
  {
    $unwind: "$chapters",
  },
  {
    $match: {
      "chapters.chapter_number": 1,
    },
  },
  {
    $unwind: "$chapters.chapter",
  },
  {
    $match: {
      "chapters.chapter.translator": "Fake Translator 2",
    },
  },
  {
    $project: {
      _id: 0,
      images: "$chapters.chapter.images",
    },
  },
]);
