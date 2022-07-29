const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const Profile = require(path.resolve(__dirname,'../models/Profile'));
const Post    = require(path.resolve(__dirname,'../models/Post'));
const md5 = require('md5');
router.use(bodyParser.json());
//login
// request body -> Name and Password , encrypts the password and stores in MongoDB databse
router.post('/login',async (req,res)=>{
    try{
         var {Name} = req.body;
         var {Password} = req.body;
         var encrypted_pass = await md5(Password);
         name_match = await Profile.find({Name:Name});
         if(name_match.length == 0){
         var NewUser = await Profile.create({Name:Name,Password:encrypted_pass});
         console.log(NewUser);
         res.json({message:"Login Successful"});
        }   ;
    }catch(err)
    {
        console.log(err);
    }
})
//sign in
// request body -> Name and Password , matches the password with encryption to the Name re-routes /homepage/:id
router.post('/signIn',async(req,res)=>{
    var {Name}  = req.body;
    var {Password} = req.body;
    var encrypted_pass = await md5(Password);
    var match = await Profile.find({Name:Name,Password:encrypted_pass});
    console.log(Name,encrypted_pass);
    if(match.length!=0)
    {
        match[0].isSignedIn = true;
        match[0].save();
        res.json(match[0]);
    }else{
        res.json({message:"Wrong Login Credentials"});
    }

})
router.get('/signOut/:ProfileId',async (req,res)=>{
    var {ProfileId} = req.params ;
    var match = await Profile.findById(ProfileId);
    match.isSignedIn = false;
    await match.save();
    res.json({message:"Signed Out"});
})
//homepage/:ProfileId
//homepage is generated according to the following of the Profile in :ProfileId
router.get('/homepage/:ProfileId',async (req,res)=>{
    var {ProfileId} = req.params;
    var match = await Profile.findById(ProfileId);
    var followinglist = match.Following;
    var postlist = [];
    for(i = 0 ;i<followinglist.length;i++);
    {
        var posts = await Post.find({AuthorId:followinglist[i].id});
        postlist.push(...posts);
    }
    var posts = await Post.find({AuthorId:ProfileId});
    console.log(posts);
    postlist.push(...posts);
    postlist.sort((objA,objB)=>Number(objA.Date)-Number(objB.Date));
    res.send(postlist);
})



//req_follow
router.get('/followReq/:sender/:receiver',async (req,res)=>{
    var {sender} = req.params;
    var {receiver} = req.params;
    var rec = await Profile.findById(receiver);
    var sen = await Profile.findById(sender);
    rec.FollowRequests.push(sender);
    sen.PendingRequests.push(receiver);
    await rec.save();
    await sen.save();
    res.send(sen.PendingRequests)
})



//accept_follow
router.get('/acceptFollow/:sender/:receiver',async (req,res)=>{
   var {sender} = req.params;
   var {receiver}  = req.params;
   var rec = await Profile.findById(receiver);
   var sen = await Profile.findById(sender);
   rec.FollowRequests.remove(sender);
   rec.Followers.push(sender);
   sen.PendingRequests.remove(receiver);
   sen.Following.push(receiver);
   await rec.save();
   await sen.save();
   res.send(rec.Followers)
})


//likepost
router.get('/like/:postId/:likerId',async (req,res)=>{
    var {likerId} = req.params.likerId;
    var {postId}  = req.params.postId;
    var post = await Post.findById(postId);
    post.Postlikes += 1;
    post.Likers.push(likerId);
    post.save();
    res.send(post.Likers);
})



module.exports = router