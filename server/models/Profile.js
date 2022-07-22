const mongoose = require('mongoose')
const Post = require('./Post')
const profileSchema = mongoose.Schema({
    //Profile Name
    Name : {
        type : String,
        required : true,
    },
    //Password encrypted
    Password : {
        type : String,
        required : true
    },
    //List of Followers
    Followers       : [mongoose.SchemaTypes.ObjectId],
    //List of FollowRequests
    FollowRequests  : [mongoose.SchemaTypes.ObjectId],
    //List of Following 
    Following       : [mongoose.SchemaTypes.ObjectId],
    //List of Profile's pending requests 
    PendingRequests : [mongoose.SchemaTypes.ObjectId],
    //Total Likes in all the posts combined 
    TotalKarma      : Number,
    Interests       : [String],
    isSignedIn      : {
        type : Boolean,
        default: false
    },
    //Posts made by the profile
    Posts           : [mongoose.SchemaTypes.ObjectId]
})
module.exports = mongoose.model('Profile',profileSchema)