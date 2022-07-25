const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Post = require('../models/Post')
const Profile = require('../models/Profile')
const Comment = require('../models/Comment')
const { findByIdAndDelete, findById } = require('../models/Post')
router.use(bodyParser.json())
//creates new post and adds it to the list of posts made by the profile
router.post('/newPost/:AuthId',async(req,res)=>{
    var {AuthId} = req.params
    var {Content} = req.body
    var {Heading} = req.body
    var newPost  = await Post.create({Heading: Heading,Content:Content,AuthorId:AuthId})
    var author   = await Profile.findById(AuthId)
    author.Posts.push(newPost.id)
    await author.save()
    res.json(newPost)
})
//updating a post 
router.post('/updatePost/:PostId',async (req,res)=>{
      var {PostId} = req.params
      var match = await Post.findById(PostId)
      match.content = req.body.content
     await match.save()
     res.json(match)
})
//deleting a post 
router.get('/deletePost/:PostId',async (req,res)=>{
    var {PostId} = req.params
    var match = await Post.findById(PostId)
    var {AuthorId} =  match
    var author    = Profile.findById(AuthorId)
    author.Posts.remove(PostId)
    author.save()
    await Post.findByIdAndDelete(PostId)
})


//adding a comment to a post 




//updating a comment




//deleting a comment


module.exports = router