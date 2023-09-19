const advancedResults = (model, populate) => async (req, res, next) => {
  const reqQuery = { ...req.query };

  const removeField = ["select", "sort", "limit", "page"];

  removeField.forEach((field) => delete reqQuery[field]);

  let queryString = JSON.stringify(reqQuery);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  console.log(queryString);

  let query = model.find(JSON.parse(queryString));

  // Select fields
  if (req.query.select) {
    const selectFields = req.query.select
      .split(",")
      .map((name) => name.trim())
      .join(" ");
    query = query.select(selectFields);
  }

  // Sort By
  if (req.query.sort) {
    const sortField = req.query.sort.split(",").join(" ");
    query = query.sort(sortField);
  }

  // Pagination

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 100;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  query = query.skip(startIndex).limit(limit);

  // Pagination Data
  const total = await model.countDocuments();

  // Executing query

  if(populate){
    query = query.populate(populate);
  }

  const results = await query;


//   .populate({
//     path: "courses",
//     select: "title",
//   });

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
    hello:true,
  };
  next();
};

module.exports = advancedResults;
