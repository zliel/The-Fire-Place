import express from 'express'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'
import postCtrl from '../controllers/post.controller'

// Create our router object
const router = express.Router()

// Add all of our routes to our router, handling each route with their associated functions.
router.route('/api/posts/like')
      .put(authCtrl.requireSignin, postCtrl.like)

router.route('/api/posts/unlike')
      .put(authCtrl.requireSignin, postCtrl.unlike)

router.route('/api/posts/comment')
      .put(authCtrl.requireSignin, postCtrl.comment)

router.route('/api/posts/uncomment')
      .put(authCtrl.requireSignin, postCtrl.uncomment)

router.route('/api/posts/feed/:userId')
      .get(authCtrl.requireSignin, postCtrl.listNewsFeed)
    
router.route('/api/posts/by/:userId')
      .get(authCtrl.requireSignin, postCtrl.listByUser)

router.route('/api/posts/new/:userId')
      .post(authCtrl.requireSignin, postCtrl.create)

router.route('/api/posts/photo/:postId')
      .get(postCtrl.photo)

router.route('/api/posts/:postId')
      .delete(authCtrl.requireSignin, postCtrl.isPoster, postCtrl.remove)

// Handle parameters in the last two routess
router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.postById)

export default router