import { combineReducers } from 'redux';

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
  todoList, todoItem, newTodoInput
})

export default TodoApp
