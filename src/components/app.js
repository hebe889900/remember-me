import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import moment from 'moment';
import '../main.css';

const todos = [
{
    task: 'make React tutorial',
    description: 'Spend one day to finish up the react tutorial',
    status: 'pending',
    dueDate: '2018-06-01',
    isCompleted: false
},
{
    task: 'eat dinner',
    description: 'Eat dinner tonight',
    status: 'done',
    dueDate: '2018-06-01',    
    isCompleted: false
}
];

const original_todos = [
{
    task: 'make React tutorial',
    description: 'Spend one day to finish up the react tutorial',
    status: 'pending',
    dueDate: '2018-06-01',
    isCompleted: false
},
{
    task: 'eat dinner',
    description: 'Eat dinner tonight',
    status: 'done',
    dueDate: '2018-06-01',    
    isCompleted: false
}
];

export default class App extends React.Component {
    constructor(props) {
        super(props);



        if (typeof(Storage) !== "undefined") {
            if(localStorage.getItem("todolist")) {
                this.state = JSON.parse(localStorage.getItem("todolist"));
                console.log(this.state)
            } else {
                this.state = {
                    todos,
                    original_todos
                };
                localStorage.setItem("todolist", JSON.stringify({
                    todos,
                    original_todos
                }));
            }
            // Code for localStorage/sessionStorage.
        } else {
            // Sorry! No Web Storage support..
        }        
    }

    render() {
        return (
            <div className = "todoapp">
                <header className = "header">
                    <h2>To Do App</h2>
                    <h4>{moment().format("YYYY-MM-DD")}</h4>
                </header>
                <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
                <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
                
                <footer className = "footer">
                    <div class="btn-group">
                      <button type = "button" onClick={this.allTask.bind(this)} className="btn btn-primary">All</button>
                      <button type = "button" onClick={this.completedTask.bind(this)} className="btn btn-primary">Completed</button>
                      <button type = "button" onClick={this.pendingTask.bind(this)} className="btn btn-primary">Pending</button>
                      <button type = "button" onClick={this.overDueTask.bind(this)} className="btn btn-primary">Overdue</button>
                    </div>
              </footer>
            </div>
        );
    }

    allTask(task) {
        this.setState({todos: this.state.original_todos});
        localStorage.setItem("todolist", JSON.stringify({todos: this.state.original_todos, original_todos: this.state.original_todos}));
    }

    overDueTask(task) {
        const updatedTodos = this.state.original_todos;
        let new_list = [];
        for(let i = 0; i < updatedTodos.length; i ++) {
            if(updatedTodos[i].status == "overDue") {
                new_list.push(updatedTodos[i]);
            }
        }
        this.setState({todos: new_list});
        localStorage.setItem("todolist", JSON.stringify({todos: new_list, original_todos: this.state.original_todos}));

    }

    completedTask(task) {
        const updatedTodos = this.state.original_todos;
        let new_list = [];
        for(let i = 0; i < updatedTodos.length; i ++) {
            if(updatedTodos[i].status == "done") {
                new_list.push(updatedTodos[i]);
            }
        }
        this.setState({todos: new_list});
        localStorage.setItem("todolist", JSON.stringify({todos: new_list, original_todos: this.state.original_todos}));
    }        


    pendingTask(task) {
        const updatedTodos = this.state.original_todos;
        let new_list = [];
        for(let i = 0; i < updatedTodos.length; i ++) {
            if(updatedTodos[i].status == "pending") {
                new_list.push(updatedTodos[i]);
            }
        }
        this.setState({todos: new_list});
        localStorage.setItem("todolist", JSON.stringify({todos: new_list, original_todos: this.state.original_todos}));
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos, original_todos: this.state.original_todos });
        localStorage.setItem("todolist", JSON.stringify(this.state));
    }

    createTask(task, description, status, dueDate) {
        this.state.todos.push({
            task,
            description,
            status,
            dueDate,
            isCompleted: false
        });
        this.state.original_todos.push({
            task,
            description,
            status,
            dueDate,
            isCompleted: false
        });        
        this.setState({ todos: this.state.todos, original_todos: this.state.original_todos });
        localStorage.setItem("todolist", JSON.stringify(this.state));
    }

    saveTask(oldTask, newTask, varname) {
        const foundTodo = _.find(this.state.todos, todo => todo[varname] === oldTask);
        const foundOriginalTodo = _.find(this.state.original_todos, todo => todo[varname] === oldTask);
        foundTodo[varname] = newTask;
        foundOriginalTodo[varname] = newTask;
        this.setState({ todos: this.state.todos, original_todos: this.state.original_todos});
        localStorage.setItem("todolist", JSON.stringify(this.state));
    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        _.remove(this.state.original_todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos, original_todos: this.state.original_todos});
        localStorage.setItem("todolist", JSON.stringify(this.state));
    }
}
