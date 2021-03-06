//Imports for each necessary module
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import javascriptLogo from './../assets/images/javascriptLogo.jpg'
import FindPeople from '../user/FindPeople'
import Newsfeed from '../post/Newsfeed'
import auth from '../auth/auth-helper'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: "white"
    },
    media: {
        minHeight: 400,
    }
}), { name: "MuiHomeComponent"})
//New fix for mismatched classes/styles in production found in a Medium article at https://medium.com/javascript-in-plain-english/fixing-material-uis-classname-mismatch-for-react-75c6c2a2c409
//Fix was to add in the { name: "..." } parameter at the end of the makeStyles function

export default function Home({history}) {
    const classes = useStyles()

    const [defaultPage, setDefaultPage] = useState(false)

    useEffect(() => {
        setDefaultPage(auth.isAuthenticated())
        const unlisten = history.listen(() => {
            setDefaultPage(auth.isAuthenticated())
        })
        return () => {
            unlisten()
        }
    }, [])
    
    return (
        <div>
        { defaultPage &&
        <div>
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title} style={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%'}}>
                Home Page
            </Typography>
            
            <CardMedia className={classes.media} image={javascriptLogo} title="Javascript Logo"/>
            
            <CardContent>
                <Typography variant="body2" component="p">
                    Welcome to The Fireplace!
                </Typography>
            </CardContent>
        </Card>
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title} style={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%'}}>
                Who to follow
            </Typography>

            <CardContent>
                <FindPeople />
            </CardContent>
        </Card>
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title} style={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%'}}>
                The latest
            </Typography>
            
            <CardContent>
                <Newsfeed />
            </CardContent>
        </Card>
        </div>
        }
        { !defaultPage && 
        <div>
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title} style={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%'}}>
                Home Page
            </Typography>
            
            <CardMedia className={classes.media} image={javascriptLogo} title="Javascript Logo"/>
            
            <CardContent>
                <Typography variant="body2" component="p">
                    Welcome to The Fireplace!
                </Typography>
            </CardContent>
        </Card>
        </div>
        }
        </div>
    )
}