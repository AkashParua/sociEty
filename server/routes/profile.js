const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Profile = require('../models/Profile')
const Post    = require('../models/Post')
const bcrypt  = require('bcryptjs')
const { application } = require('express')
router.use(bodyParser.json())
//login
// request body -> Name and Password , encrypts the password and stores in MongoDB databse
router.post('/login',async (req,res)=>{
    try{
         var {Name} = req.body
         var {Password} = req.body
         var salt = await bcrypt.genSalt(10)
         var encrypted_pass = await bcrypt.hash(Password,salt)
         name_match = await Profile.find({Name:Name})
         if(name_match.length == 0){
         var NewUser = await Profile.create({Name:Name,Password:encrypted_pass})
         console.log(NewUser)
         res.send(NewUser)}        //remove during production deployment
         else{
            res.send("User already exists")
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
    var salt = await bcrypt.genSalt(10)
    var encrypted_pass = await bcrypt.hash(Password,salt)
    var match = await Profile.find({Name:Name,Password:encrypted_pass})
    if(match.length!=0)
    {
        match[0].isSignedIn = true
    }
    res.redirect(`/homepage/${match[0].id}`)
})

//homepage/:ProfileId
//homepage is generated according to the following of the Profile in :ProfileId
router.get('/homepage/:ProfileId',(req,res)=>{
    

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