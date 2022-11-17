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
  
  exports.SelectReviewById = (rev_id) => {
    return db
      .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
      .then((result) => {
        if(result.rows.length === 0){
          return Promise.reject({ status: 404, msg: "ID not found !" });}
        return result.rows[0]});
  }
  exports.patchComment = (rev_id,votes) => {
    const {inc_votes} = votes
    return checkIDExists(rev_id).then(() => {
   if(inc_votes > 0)
   {
    return db
    .query(`UPDATE reviews 
              SET votes = votes + ${inc_votes}
              WHERE review_id = ${rev_id}
              RETURNING * `)
    .then((result) => {
        return result.rows;
      });
   }
   else
   {
    return db
    .query(`UPDATE reviews 
              SET votes = votes  ${inc_votes}
              WHERE review_id =  ${rev_id}
              RETURNING * `)
    .then((result) => {
        return result.rows;
      });
   }
  })
  }