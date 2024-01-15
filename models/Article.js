const mongoose = require("mongoose")

const Schema = mongoose.Schema

const articleSchema = new Schema({
    //column name table's , value 
    title: String,
    body: String,
    numberOfLikes: Number
})

// تعريف المودل هو اسم الجدول وتخطيط الجدول
const Article = mongoose.model("Article", articleSchema) //table name and articleSchema المخطط اللي بيسوي الجدول وهو 

module.exports = Article