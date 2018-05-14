import React from 'react';
import moment from 'moment';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderTaskSection() {
        console.log(this.props)
        this.props.status = (this.props.dueDate < moment().format("YYYY-MM-DD")) ? "overDue" : this.props.status;
        const { task, 
            isCompleted, 
            description,
            status,
            dueDate, 
        } = this.props;

        const taskStyle = {
            color: isCompleted ? 'green' : 'red',
            cursor: 'pointer'
        };

        if (this.state.isEditing) {
            return (
                <li>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type="text" defaultValue={task} ref="editInput" />
                        <input type="text" defaultValue={description} ref="editDescription" />
                        <input type="text" defaultValue = {status} ref="editStatus" />
                        <input name="date" id="exampleDate" placeholder="date placeholder" type="date" className="form-control" defaultValue = {dueDate} ref="editDueDate" />
                    </form>
                </li>
            );
        }

        return (
            <li style={taskStyle}
                onClick={this.props.toggleTask.bind(this, task)}
            >
                <input className="toggle" type="checkbox"/>
                <label>
                    {task}
                    {description}
                    {status}
                    {dueDate}                
                </label>
            </li>           
        );
    }

    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <li>
                    <button onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </li>
            );
        }

        return (
            <li>
                <button onClick={this.onEditClick.bind(this)}>Edit</button>
                <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
            </li>
        );
    }

    render() {
        return (
                <li>
                {this.renderTaskSection()}
                {this.renderActionsSection()}
                </li>
        );
    }

    onEditClick() {
        this.setState({ isEditing: true });
    }

    onCancelClick() {
        this.setState({ isEditing: false });
    }

    onSaveClick(event) {
        event.preventDefault();
        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        const oldDescription = this.props.description;
        const newDescription = this.refs.editDescription.value;
        const oldStatus = this.props.status;
        const newStatus = this.refs.editStatus.value;
        const oldDueDate = this.props.dueDate;
        const newDueDate = this.refs.editDueDate.value;                        
        this.props.saveTask(oldTask, newTask, "task");
        this.props.saveTask(oldDescription, newDescription, "description");
        this.props.saveTask(oldStatus, newStatus, "status");
        this.props.saveTask(oldDueDate, newDueDate, "dueDate");                        
        this.setState({ isEditing: false });
    }
}
