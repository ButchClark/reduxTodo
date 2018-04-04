import 'babel-polyfill'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import {
    addTodo,
    fetchPostsIfNeeded,
    selectSubreddit,
    setVisibilityFilter,
    toggleTodo,
    VisibilityFilters
} from "./actions";
import rootReducer from './reducers'
import App from './components/App'

const loggerMiddleware = createLogger()
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
)

const unsubscirbe = store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(addTodo('Learn about actions'))
store.dispatch(toggleTodo(0))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL))

store.dispatch(selectSubreddit('reactjs'))
store
    .dispatch(fetchPostsIfNeeded('reactjs'))
    .then(() => console.log(store.getState()))

unsubscirbe()
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
