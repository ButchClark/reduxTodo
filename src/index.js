import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers'
import App from './components/App'
import {addTodo,toggleTodo,setVisibilityFilter,VisibilityFilters} from "./actions";

const store = createStore(rootReducer)
console.log(`store.getState(): ${store.getState()}`)

const unsubscirbe = store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

unsubscirbe()
render(
  <Provider store={store}>
	<App />
  </Provider>,
  document.getElementById('root')
)
