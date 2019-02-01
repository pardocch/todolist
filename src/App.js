import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      lastId: 0,
    }
    this.apiUrl = '//5c4e8265d87cab001476ef4a.mockapi.io/api';
  }

  componentDidMount() {
    axios.get(this.apiUrl)
      .then((res) => {
        this.setState({data: res.data});
      });
  }

  addToDo(title, val) {
    let data = (this.state.lastId === 0) ? {"id":parseInt(lastId) + 1, "title": title, "text": val} : {"id":this.state.lastId + 1, "title": title, "text": val};
    this.state.data.push(data);
    axios.post(this.apiUrl, data)
      .then((res) => { 
        this.setState({
          data: this.state.data,
          lastId: this.state.lastId + 1,
        });
      });
  }

  deleteToDo(id) {
    const remainder = this.state.data.filter((todo) => {
      if (todo.id !== id) return todo;
    });
    axios.delete(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({
          data: remainder,
        })
      });
  }

  render() {
    return(
      <Router>
        <div className="container">
          <Header />
          <div>
            <AddToList
              addToDo={ this.addToDo.bind(this) }
            />
            <br /><br /><br />
            <TodoList
              data={ this.state.data }
            />
          </div>
        </div>
      </Router>
    )
  }
}

let lastId;

const Header = () => (
  <div>
    <nav className="nav navbar">
      <h1>TodoList</h1>
    </nav>
  </div>
)
const TodoList = ({ data }) => {
  return (
    <TodoItems
      todos={ data }
      remove={ remove }
    />
  )
}
const TodoItems = ({ todos, remove }) => {
  const todoNode = todos.map((todo) => {
    lastId = todo.id;
    return (<Todo todo={ todo } key={ todo.id } remove={ remove } />)
  });
  return (
    <div className="todoitem-field">
      <div className="todoitem-row">
          { todoNode }
      </div>
    </div>
  )
}
const AddToList = ({ addToDo }) => {
  let input;
  let title;
  return (
  <div className="addtolist-field">
    <div className="addtolist-row">
      <div className="addtolist-block" onBlur={(e) => {
            e.preventDefault();
            if (input.innerHTML !== '') {
              addToDo(title.innerHTML, input.innerHTML);
              title.innerHTML = '';
              input.innerHTML = '';
            }
          }}>
        <div className="addtolist-title" contentEditable suppressContentEditableWarning={true} placeholder="標題" ref={node => title = node}></div>
        <div className="addtolist-input" contentEditable placeholder="新增記事…" ref={node => input = node}></div>
      </div>
    </div>
  </div>
)};

const Todo = ({ todo, remove }) => {
  let titleblock = '';
  let textblock = '';
  if (todo.title !== '') {
    titleblock = <div className="todoitem-title"><span>{ todo.title }</span></div>;
  }
  textblock = <div className="todoitem-content"><div>{ todo.text }</div></div>;
  return (
    <div className="todoitem-block">
      { titleblock }
      { textblock }
  </div>
  );
}

const remove = () => {
  console.log('remove');
}

export default App;
