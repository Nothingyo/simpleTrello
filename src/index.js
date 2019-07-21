import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import App from './App'
import rootReducer from './store'
import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'

// const loggerMiddleware = createLogger()
const composeEnhancers = compose
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

console.log('store is ', store.getState())

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)