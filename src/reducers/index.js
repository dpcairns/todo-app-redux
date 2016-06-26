import { combineReducers } from 'redux';

const todoList = (state = [], action) => {
  switch(action.type){
    case 'NEW_TODO':
    return [...state, todoItem(undefined, action)]
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
