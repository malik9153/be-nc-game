const { getCategories} = require("./__controller/Categories.controller");
const { getReviews,getReviewById, patchReviewById} = require("./__controller/Reviews.controller");
const { getCommentById,postCommentById} = require("./__controller/Comment.controller");
const {getUsers} = require("./__controller/users.Controller")
const express = require("express");
const app = express();
app.use(express.json())


app.get("/api/users", getUsers);
app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/reviews/:review_id/comments", getCommentById);

app.post("/api/reviews/:review_id/comments", postCommentById);


app.patch('/api/reviews/:review_id', patchReviewById)

app.use((err,req,res,next) =>{
if(err.status && err.msg){
res.status(err.status).send({msg:err.msg})
}else{
next(err)
}
})

app.use((err,req,res,next) => {
res.status(500).send({msg:'sever error!'})
})

module.exports = app;