import express from 'express'
import authCtrl from '../controllers/auth.controller'

// Create our router object
const router = express.Router()

// Add our route to the router, and handle the routes accordingly
// These two routes in particular handle signing in and out of the social media app
router.route('/auth/signin')
      .post(authCtrl.signin)

router.route('/auth/signout')
      .get(authCtrl.signout)

export default router