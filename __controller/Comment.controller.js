
const {SelectCommentById} = require("../__model/Comment.models");

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