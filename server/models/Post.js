const mongoose = require('mongoose')
const postSchema = mongoose.Schema(
    {   
        AuthorID : mongoose.SchemaType.ObjectId,
        Heading  :{
            type     : String,
            required : true
        },
        Content  :{
            type    :String,
            required:true
        },
       Comments : [mongoose.SchemaTypes.ObjectId],   //comments on posts
       Postlikes :  Number,              //likes on the post 
       topics    : [String]  ,          //topic the post is related to
       Likers    : [mongoose.SchemaTypes.ObjectId]
    }
)
module.exports = mongoose.model('Post',postSchema)