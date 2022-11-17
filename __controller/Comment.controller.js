
const {SelectCommentById,InsertComment} = require("../__model/Comment.models");

exports.getCommentById = (req, res, next) => {

    const {review_id} = req.params
    
    SelectCommentById(review_id)  
    .then((comment) => {
        res.status(200).send({comment});
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