import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, List, ListItem, ListItemAvatar, ListItemText, IconButton, Button, Avatar, ListItemSecondaryAction, Snackbar } from '@material-ui/core'
import ViewIcon from  '@material-ui/icons/Visibility' //CHANGE THIS
import { findPeople, follow } from './api-user'
import auth from '../auth/auth-helper'

const useStyles = makeStyles(theme => ({

}), {name: "MuiFindPeopleComponent"})

export default function FindPeople() {
    const classes = useStyles()
    const jwt = auth.isAuthenticated()
    const [values, setValues] = useState({
        users: [],
        followMessage: "",
        open: false
    })

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        findPeople({userId: jwt.user._id}, { t: jwt.token }, signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setValues({...values, users: data})
                console.log(values.users)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const clickFollow = (user, index) => {
        follow({userId: jwt.user._id}, {t: jwt.token}, user._id).then((data) => {
            if(data.error) {
                console.log(data.error)
            } else {
                let toFollow = values.users
                toFollow.splice(index, 1)
                setValues({...values, users: toFollow, open: true, followMessage: `Following ${user.name}`})
            }
        })
    }

    const handleRequestClose = (event, reason) => {
        setValues({...values, open: false})
    }

    return (
        <div>
            <List>
                {values.users.map((item, i) => {
                    return <span key={i}>
                        <ListItem>
                            <ListItemAvatar className={classes.avatar}>
                                <Avatar src={`/api/users/photo/${item._id}`} />
                            </ListItemAvatar>
                            <ListItemText primary={item.name} />
                            <ListItemSecondaryAction className={classes.follow}>
                                <Link to={`/user/${item._id}`}>
                                    <IconButton variant="contained" color="secondary" className={classes.viewButton}>
                                        <ViewIcon />
                                    </IconButton>
                                </Link>
                                <Button aria-label="Follow" variant="contained" color="primary" onClick={() => {clickFollow(item, i)}}>
                                    Follow
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </span>
                })}
            </List>
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right',}} open={values.open} onClose={handleRequestClose} autoHideDuration={6000} message={<span className={classes.snack}>{values.followMessage}</span>} />
        </div>
    )
}