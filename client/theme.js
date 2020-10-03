import { createMuiTheme } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'

//CURRENTLY COMMON ISSUE: Things don't hot reload correctly, so restart the development process completely
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            light: '#5c67a3',
            main: '#3f4771',
            dark: '#2e355b',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff79b0',
            main: '#ff4081',
            dark: '#c60055',
            contrastText: '#000'
        },
        openTitle: '#3f4771',
        protectedTitle: pink['400'],
        type: 'light'
    },
    //Solution to not being able to change AppBar theme in Menu.js was to use an override

})

export default theme