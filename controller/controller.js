const { SelectCategories, SelectReviews , SelectReviewById} = require("../__model/model");

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

exports.getReviewById = (req, res, next) => {
   const {review_id} = req.params
   SelectReviewById(review_id)  
   .then((reviews) => {
       res.status(200).send({reviews});
     })
     .catch((err) => {
       console.log(err, "controller reject");
       next(err);
     })
    }