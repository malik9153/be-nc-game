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
  const validOrder = ["DESC"];
  if (!validOrder.includes(order)) {
    console.log("model reject");
    return Promise.reject({ status: 400, msg: "invalid order query!" });
  }
  return db
    .query(
      `

       SELECT reviews.*, count(comments.review_id) as comment_count        
FROM reviews
left join comments
ON (reviews.review_id = comments.review_id)
GROUP BY
reviews.review_id

ORDER BY reviews.created_at ${order};

    `
    )
    .then((result) => {
      return result.rows;
    });
};

exports.SelectReviewById = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
    .then((result) => {
      return result.rows[0]});
}

