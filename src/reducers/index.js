import {combineReducers} from 'redux'
import {
    ADD_TODO, INVALIDATE_SUBREDDIT, RECEIVE_POSTS, REQUEST_POSTS, SELECT_SUBREDDIT, SET_VISIBILITY_FILTER, TOGGLE_TODO,
    VisibilityFilters
} from "../actions";

const {SHOW_ALL} = VisibilityFilters


function selectedSubreddit(state = 'reactjs', action) {
    console.log(`> reducers - state: ${state}, action.type: ${action.type}`)
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit
        default:
            return state
    }
}

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({},state,{
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({},state,{
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({},state,{
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function postsBySubreddit(state={}, action){
    switch(action.type){
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({},state,{
                [action.subreddit]: posts(state[action.subreddit], action)
            })
        default:
            return state
    }
}

function todos(state = [], action) {
    switch (action.type) {
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
            return state.map((todo, index) => {
                console.log(`TOGGLE_TODO: index: ${index}, action.id: ${action.id}`)
                if (index === action.id) {
                    console.log(`TOGGLE_TODO: index: ${index}, action.completed: ${action.completed}`)
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos,
    postsBySubreddit,
    selectedSubreddit
})

export default todoApp

