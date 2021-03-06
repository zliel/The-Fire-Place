import React from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { hot } from 'react-hot-loader'
import { CssBaseline } from '@material-ui/core'

const App = () => {
    React.useEffect(() => {
        // This selects the styles from the page made in the template.js
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }, [])
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <MainRouter/>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default hot(module)(App)