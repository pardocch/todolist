import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {"id":"8","text":"99"},
        {"id":"9","text":"test"},
        {"id":"10","text":"asd"},
        {"id":"13","text":"zzzzzzzzzzzzz"},
        {"id":"14","text":"zzzzzzzzzzzzzzzzzzzzzzzzzzzzz"},
        {"id":"15","text":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {"id":"17","text":"adfdafadsfdasf"},
        {"id":"18","text":"dsfsdfsd"},
        {"id":"19","text":"fdd"}
      ],
    }
  }

  addToDo(val) {
    this.state.data.push({"id":"", "text":val});
    this.setState({
      data: this.state.data,
    });
  }

  render() {
    return(
      <Router>
        <div className="container">
          <Header />
          <div>
            <AddToList addToDo={this.addToDo.bind(this)} />
            <TodoList data={this.state.data} />
          </div>
        </div>
      </Router>
    )
  }
}

const Header = () => (
  <div>
    <nav className="nav navbar">
      <h1>TodoList</h1>
    </nav>
  </div>
)
const TodoList = ({data}) => {
  return (
    <TodoItems todos={data} remove={remove}/>
  )
}
const TodoItems = ({todos, remove}) => {
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} />)
  });
  return (
    <div className="todoitem-field">
      <div className="todoitem-row">
          { todoNode }
      </div>
    </div>
  )
}
const AddToList = ({addToDo}) => {
  let input;
  return (
  <div className="addtolist-field">
    <div className="addtolist-row">
      <div className="addtolist-block">
        <div className="addtolist-input" contentEditable ref={node => input = node} onBlur={(e) => {
            e.preventDefault();
            addToDo(input.innerHTML);
            input.innerHTML = '';
          }}>

        </div>
      </div>
    </div>
  </div>
)};

const Todo = ({todo, remove}) => {
  return (
    <div className="todoitem-block">
      <div className="todoitem-title">
        <span>標題</span>
      </div>
      <div className="todoitem-content">
        <div>{todo.text}</div>
      </div>
  </div>
  );
}

const remove = () => {
  console.log('remove');
}

export default App;
