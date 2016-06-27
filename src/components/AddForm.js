import React, { Component, PropTypes } from 'react';

export default class AddForm extends Component {
  render(){
    let {handleNewTodoSubmit, handleNewTodoChange, newTodoInput} = this.props
    return(
      <form onSubmit={handleNewTodoSubmit.bind(this)}>
        <input type="text" onChange={handleNewTodoChange.bind(this)} value={newTodoInput} />
        <button type="submit">Add a todo</button>
      </form>

    )
    }
}
