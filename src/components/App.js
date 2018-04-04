import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import AsyncApp from '../containers/AsyncApp'

const App = () => (
	<div>
		<AddTodo />
		<VisibleTodoList />
		<Footer />
		<hr/>
        <AsyncApp />
	</div>
)

export default App
