const mongoose = require('mongoose')
const postSchema = mongoose.Schema(
    {   
        Heading  :{
            type     : String,
            required : true
        },
        Content  :{
            type    :String,
            required:true
        },
        Comments : [{                             //a list of comment objects with body author and likes 
        body        : String,
        author      : mongoose.SchemaTypes.ObjectId,
        commentlikes : Number,
        commentlikers: [mongoose.SchemaTypes.ObjectId]
       }],
       Postlikes :  Number,              //likes on the post 
       topics    : [String]  ,          //topic the post is related to
       Likers    : [mongoose.SchemaTypes.ObjectId]
    }
)
module.exports = mongoose.model('Post',postSchema)