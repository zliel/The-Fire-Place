import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute  from './auth/PrivateRoute'
import Signin from './auth/Signin'
import Home from './core/Home'
import Signup from './user/Signup'
import Users from './user/Users'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import Menu from './core/Menu'

const MainRouter = () => {
    //Each Route component will have a path to a different view
    return(
        <div>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} /> 
                <Route path="/users" component={Users} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
                <Route path="/user/:userId" component={Profile} />
            </Switch>
        </div>
    )
}

export default MainRouter