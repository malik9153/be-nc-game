const { SelectCategories} = require("../__model/Categories.model");


exports.getCategories = (req, res, next) => {
    SelectCategories()
    .then((category) => {
      res.status(200).send({category});
    })
    .catch((err) => {
      next(err);
    });
  }