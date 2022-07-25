const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Profile = require('../models/Profile')
const Post    = require('../models/Post')
const md5 = require('md5')
const Comment = require('../models/Comment')
router.use(bodyParser.json())
//login
// request body -> Name and Password , encrypts the password and stores in MongoDB databse
router.post('/login',async (req,res)=>{
    try{
         var {Name} = req.body
         var {Password} = req.body
         var encrypted_pass = await md5(Password)
         name_match = await Profile.find({Name:Name})
         if(name_match.length == 0){
         var NewUser = await Profile.create({Name:Name,Password:encrypted_pass})
         console.log(NewUser)
         res.json({message:"Login Successful"})
        }   
    }catch(err)
    {
        console.log(err)
    }
})
//sign in
// request body -> Name and Password , matches the password with encryption to the Name re-routes /homepage/:id
router.post('/signIn',async(req,res)=>{
    var {Name}  = req.body
    var {Password} = req.body
    var encrypted_pass = await md5(Password)
    var match = await Profile.find({Name:Name,Password:encrypted_pass})
    console.log(Name,encrypted_pass)
    if(match.length!=0)
    {
        match[0].isSignedIn = true
        match[0].save()
        res.json(match[0])
    }else{
        res.json({message:"Wrong Login Credentials"})
    }

})
router.get('/signOut/:ProfileId',async (req,res)=>{
    var {ProfileId} = req.params 
    var match = await Profile.findById(ProfileId)
    match.isSignedIn = false
    await match.save()
    res.json({message:"Signed Out"})
})
//homepage/:ProfileId
//homepage is generated according to the following of the Profile in :ProfileId
router.get('/homepage/:ProfileId',async (req,res)=>{
    var {ProfileId} = req.params
    var match = await Profile.findById(ProfileId)
    var followinglist = match.Following
    var postlist = []
    for(i = 0 ;i<followinglist.length;i++)
    {
        var posts = await Post.find({AuthorId:followinglist[i].id})
        postlist.push(...posts)
    }
    var posts = await Post.find({AuthorId:ProfileId})
    console.log(posts)
    postlist.push(...posts)
    postlist.sort((objA,objB)=>Number(objA.Date)-Number(objB.Date))
    res.send(postlist)
})

//explore
//homepage 


//sign out
//sign out for profile 


//newPost   calls  /post/newPost/:AuthId
//creating new post 



//editPost    calls  /post/editPost/:PostId
//editing the post 



//delPost             /post/delPost/:PostId
//deleting the post



//comment           /post/comment/:AuthId/:receiveId
//comment on someones post



//req_follow




//accept_follow



//likepost




module.exports = router