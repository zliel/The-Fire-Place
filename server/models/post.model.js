import mongoose from 'mongoose'

/*
We define the Schema for the Posts in our database
    text: the text of the post
    photo: if the user adds a photo to the post, it will be stored as binary
    postedBy: the ID of the user who posted the post
    created: the date the post was created
    likes: an array containing the IDs of the users who have liked the post in question
    comments: an array containing the text of the comment, when it was created, and who commented
*/
const PostSchema = mongoose.Schema({
    text: {
        type: String,
        required: 'Text is required'
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    }],
    comments: [{
        text: String,
        created: {type: Date, default: Date.now},
        postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'}
    }]
})

export default mongoose.model('Post', PostSchema)