import mongoose from 'mongoose'
import crypto from 'crypto'

/*
We define the schema for Users in the database here:
    name: the name of the user
    email: the email of the user
    about: a short description the user can show on their profile
    photo: the user's profile photo, stored as binary
    created: the date the user was created
    hashed_password: their password, after being put through a hash function
    following: an array of the IDs of users who the user follows
    followers: an array of the IDs of the users who follow the user
*/
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },

    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },

    about: {
        type: String,
        trim: true
    },

    photo: {
        data: Buffer,
        contentType: String
    },

    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,

    hashed_password: {
        type: String,
        required: "Password is required"
    },

    salt: String,

    following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
 })

 // Create a virtual schema for the user's password, salt, and hashed_password
 UserSchema.virtual('password')
           .set(function(password) {
               this._password = password
               this.salt = this.makeSalt()
               this.hashed_password = this.encryptPassword(password)
           })
           .get(function() {
               return this._password
           })

// We add a path for the hashed_password to validate the password upon creation
UserSchema.path('hashed_password').validate(function(v) {
    if(this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required...')
    }
}, null)

// Here we define the methods attached to the schema
UserSchema.methods = {
    // this method authenticates the user input for the user's password
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    // this method encrypts the user's input to be used in the authenticate() function
    encryptPassword: function(password) {
        if(!password) return ''
        try {
            return crypto.createHmac("sha1", this.salt)
                         .update(password)
                         .digest('hex')
        } catch (err) {
            return ''
        }
    },
    // this method creates a salt to be used in the encryptPassword() function
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

export default mongoose.model('User', UserSchema)