import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

import devBundle from './devBundle' //Remove these before sending them out

import path from 'path'
const CURRENT_WORKING_DIR = process.cwd()

//Server-side Rendering imports
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import MainRouter from './../client/MainRouter'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './../client/theme' 

const app = express()
devBundle.compile(app) //Remove these before sending them out
require('dotenv').config()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(compression())
app.use(helmet())
app.use(cors())
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use('/', userRoutes)
app.use('/', authRoutes)
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { 
        res.status(401).json({ error: `${err.name}: ${err.message}` })
    } else if (err) {
        res.status(400).json({ error: `${err.name}: ${err.message}` })
    }
})

app.get('*', (req, res) => {
    const sheets = new ServerStyleSheets()
    const context = {}
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
    res.status(200).send(Template({
        markup: markup,
        css: css
    }))

    if (context.url) {
        return res.redirect(303, context.url)
    }
})

export default app