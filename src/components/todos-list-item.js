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
            color: isCompleted ? '#d9d9d9' : 'black',
            textDecoration: isCompleted ? 'line-through' : 'none',
            cursor: 'pointer'
        };

        if (this.state.isEditing) {
            return (
                <tr>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <div className="form-group">
                        <input type="text" className="form-control" defaultValue={task} ref="editInput" />
                        </div>
                    </form>
                </tr>
            );
        }

        return (
                <td style={taskStyle}><p>{task}</p></td>          
        );
    }


    renderDescriptionSection() {
        console.log(this.props)
        this.props.status = (this.props.dueDate < moment().format("YYYY-MM-DD")) ? "overDue" : this.props.status;
        const { task, 
            isCompleted, 
            description,
            status,
            dueDate, 
        } = this.props;

        const taskStyle = {
            color: isCompleted ? '#d9d9d9' : 'black',
            textDecoration: isCompleted ? 'line-through' : 'none',
            cursor: 'pointer'
        };

        if (this.state.isEditing) {
            return (
                <tr>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <div className="form-group">
                        <input type="text" className="form-control" defaultValue={description} ref="editDescription" />
                        </div>
                    </form>
                </tr>
            );
        }

        return (
                <td style={taskStyle}>
                    <p className ="card-text">
                        {description}                     
                    </p>
                </td>          
        );
    }

    renderStatusSection() {
        console.log(this.props)
        this.props.status = (this.props.dueDate < moment().format("YYYY-MM-DD")) ? "overDue" : this.props.status;
        const { task, 
            isCompleted, 
            description,
            status,
            dueDate, 
        } = this.props;

        const taskStyle = {
            color: isCompleted ? '#d9d9d9' : 'black',
            textDecoration: isCompleted ? 'line-through' : 'none',
            cursor: 'pointer'
        };

        if (this.state.isEditing) {
            return (
                <tr>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <div className="form-group">
                        <input type="text" className="form-control" defaultValue = {status} ref="editStatus" />
                        </div>
                    </form>
                </tr>
            );
        }

        return (
                <td style={taskStyle}>
                    <p className ="card-text">
                        {status}                     
                    </p>
                </td>          
        );
    }

     renderDueDateSection() {
        console.log(this.props)
        this.props.status = (this.props.dueDate < moment().format("YYYY-MM-DD")) ? "overDue" : this.props.status;
        const { task, 
            isCompleted, 
            description,
            status,
            dueDate, 
        } = this.props;

        const taskStyle = {
            color: isCompleted ? '#d9d9d9' : 'black',
            textDecoration: isCompleted ? 'line-through' : 'none',
            cursor: 'pointer'
        };

        if (this.state.isEditing) {
            return (
                <tr>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <div className="form-group">
                        <input name="date" className="form-control" id="exampleDate" placeholder="date placeholder" type="date" className="form-control" defaultValue = {dueDate} ref="editDueDate" />
                        </div>
                    </form>
                </tr>
            );
        }

        return (
                <td style={taskStyle}>
                    <p className ="card-text">
                        {dueDate}                        
                    </p>
                </td>         
        );
    }       
    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <td>
                    <button className="btn btn-success" onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button className="btn btn-danger" onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </td>
            );
        }

        return (
            <td>
                <button className="btn btn-success" onClick={this.onEditClick.bind(this)}>Edit</button>
                <button className="btn btn-danger" onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
            </td>
        );
    }

    render() {
        return (
                <tr>
                {this.renderTaskSection()}
                {this.renderDescriptionSection()}
                {this.renderStatusSection()}
                {this.renderDueDateSection()}
                {this.renderActionsSection()}
                </tr>
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
