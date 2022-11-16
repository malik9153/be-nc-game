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