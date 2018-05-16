import _ from 'lodash';
import React from 'react';
import TodosListItem from './todos-list-item';
import TodosListHeader from './todos-list-header'

export default class TodosList extends React.Component {
    renderItems() {
        console.log(this.props);

        const props = _.omit(this.props, 'todos');
        console.log(props)

        return _.map(this.props.todos, (todo, index) => <TodosListItem key={index} {...todo} {...props} />);
    }

    render() {
        return (
            <table className = "table">
                <TodosListHeader />
                {this.renderItems()}
            </table>
        );
    }
}
