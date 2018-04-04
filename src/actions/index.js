import fetch from 'cross-fetch'

export const ADD_TODO = "ADD_TODO"
export const TOGGLE_TODO = "TOGGLE_TODO"
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
let nextTodoId = 0

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function addTodo(text) {
    console.log(`actions.addTodo() text: ${text}, nextId: ${nextTodoId}`)
    return {
        type: ADD_TODO,
        text: text,
        id: nextTodoId++
    }
}

// --- ToDos ---
export function toggleTodo(id) {
    return {type: TOGGLE_TODO, id}
}

export function setVisibilityFilter(filter) {
    return {type: SET_VISIBILITY_FILTER, filter}
}

// --- Subreddits ---
export function selectSubreddit(subreddit){
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

export function invalidateSubreddit(subreddit){
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

export function requestPosts(subreddit){
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

export function receivePosts(subreddit, json){
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchPosts(subreddit){
    return function (dispatch){
        dispatch(requestPosts(subreddit))
        return fetch(`https:/www.reddit.com/r/${subreddit}.json`)
            .then(
                response => response.json(),
                error => console.log(`!!! An Error occurred: ${error}`)
            )
            .then( json =>
                dispatch(receivePosts(subreddit, json))
            )
    }
}

function shouldFetchPosts(state, subreddit){
    const posts = state.postsBySubreddit[subreddit]
    if(!posts){
        return true
    }else if (posts.isFetching){
        return false
    }else{
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit){
    return (dispatch, getState)=>{
        if(shouldFetchPosts(getState(), subreddit)){
            // Dispatch a thunk from thunk...
            return dispatch(fetchPosts(subreddit))
        }else{
            // Let the calling code know there's nothing to wait for
            return Promise.resolve()
        }
    }
}
