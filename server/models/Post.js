const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {   
        AuthorId :{
            type     : mongoose.SchemaTypes.ObjectId,
            required : true
        },
        Heading  :{
            type     : String,
            required : true
        },
        Content  :{
            type    :String,
            required:true
        },
       Postlikes :  {Number,              //likes on the post 
       default    : 0
       },
       Likers    : [mongoose.SchemaTypes.ObjectId],
       DateCreated : {
        type : Date,
        default : ()=> Date.now()
       },
       DateUpdated : {
        type : Date,
        default : ()=> Date.now()
       },
       Comments   : [mongoose.SchemaTypes.ObjectId]
    }
)
module.exports = mongoose.model('Post',postSchema)