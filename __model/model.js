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
