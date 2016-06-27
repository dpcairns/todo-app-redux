import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ToggleButtons from '../components/ToggleButtons'
import AddForm from '../components/AddForm'
import shortid from 'shortid'

export default class HomeView extends Component {

    handleNewTodoChange(e) {
      e.preventDefault()
      this.props.sendNewInputToState(e.target.value)
    }

    handleNewTodoSubmit(e){
      e.preventDefault()
      if (this.props.newTodoInput.length > 0){
      let newTodo = {text: this.props.newTodoInput, completed: false, id: shortid.generate(), showEdit: false}
      this.props.newTodoSubmit(newTodo)
      this.props.sendNewInputToState("")
      }
    }

    handleEditTodoChange(e) {
      e.preventDefault()
      this.props.sendEditInputToState(e.target.value)
    }

    handleEditTodoSubmit(e){
      e.preventDefault()
      if(this.props.editTodoInput.length > 0){
      this.props.editTodo(this.props.selectedTodoId, this.props.editTodoInput)
      this.props.sendEditInputToState("")
      this.props.selectTodo("")
    }
  }

  handleDeleteTodo(id){
      this.props.deleteTodo(id)
    }

  handleShowEdit(id){
        this.props.toggleEdit(id)
        this.props.selectTodo(id)
        console.log(this.props.selectedTodoId)
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
    let {newTodoInput, todoList, filterViews, selectedTodoId, selectTodo, editTodoInput} = this.props
    let filterName = "all"
    if(filterViews==="SHOW_COMPLETED"){
      filterName= "completed"
      todoList = todoList.filter( (d,i)=> {
        return d.completed
      })
    } else if(filterViews==="SHOW_INCOMPLETE"){
      filterName= "incomplete"
      todoList = todoList.filter( (d,i)=> {
        return !d.completed
      })
    }

    let todoListNodes = todoList.map( (todo, i) => {
      return (
        <div key={todo.id} className="todo-item">
        <span style={todo.completed ? {textDecoration: "line-through"} : {textDecoration: "none"} }><h3>{todo.text}</h3></span>
        <button onClick={this.handleDeleteTodo.bind(this, todo.id)}>Delete</button>
        <button onClick={this.handleShowEdit.bind(this, todo.id)}>Edit</button>
        <button onClick={this.handleToggleTodo.bind(this, todo.id)}>{todo.completed ? 'Toggle back' : 'I finished it!'}</button>

        {todo.showEdit ?
        <form onSubmit={this.handleEditTodoSubmit.bind(this)}>
          <input type="text" onClick={selectTodo.bind(this, todo.id)} onChange={this.handleEditTodoChange.bind(this)} value={selectedTodoId === todo.id && editTodoInput. length > 0 ? editTodoInput : todo.text} />
          <button type="submit">Edit this todo</button>
        </form> :
        ''}
        </div>
      )
    })
    return(
    <div style={{textAlign:"center"}}>
    <h2>Now showing <span style={{textDecoration: "underline"}}>{filterName}</span> todos</h2>

    <AddForm newTodoInput={newTodoInput} handleNewTodoSubmit={this.handleNewTodoSubmit.bind(this)} handleNewTodoChange={this.handleNewTodoChange.bind(this)}/>
    <ToggleButtons handleViewChange={this.handleViewChange.bind(this)}/>

    <div className="todo-container">
      {todoListNodes}
    </div>

    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newTodoInput: state.newTodoInput,
    editTodoInput: state.editTodoInput,
    todoList: state.todoList,
    filterViews: state.filterViews,
    selectedTodoId: state.selectedTodoId
  }
}

export const toggleTodo = (id) => {
  return {type: "TOGGLE_TODO", payload: id }
}

export const sendNewInputToState = (input) => {
  return {type: "NEW_TODO_FORM_CHANGE", payload: input }
}

export const newTodoSubmit = (todo) => {
  return {type: "NEW_TODO", payload: todo }
}

export const deleteTodo = (id) => {
  return {type: "DELETE_TODO", payload: id }
}

export const toggleEdit = (id) => {
  return {type: "TOGGLE_EDIT", payload: id }
}

export const selectTodo = (id) => {
  return {type: "SELECT_TODO", payload: id }
}

export const sendEditInputToState = (text) => {
  return {type: "EDIT_TODO_FORM_CHANGE", payload: text }
}

export const editTodo = (id, text) => {
  return {type: "EDIT_TODO", payload: {_id: id, _text: text} }
}

export const changeFilter = (view) => {
  return {type: "CHANGE_FILTER", payload: view }
}


HomeView = connect(mapStateToProps, {editTodo, sendEditInputToState, newTodoSubmit, sendNewInputToState, deleteTodo, toggleTodo, changeFilter, toggleEdit, selectTodo})(HomeView)

export default HomeView
