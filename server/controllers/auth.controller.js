import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'

// This function handles signing into a user's profile
const signin = async (req, res) => { 
    try {
        // Query the database to see if there is a user in the db with the input email
        let user = await User.findOne({ "email": req.body.email })
        if(!user) return res.status('401').json({ error: "User not found" })

        // If the user isn't authenticated, send a 401 code and an error message
        if(!user.authenticate(req.body.password)) return res.status('401').json({ error: "Email and password don't match." })

        // Create a jsonwebtoken token 
        const token = jwt.sign({ _id: user._id}, config.jwtSecret)

        // Create a cookie for the response
        res.cookie('t', token, { expire: new Date() + 9999 })

        // Return a Json response
        return res.json({
            token, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    // Handle any errors that might come up
    }  catch (err) {
        return res.status('401').json({ error: "Could not sign in" })
    }
}

// This function handles signing out of a user's profile
const signout = (req, res) => { 
    // Clear the user's cookie 
    res.clearCookie("t")

    // Return a success status code and send a json response with a success message
    return res.status('200').json({ message: "Signed out" })
}

// This function handles ensuring that the user is signed in (this is used in the middleware for route handling)
const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['HS256']
})

// This function checks whether a user is authorized or not
const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id

    if(!authorized) return res.status('403').json({ error: "User is not authorized" })

    next()
}

export default { signin, signout, requireSignin, hasAuthorization}