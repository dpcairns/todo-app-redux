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
      if (this.props.newTodoInput.length > 0){
      let newTodo = {text: this.props.newTodoInput, completed: false, id: shortid.generate()}
      this.props.newTodoSubmit(newTodo)
      this.props.sendNewInputToState("")
      }
    }

  handleDeleteTodo(id){
      this.props.deleteTodo(id)
    }

  handleViewChange(view){
    this.props.changeFilter(view)
    console.log(this.props.filterViews)
  }

  handleToggleTodo(id){
    this.props.toggleTodo(id)
    console.table(this.props.todoList)
   }

  render() {
    let {newTodoInput, todoList, filterViews } = this.props
    if(filterViews==="SHOW_COMPLETED"){
      todoList = todoList.filter( (d,i)=> {
        return d.completed
      })
    } else if(filterViews==="SHOW_INCOMPLETE"){
      todoList = todoList.filter( (d,i)=> {
        return !d.completed
      })
    }
    let todoListNodes = todoList.map( (todo, i) => {
      return (
        <div key={todo.id}>
        <span style={todo.completed ? {textDecoration: "line-through"} : {textDecoration: "none"} } onClick={this.handleToggleTodo.bind(this, todo.id)}>{todo.text} </span> - {todo.completed ? '' : 'you can do it!'} -
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

        <button onClick={this.handleViewChange.bind(this, "SHOW_ALL")}>Show all todos</button>
        <button onClick={this.handleViewChange.bind(this, "SHOW_COMPLETED")}>Show completed</button>
        <button onClick={this.handleViewChange.bind(this, "SHOW_INCOMPLETE")}>Show incomplete todos</button>

    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newTodoInput: state.newTodoInput,
    todoList: state.todoList,
    filterViews: state.filterViews

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

const changeFilter = (view) => {
  return {type: "CHANGE_FILTER", payload: view }
}

HomeView = connect(mapStateToProps, {newTodoSubmit, sendNewInputToState, deleteTodo, toggleTodo, changeFilter})(HomeView)

export default HomeView
