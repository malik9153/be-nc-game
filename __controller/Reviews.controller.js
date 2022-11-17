const {  SelectReviews , SelectReviewById} = require("../__model/Reviews.model");



exports.getReviews = (req, res, next) => {

    SelectReviews()  
    .then((reviews) => {
        res.status(200).send({reviews});
      })
      .catch((err) => {
 
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
       next(err);
     })
    }

exports.patchReviewById = (req, res,next) => {
  const {review_id} = req.params
  
  patchComment(review_id,req.body)  
  .then((reviews) => {
      res.status(200).send({reviews});
    })
    .catch((err) => {
      next(err);
    })
}
