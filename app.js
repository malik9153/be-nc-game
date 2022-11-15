const { getCategories ,getReviews,getReviewById} = require("./controller/controller");

const express = require("express");
const app = express();


app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);

app.use((err,req,res,next) =>{
    if(err.status && err.msg){
        res.status(err.status).send({msg:err.msg})
    }else{
        next(err)
    }
})

app.use((err,req,res,next) => {
    console.log(err)
    res.status(500).send({msg:'sever error!'})
})

module.exports = app;
