import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, GridList, GridListTile, makeStyles, Typography } from '@material-ui/core'

import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        height: 'auto'
    },
    gridList: {
        margin: 0
    },
    avatar: {
        height: 75,
        width: 75
    }
}), {name: 'MuiFollowGridComponent'})
export default function FollowGrid (props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <GridList style={{'height': 120}} className={classes.gridList} cols={4}>
                {props.people.map((person, i) => {
                    return <GridListTile style={{'height': 120, 'width': 100}} key={i}>
                        <Link to={'/user/' + person._id} style={{textDecoration: 'none'}}>
                            <Avatar src={'/api/users/photo/' + person._id} className={classes.avatar} />
                            <Typography variant="button" style={{color: '#FF8E53', paddingLeft: 20}}/*className={classes.tileText}*/>
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