const db = require("../db/connection.js");
const {checkIDExists} = require("../db/seeds/utils");


  exports.SelectCommentById = (review_id) => {
    return checkIDExists(review_id).then(() => {
    return db
      .query("SELECT * FROM comments WHERE review_id = $1;;", [review_id])
      .then((result) => {
        console.log(result.rows)
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
        console.log(result.rows)
        return result.rows[0]
      })
       
      

  })
  }
   