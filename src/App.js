import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as todoList from './actions/todoList';
import { bindActionCreators } from 'redux';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);        
    this.state = {
      todoList: '',
      list: this.props.listTodo,
      edit: '',
      fieldEdit: ''
    }    
  }    

  handleChange = (event) => {    
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  handleSubmit = (event) => {    
    event.preventDefault(); 
    var data = JSON.parse(JSON.stringify({data: this.state.todoList}))    
    const {actions} = this.props    
    this.state.list.push(data)
    actions.changeTodoList(this.state.list)
    this.setState({todoList: event.target.value});
  }

  deleteData = (index) => {
    const {actions, listTodo} = this.props   
    listTodo.splice(index, 1)    
    this.setState({list: listTodo})
    actions.changeTodoList(this.state.list)
  }

  editData(id){    
    if (this.state.edit === id) {
      this.setState({ edit: null })
    } else {
        this.setState({ edit: id })
    }
  }

  submitEdit = (event) => {    
    event.preventDefault();             
    const list = [...this.state.list]
    list[event.target.id] = JSON.parse(JSON.stringify({data: this.state.fieldEdit}))
    this.setState({list: list, edit: false})    
    this.props.actions.changeTodoList(this.state.list)
  }
  

  render(){   
    const {list} = this.state            
    return (
      <div className="App">
        <header className="App-header">
          <p>Todo List</p>
            <div className="form-group">
              <div className="col-md-10 col-md-offset-1 col-xs-12">
                <form onSubmit={this.handleSubmit}>
                  <div className="col-md-10 col-xs-9">
                    <input type="text" class="form-control" name="todoList" placeholder="Enter todo list" required="true" onChange={this.handleChange}/>              
                  </div>
                  <div className="col-md-2 col-xs-1">
                    <button type="submit" className="btn btn-primary">Create</button>           
                  </div>
                </form>                
                <table class="table">
                  <tbody className="body-table">
                    {
                      list.map((item, index) => {
                        return(
                          <tr>
                            <td>{item.data}</td>
                            <td>
                              <button onClick={() => this.deleteData(index)}>
                                <span className="glyphicon glyphicon-trash red"></span>
                              </button>
                              <button onClick={() => this.editData(index+1)}>
                                <span className="glyphicon glyphicon-pencil blue"></span>
                              </button>                              
                            </td>
                            <td>
                            {
                              this.state.edit === index + 1 &&
                              <form id={index} onSubmit={this.submitEdit}>
                                <div className="col-md-10 col-xs-12">
                                  <input type="text" class="form-control" name="fieldEdit" placeholder="Enter todo list" required="true" onChange={this.handleChange}/>              
                                </div>
                                <div className="col-md-1 col-xs-12">
                                  <button type="submit" className="btn btn-primary">Edit</button>
                                </div>
                              </form>
                            }
                            </td>
                          </tr>                         
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>            
            </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listTodo: state.todo.listTodo,
});  

const ActionCreators = Object.assign(  
  {},
  todoList,
);
const mapDispatchToProps = dispatch => ({  
  actions: bindActionCreators(ActionCreators, dispatch),    
});

export default connect(mapStateToProps, mapDispatchToProps)(App)

