import React, { useState } from 'react'
import { makeStyles, Card, CardHeader, CardContent, CardActions, Avatar, TextField, Icon} from '@material-ui/core'
import auth from '../auth/auth-helper'
import { Link } from 'react-router-dom'
import { comment, uncomment } from './api-post'
import PropTypes from 'prop-types'

export default function Comments(props) {
    const [text, setText] = useState("")
    const jwt = auth.isAuthenticated()

    const addComment = (event) => {
        if(event.keyCode == 13 && event.target.value) {
            event.preventDefault()
            comment({userId: jwt.user._id}, {t: jwt.token}, props.postId, {text: text}).then((data) => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    setText('')
                    props.updateComments(data.comments)
                }
            })
        }
    }

    const handleChange = (event) => {
        setText(event.target.value)
    }

    const deleteComment = comment => event => {
        uncomment({userId: jwt.user._id}, {t: jwt.token}, props.postId, comment).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                props.updateComments(data.comments)
            }
        })
    }
    const commentBody = item => {
        return (
            <p>
                <Link to={"/user/" + item.postedBy._id} style={{textDecoration: "none"}}>
                    {item.postedBy.name}
                </Link>
                <br />

                {item.text} -- 
                <span>
                    { (new Date(item.created).toDateString()) }
                      | 
                    {auth.isAuthenticated().user._id === item.postedBy._id &&
                      <Icon onClick={deleteComment(item)}>delete</Icon>
                    }
                </span>
            </p>
        )
    }
    return (<div>
            <CardHeader avatar={<Avatar src={'/api/users/photo/' + auth.isAuthenticated().user._id} />}
                        title={ <TextField onKeyDown={addComment} multiline value={text} onChange={handleChange} placeholder="Write something ..." margin="normal" />
                        } />
            
            { props.comments.map((item, i) => {
                return <CardHeader avatar={<Avatar src={'/api/users/photo/' + item.postedBy._id} />
                                   }
                                   title={commentBody(item)}
                                   key={i} /> 
            })}
        </div>
    )
}

Comments.propTypes = {
    postId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    updateComments: PropTypes.func.isRequired
}