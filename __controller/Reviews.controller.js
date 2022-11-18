const {  SelectReviews , SelectReviewById ,patchComment} = require("../__model/Reviews.model");



exports.getReviews = (req, res, next) => {
if( Object.keys(req.query).length === 0){
 ; SelectReviews()  
    .then((reviews) => {
        res.status(200).send({reviews});
      })
      .catch((err) => {
 
        next(err);
      });
    
  }else{
  const { sort_by, order, category} = req.query;
  SelectReviews(order,sort_by,category)  
  .then((reviews) => {
      res.status(200).send({reviews});
    })
    .catch((err) => {

      next(err);
    })
  }

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
