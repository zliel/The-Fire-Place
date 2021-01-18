import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import postRoutes from './routes/post.routes'

//import devBundle from './devBundle' //Remove these before sending them out

import path from 'path'
const CURRENT_WORKING_DIR = process.cwd()

//Server-side Rendering imports
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import MainRouter from './../client/MainRouter'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './../client/theme' 

// Create our express app
const app = express()
//devBundle.compile(app) //Remove these before sending them out

// Add all of the things our app needs to what it uses
require('dotenv').config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(compression())
app.use(helmet())
app.use(cors())
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// Add our routes to our app
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', postRoutes)

// Handle 400 and 401 errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { 
        res.status(401).json({ error: `${err.name}: ${err.message}` })
    } else if (err) {
        res.status(400).json({ error: `${err.name}: ${err.message}` })
    }
})

// Implement server-side rendering
app.get('*', (req, res) => {
    // Collect our style sheets for our pages
    const sheets = new ServerStyleSheets()
    const context = {}
    // Generate our markup for our page 
    const markup = ReactDOMServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}>
                <ThemeProvider theme={theme}>
                    <MainRouter />
                </ThemeProvider>
            </StaticRouter>
        )
    )

    const css = sheets.toString()
    // If the connection to the page is a success, generate the file from template.js to be displayes
    res.status(200).send(Template({
        markup: markup,
        css: css
    }))

    if (context.url) {
        return res.redirect(303, context.url)
    }
})

export default app