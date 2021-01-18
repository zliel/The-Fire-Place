import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'

// When using server-side rendering, we need to use the hydrate() function, instead of the render() function
hydrate(<App/>, document.getElementById('root'))