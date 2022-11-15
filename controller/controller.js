const { SelectCategories, SelectReviews } = require("../__model/model");

exports.getCategories = (req, res, next) => {
  SelectCategories()
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((err) => {
    console.log(err, "controller reject");
    next(err);
  });
}

exports.getReviews = (req, res, next) => {
    SelectReviews()  
    .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err, "controller reject");
        next(err);
      });
}