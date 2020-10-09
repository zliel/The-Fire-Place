import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, GridList, GridListTile, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        height: 'auto'
    },
    gridList: {
        margin: '0px',
        padding: 0
    },
    avatar: {
        height: 50,
        width: 50,
        margin: 'auto'
    }
}), {name: 'MuiFollowGridComponent'})

export default function FollowGrid (props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <GridList style={{'height': 'auto', margin: '-15px'}} className={classes.gridList} cols={4}>
                {props.people.map((person, i) => {
                    return <GridListTile style={{'height': 80, 'width': 70, margin: '2px 2px 2px 2px'}} key={i}>
                        <Link to={'/user/' + person._id} style={{textDecoration: 'none'}}>
                            <Avatar src={'/api/users/photo/' + person._id} className={classes.avatar} />
                            <Typography style={{color: '#FF8E53', textAlign: 'center'}}/*className={classes.tileText}*/>
                                {person.name}
                            </Typography>
                        </Link>
                    </GridListTile>
                })}
            </GridList>
        </div>
    )
}

FollowGrid.propTypes = {
    people: PropTypes.array.isRequired
}

/* TO DO:
Create classes to replace the inline styles
Think of stuff to do
*/