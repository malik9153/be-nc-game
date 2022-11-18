const db = require("../db/connection.js");
const {checkIDExists} = require("../db/seeds/utils");


exports.SelectReviews = (order = "DESC", sort_by = "created_at" ,category ) => {
    const validOrder = ["DESC","ASC"];
    if (!validOrder.includes(order)) {
      return Promise.reject({ status: 400, msg: "invalid order query!" });
    }

    const validSortBy = ["created_at","review_id",'title','designer,owner','review_img_url','review_body','category,votes','comment_count'];
    if (!validSortBy.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "invalid sort_by query!" });
    }

    const validCategory = ["euro game","social deduction",'dexterity',"children's games",undefined];
    if (!validCategory.includes(category)) {
      return Promise.reject({ status: 400, msg: "invalid category query!" });
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
  
  ORDER BY reviews.${sort_by} ${order};
  
      `,
      )
      .then((result) => {
        if(category){
          const filteredCategory = result.rows.filter((object) => {
            if( object.category === category){
              return object
            }
          })
        return filteredCategory
        }
        
        return result.rows;
      });
  };
  
  exports.SelectReviewById = (review_id) => {
    return checkIDExists(review_id).then(() => {

    return db
      .query( `
      SELECT reviews.* , count(comments.review_id) as comment_count        
      FROM reviews
      left join comments
      ON (reviews.review_id = comments.review_id)
      WHERE reviews.review_id = $1 
      GROUP BY
      reviews.review_id;`, [review_id])
      .then((result) => {
        return result.rows[0]});
  })
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