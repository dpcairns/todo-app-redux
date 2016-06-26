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
  case 'TOGGLE_EDIT':
  return state.map( (todo, i) => {
      if (todo.id === action.payload){
      return Object.assign( {}, {
            text: todo.text,
            completed: todo.completed,
            id: todo.id,
            showEdit: !todo.showEdit
                    })
              }
           return todo
        })
    case 'EDIT_TODO':
    return state.map( (todo, i) => {
      if (todo.id === action.payload._id){
      return Object.assign( {}, {
          text: action.payload._text,
          completed: todo.completed,
          id: todo.id,
          showEdit: false
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


const editTodoInput = (state = "", action) => {
  switch(action.type){
    case 'EDIT_TODO_FORM_CHANGE':
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


const selectedTodoId = (state = "", action) => {
  switch(action.type){
    case 'SELECT_TODO':

      console.log(action.payload)
    return action.payload
    default:
    return state
  }
}

const TodoApp = combineReducers({
  todoList, todoItem, newTodoInput, filterViews, editTodoInput, selectedTodoId
})

export default TodoApp
