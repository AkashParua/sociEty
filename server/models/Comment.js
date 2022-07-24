const mongoose = require('mongoose')
commentSchema = new mongoose.Schema({
        AuthorID     : mongoose.SchemaTypes.ObjectId,
        ParentPost   : mongoose.SchemaTypes.ObjectId,
        body         : String,
        commentlikes : Number,
        commentlikers: [mongoose.SchemaTypes.ObjectId]
})
module.exports = mongoose.model("Comment",commentSchema)