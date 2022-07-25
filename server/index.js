const express = require('express')
const BodyParser = require('body-parser')
const mongoose = require('mongoose')
const post_route = require('./routes/post')
const profile_route = require('./routes/profile')
const Profile = require('./models/Profile')
require('dotenv/config')
const {PORT} = process.env
const app = express()
app.listen(PORT,()=>{console.log(`Listening to port :${PORT}`)})
mongoose.connect(process.env.DATABASE,{useNewUrlParser: true},()=>{console.log(`connected database to ${process.env.DATABASE}`)})
//adding middle-wares
app.use('/profile',profile_route)
app.use('/post',post_route)
app.get('/',(req,res)=>{res.send("Hello World")})
app.get('/getName/:id',async (req,res)=>{
 var match = await Profile.findById(req.params.id)
 res.json({Name:match.Name})
})












//middle-ware 