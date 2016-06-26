import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid'

export default class HomeView extends Component {
    handleNewTodoChange(e) {
      e.preventDefault()
      this.props.sendNewInputToState(e.target.value)
    }
    handleNewTodoSubmit(e){
      e.preventDefault()
      let newTodo = {text: this.props.newTodoInput, completed: false, id: shortid.generate()}
      this.props.newTodoSubmit(newTodo)
      this.props.sendNewInputToState("")
    }

  handleDeleteTodo(id){
      this.props.deleteTodo(id)
    }

  handleToggleTodo(id){
    this.props.toggleTodo(id)
    console.table(this.props.todoList)
   }

  render() {
    let {newTodoInput, todoList } = this.props
    let todoListNodes = todoList.map( (todo, i) => {
      return (
        <div key={todo.id}>
        <span onClick={this.handleToggleTodo.bind(this, todo.id)}>{todo.text} - {todo.id} </span> - {todo.completed ? 'you did it!' : 'you can do it!'} -
        <span onClick={this.handleDeleteTodo.bind(this, todo.id)}>delete?</span>
        </div>
      )
    })
    return(
    <div>
      {todoListNodes}
      <form onSubmit={this.handleNewTodoSubmit.bind(this)}>
        <input type="text" onChange={this.handleNewTodoChange.bind(this)} value={newTodoInput} />
        <button type="submit">Add a todo</button>
      </form>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newTodoInput: state.newTodoInput,
    todoList: state.todoList

  }
}

const toggleTodo = (id) => {
  return {type: "TOGGLE_TODO", payload: id }
}

const sendNewInputToState = (input) => {
  return {type: "NEW_TODO_FORM_CHANGE", payload: input }
}

const newTodoSubmit = (todo) => {
  return {type: "NEW_TODO", payload: todo }
}

const deleteTodo = (id) => {
  return {type: "DELETE_TODO", payload: id }
}

HomeView = connect(mapStateToProps, {newTodoSubmit, sendNewInputToState, deleteTodo, toggleTodo})(HomeView)

export default HomeView
