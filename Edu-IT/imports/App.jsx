import React, { Component } from 'react';
import AccountsUIWrapper from "./AccountsUIWrapper";


// App component - represents the whole app
export default class App extends Component {


    render() {
        return (
            <div className="container">
                <header>
                    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <a className="navbar-brand" href="#">Edu-IT</a>

                    </nav>

                </header>
                <a className="navbar-default"> <AccountsUIWrapper/></a>

            </div>
        );
    }
}