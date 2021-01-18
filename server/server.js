import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise
// Connect mongoose to our mongoDB cluster
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

// If there's an error connecting to the database, handle the error and show an error message about what's wrong
mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${config.mongoUri}`)
})

// Tell the app to listen on your preferred port, starting the server
app.listen(config.port, (err) => {
    // Handle any errors
    if (err) { console.log(err)}
    
    console.info(`Server started on port ${config.port}`)
})

