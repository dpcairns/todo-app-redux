import { combineReducers } from 'redux';

const filterViews = (state = "SHOW_ALL", action) => {
    switch(action.type){
      case "CHANGE_FILTER":
      return action.payload
      default:
      return state
    }
  }
const todoList = (state = [], action) => {
  switch(action.type){
    case 'NEW_TODO':
    return [...state, todoItem(undefined, action)]
    case 'TOGGLE_TODO':
      return state.map( (todo, i) => {
        if (todo.id === action.payload){
        return Object.assign( {}, {
              text: todo.text,
              completed: !todo.completed,
              id: todo.id
             })
        }
        return todo
      })
  case 'DELETE_TODO':
  let deleteItem = state.find( (todo) => {
    return todo.id === action.payload
          })
    return [...state.slice(0, state.indexOf(deleteItem) ),
            ...state.slice( (state.indexOf(deleteItem) + 1), (state.length))
            ]
    default:
    return state
  }
}

const newTodoInput = (state = "", action) => {
    switch(action.type){
      case 'NEW_TODO_FORM_CHANGE':
      return action.payload
      default:
      return state
  }
}

const todoItem = (state = {}, action) => {
  switch(action.type){
    case 'NEW_TODO':
      return action.payload
    default:
    return state
  }
}



const TodoApp = combineReducers({
  todoList, todoItem, newTodoInput, filterViews
})

export default TodoApp
