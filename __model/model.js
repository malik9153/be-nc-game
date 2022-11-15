const db = require("../db/connection.js");

exports.SelectCategories = () => {
  
  return db
    .query(
      `
      SELECT * FROM categories

    `
    )
    .then((result) => {
      return result.rows;
    });
};

exports.SelectReviews = (order = "DESC" ) => {

  return db
    .query(
      `

       SELECT reviews.*, count(comments.review_id) as comment_count        
FROM reviews
left join comments
ON (reviews.review_id = comments.review_id)
GROUP BY
reviews.review_id

ORDER BY reviews ${order};

    `
    )
    .then((result) => {
      return result.rows;
    });
};

