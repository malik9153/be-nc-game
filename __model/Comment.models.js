const db = require("../db/connection.js");
const {checkIDExists} = require("../db/seeds/utils");

exports.SelectCommentById = (review_id) => {
return checkIDExists(review_id).then(() => {
return db
.query("SELECT * FROM comments WHERE review_id = $1;;", [review_id])
.then((result) => {
return result.rows});
})
}

exports.InsertComment = (review_id,bodytobeInserted) => {
const {username , body} = bodytobeInserted;
return checkIDExists(review_id).then(() => {
const queryValues =[body, username,review_id]
const queryString = `INSERT INTO comments (body, author,review_id) VALUES ($1, $2, $3) RETURNING *;`
return db 
.query(queryString, queryValues).then ((result) => {
return result.rows[0]
})

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
