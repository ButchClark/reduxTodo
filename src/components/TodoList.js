import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({todos, onToggleTodo}) => {
    console.log(`> TodoList - onToggleTodo:`)
    console.dir(todos)
    console.dir(onToggleTodo)
    return (
        <ul>
            {todos.map(todo =>
                <Todo
                    key={todo.id}
                    {...todo}
                    onClick={() => onToggleTodo(todo.id)}
                />
            )}
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onToggleTodo: PropTypes.func.isRequired
}

export default TodoList
