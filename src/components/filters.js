import React from 'react';

export default class Filters extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            page: "all"
        };
    }

    render() {
        return (
            <footer className = "footer">
                <ul className="filters">
                    <li>
                        <a href="#" className="selected">All</a>
                    </li>
                        <span> </span>
                    <li>
                        <a href="#">Active</a>
                    </li>
                        <span> </span>
                    <li>
                        <a href="#">Completed</a>
                    </li>
                </ul>
            </footer>
        );
    }

}
