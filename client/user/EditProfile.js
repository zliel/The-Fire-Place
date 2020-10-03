import React, { useState, useEffect } from 'react'
import { makeStyles, Card, CardActions, CardContent, Typography, Button, TextField } from '@material-ui/core'
import auth from './../auth/auth-helper'
import { Redirect } from 'react-router'
import { read, update } from './api-user'


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle
    },
    error: {
        verticalAlign: 'middle'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}), { name: "MuiEditProfileComponent" })

export default function EditProfile({ match }) {
    const classes = useStyles()
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        about: '',
        open: false,
        error: '',
        redirectToProfile: false
    })
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        

        read({ userId: match.params.userId }, { t: jwt.token }, signal).then((data) => {
            if(data && data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, name: data.name, email: data.email, about: data.about})
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [match.params.userId])

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            about: values.about || undefined,
            password: values.password || undefined
        }
        update({userId: match.params.userId}, {t: jwt.token}, user).then((data) => {
            if(data && data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, userId: data._id, redirectToProfile: true})
            }
        })
    }

    if (values.redirectToProfile) {
        return (<Redirect to={'/user/' + match.params.userId} />)
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Edit Profile
                    </Typography>

                    <TextField id="multiline-flexible" label="About" className={classes.textField} multiline rows="2" value={values.about} onChange={handleChange('about')} />
                    <br />                   
                    <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" />
                    <br />
                    <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal" />
                    <br />
                    <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" />
                    <br />
                    {
                        values.error && (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}
                        </Typography>)
                    }

                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
        </div>
    )
}