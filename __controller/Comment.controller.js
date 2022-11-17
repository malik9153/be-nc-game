const {SelectCommentById,InsertComment,patchComment} = require("../__model/Comment.models");

exports.getCommentById = (req, res, next) => {

const {review_id} = req.params
SelectCommentById(review_id) 
.then((comments) => {
res.status(200).send({comments});
})
.catch((err) => {
next(err);
})
}

exports.postCommentById = (req, res, next) => {

const {review_id} = req.params
InsertComment(review_id,req.body) 
.then((comment) => {
res.status(201).send({comment});
})
.catch((err) => {
if(err.code === '23502'){
res.status(400).send({msg:'POST body empty or missing parameter'})
}
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
  