import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login/Login';
import PropTypes from 'prop-types';
//import '../styles/site.less';
import socketClient from 'socket.io-client';
//import ChatWindow from "./components/ChatWindow/ChatWindow";
/* eslint-disable no-console */
class App extends React.Component {
    componentDidCatch(error, info) {
        console.log(error, info);
    }
    getChildContext() {
        return {
            socket: socketClient('http://localhost:8080')
        };
    }
    render() {
        return (
            <div className="container">
                <Login />
            </div>
        );
    }
}

App.childContextTypes = {
    socket: PropTypes.object.isRequired
};

ReactDOM.render(<App />, document.getElementById('app'));

