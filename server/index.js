const path = require('path')
const express = require('express')
const BodyParser = require('body-parser')
const mongoose = require('mongoose')
const Post = require(path.resolve(__dirname,'./models/Post'))
const post_route = require(path.resolve(__dirname,'./routes/post'))
const profile_route = require(path.resolve(__dirname,'./routes/profile'))
const Profile       = require(path.resolve(__dirname,'./models/Profile'))
require('dotenv/config')
const {PORT} = process.env
const app = express()
app.listen(PORT,()=>{console.log(`Listening to port :${PORT}`)})
mongoose.connect(process.env.DATABASE,{useNewUrlParser: true},()=>{console.log(`connected database to ${process.env.DATABASE}`)})
//adding middle-wares
app.use('/profile',profile_route)
app.use('/post',post_route)
app.get('/',(req,res)=>{res.send("Hello World")})
//api endpoints 
app.get('/getName/:id',async (req,res)=>{
 var match = await Profile.findById(req.params.id)
 res.json({Name:match.Name})
})
app.get('getPost/:id',async (req,res)=>{
    var post = Post.findById(req.params.id)
    res.json(post)
})












//middle-ware 