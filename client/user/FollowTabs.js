import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab, Typography, Box, makeStyles } from '@material-ui/core'
import FollowGrid from './FollowGrid'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    )
}

function tabPanelProps(index) {
    return {
        id: `vertical-tab-${index}`, 'aria-controls': `vertical-tabpanel-${index}`
    }
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,

    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`
    }
}), {name: "MuiFollowTabsComponent"})

export default function FollowTabs(props) {
    const classes = useStyles()
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className={classes.root}>
            <Tabs orientation="vertical"
                  value={value}
                  onChange={handleChange}
                  className={classes.tabs}
                  variant="fullWidth"
            >
                <Tab label="Following" {...tabPanelProps(0)} />
                <Tab label="Followers" {...tabPanelProps(1)} />
            </Tabs>
                
            <TabPanel value={value} index={0}>
                <FollowGrid people={props.user.following} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FollowGrid people={props.user.followers} />
            </TabPanel>
        </div>
    )
}

FollowTabs.propTypes = {
    user: PropTypes.object.isRequired
}

/* TO DO: 

Override button colors to match theme
Find good username text color
Find some kind of animation?

*/