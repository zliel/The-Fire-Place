import { AppBar, IconButton, Toolbar, Typography, Button } from '@material-ui/core'
import React from 'react'
import { withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import auth from '../auth/auth-helper'

const isActive = (history, path) => {
    if(history.location.pathname == path) {
        return {color: '#6F1A07'}
    } else {
        return {color: '#ffffff'}
    }
}

const noUnderline = { textDecoration: 'none'}
const Menu = withRouter(({history}) => (
    <AppBar position="static" style={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%'}}>
        <Toolbar>
            <Typography variant="h6" color="inherit">
                Fire Place
            </Typography>
            <Link to="/">
                <IconButton aria-label="Home" style={isActive(history, "/")}>
                    <HomeIcon />
                </IconButton>
            </Link>
            <Link to="/users" style={noUnderline}>
                <Button style={isActive(history, "/users")}>Users</Button>
            </Link>
            {
                !auth.isAuthenticated() && 
                    (<span>
                        <Link to="/signup" style={noUnderline}>
                            <Button style={isActive(history, "/signup")}>Sign Up</Button>
                        </Link>
                        <Link to="/signin" style={noUnderline}>
                            <Button style={isActive(history, "/signin")}>Sign In</Button>
                        </Link>
                    </span>)
            }
            {
                auth.isAuthenticated() && 
                    (<span>
                        <Link to={"/user/" + auth.isAuthenticated().user._id} style={noUnderline}>
                            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                                My Profile
                            </Button>
                        </Link>
                        <Button color="inherit" onClick={() => { auth.clearJWT(() => history.push('/')) }} style={noUnderline}>
                            Sign Out
                        </Button>
                    </span>)
            }
        </Toolbar>
    </AppBar>
))


export default Menu