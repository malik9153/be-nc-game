const db = require("../db/connection.js");
const {checkIDExists} = require("../db/seeds/utils");


exports.SelectReviews = (order = "DESC" ) => {
    const validOrder = ["DESC"];
    if (!validOrder.includes(order)) {
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
    return checkIDExists(review_id).then(() => {
      console.log(review_id)
      console.log("hi2")
    return db
      .query( `
      SELECT reviews.*  WHERE review_id = $1, count(comments.review_id) as comment_count        
      FROM reviews
      left join comments
      ON (reviews.review_id = comments.review_id)
      GROUP BY
      reviews.review_id;`, [review_id])
      .then((result) => {
        console.log(result.rows)
        return result.rows[0]});
  })
}


 