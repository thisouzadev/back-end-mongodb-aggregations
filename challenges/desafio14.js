db.trips.aggregate(
  [
    {
      $group: {
        _id: "$bikeid",
        media: {
          $avg: {
            $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
          },
        },
      },
    },
    {
      $sort: {
        media: -1,
      },
    },
    {
      $project: {
        _id: false,
        bikeId: "$_id",
        duracaoMedia: { $ceil: "$media" },
      },
    },
    {
      $limit: 5,
    },
  ],
);