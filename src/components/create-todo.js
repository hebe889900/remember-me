import React from 'react';

export default class TodosList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    renderError() {
        if (!this.state.error) { return null; }

        return <div style={{ color: 'red' }}>{this.state.error}</div>;
    }

    render() {
        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                <div className="form-group row">
                    <label className = "col-sm-2 col-form-label col-form-label-lg">Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control"  placeholder="Title" ref="createInput" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className = "col-sm-2 col-form-label col-form-label-lg">Description</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Description" ref="createDescription" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className = "col-sm-2 col-form-label col-form-label-lg">Status</label>
                    <div className="col-sm-10">
                    <select placeholder="Status" className="form-control" ref="createStatus">
                      <option value = "done">done</option>
                      <option value = "overDue">overDue</option>
                      <option value = "pending">pending</option>
                    </select>  
                    </div>
                </div>         
                <div className="form-group row">
                    <label className = "col-sm-2 col-form-label col-form-label-lg">Due Date</label>
                    <div className="col-sm-10">
                        <input name="date" className="form-control" placeholder="date placeholder" type="date" className="form-control" ref="createDueDate"/>
                    </div>
                </div>
                <button className="btn btn-primary">Create</button>
                {this.renderError()}
            </form>
        );
    }

    handleCreate(event) {
        event.preventDefault();

        const createInput = this.refs.createInput;
        const createDescription = this.refs.createDescription;
        const createStatus = this.refs.createStatus;
        const createDueDate = this.refs.createDueDate;
        const task = createInput.value;
        const description = createDescription.value;
        const status = createStatus.value;
        const dueDate = createDueDate.value;
        const validateInput = this.validateInput(task, description, status, dueDate);

        if (validateInput) {
            this.setState({ error: validateInput });
            return;
        }

        this.setState({ error: null });
        this.props.createTask(task, description, status, dueDate);
        this.refs.createInput.value = '';//Clear input values
        this.refs.createDescription.value = '';//Clear input values
        this.refs.createStatus .value = '';//Clear input values
        this.refs.createDueDate.value = '';//Clear input values
    }

    validateInput(task, description, status, dueDate) {
        if (!task) {
            return 'Please enter a task.';
        } else if (!description) {
            return 'Please enter a description.';
        } else if (!status) {
            return 'Please enter a status.';
        } else if (!dueDate) {
            return 'Please enter a due date.';
        } else if (_.find(this.props.todos, todo => todo.task === task)) {
            return 'Task already exists.';
        } else {
            return null;
        }
    }
}
