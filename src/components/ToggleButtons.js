import React, { Component, PropTypes } from 'react';

export default class ToggleButtons extends Component {
  render(){
    let {handleViewChange} = this.props
    return(
    <div>
      <button onClick={handleViewChange.bind(this, "SHOW_ALL")}>Show all todos</button>
      <button onClick={handleViewChange.bind(this, "SHOW_COMPLETED")}>Show completed</button>
      <button onClick={handleViewChange.bind(this, "SHOW_INCOMPLETE")}>Show incomplete todos</button>
    </div>
    )
  }
}
