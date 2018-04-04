import {connect} from 'react-redux'
import {toggleTodo} from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
    let filtered
    switch (filter) {
        case 'SHOW_COMPLETED':
            filtered = todos.filter(t => t.completed)
            console.log('Show-Completed todos:')
            console.dir(filtered)
            return filtered
        case 'SHOW_ACTIVE':
            filtered = todos.filter(t => !t.completed)
            console.log('Show-Active todos:')
            console.dir(filtered)
            return filtered
        case 'SHOW_ALL':
        default:
            console.log(`Show-All todos - filter: ${filter}`)
            console.dir(todos)
            return todos
    }
}

const mapStateToProps = state => {
    return {todos: getVisibleTodos(state.todos, state.visibilityFilter)}
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleTodo: (id) => {
            console.log(`onToggleTodo - calling dispatch(toggleTodo) for id: ${id}`)
            dispatch(toggleTodo(id))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)
