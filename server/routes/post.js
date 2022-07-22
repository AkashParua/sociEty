const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Post = require('../models/Post')
const Profile = require('../models/Profile')
router.use(bodyParser.json())
//creates new post and adds it to the list of posts made by the profile
router.post('/newPost/:AuthId',async(req,res)=>{
    var {AuthId} = req.params
    var newPost  = await Post.create(req.body)
    var author   = await Profile.findById(AuthId)
    await author.Posts.push(newPost.id)
    author.save()
    res.send(newPost)  //move during production
})



module.exports = router