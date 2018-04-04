import {combineReducers} from 'redux'
import {ADD_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO, VisibilityFilters} from "../actions";
const {SHOW_ALL} = VisibilityFilters

function todos(state = [], action){
    switch(action.type){
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    id: action.id,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo,index) =>{
                console.log(`TOGGLE_TODO: index: ${index}, action.id: ${action.id}`)
                if(index === action.id){
                    console.log(`TOGGLE_TODO: index: ${index}, action.completed: ${action.completed}`)
                    return Object.assign({},todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}

function visibilityFilter( state = SHOW_ALL, action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp

