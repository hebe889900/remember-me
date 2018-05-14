import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import Filters from './filters';
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
    isCompleted: true
}
];

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos
        };
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
                <Filters />
            </div>
        );
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
    }

    createTask(task, description, status, dueDate) {
        this.state.todos.push({
            task,
            description,
            status,
            dueDate,
            isCompleted: false
        });
        this.setState({ todos: this.state.todos });
    }

    saveTask(oldTask, newTask, varname) {
        const foundTodo = _.find(this.state.todos, todo => todo[varname] === oldTask);
        console.log(foundTodo, foundTodo[varname]);
        foundTodo[varname] = newTask;
        this.setState({ todos: this.state.todos });
    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
    }
}
