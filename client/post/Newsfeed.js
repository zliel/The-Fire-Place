import React, { useState, useEffect } from 'react'
import {Card, Typography, Divider, makeStyles} from '@material-ui/core'
import auth from '../auth/auth-helper'
import { listNewsFeed } from './api-post'
import PostList from './PostList'
import NewPost from './NewPost'

const useStyles = makeStyles((theme) => ({
    title: {
      //Make some styles for these different things  
    },
}))
export default function Newsfeed() {
    const [posts, setPosts] = useState([])
    const jwt = auth.isAuthenticated()
    const classes = useStyles()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listNewsFeed({userId: jwt.user._id}, {t: jwt.token}, signal).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setPosts(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const addPost = (post) => {
        const updatedPosts = [...posts]
        updatedPosts.unshift(post)
        setPosts(updatedPosts)
    }

    const removePost = (post) => {
        const updatedPosts = [...posts]
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        setPosts(updatedPosts)
    }

    return (
        <Card>
            <Typography type="title" className={classes.title}> Newsfeed </Typography>
            <Divider />
            <NewPost addUpdate={addPost}/>
            <Divider />
            <PostList removeUpdate={removePost} posts={posts}/>
        </Card>
    )
}