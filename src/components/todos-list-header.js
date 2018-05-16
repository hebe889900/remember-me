import React from 'react';

export default class TodosListHeader extends React.Component {
    render() {
        return (
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Due Date</th>    
                    <th>Ations</th>                 
                </tr>
            </thead>
        );
    }
}
