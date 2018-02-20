import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login/Login';
import PropTypes from 'prop-types';
import Image from './components/Image/Image';
import ChatWindow from "./components/ChatWindow/ChatWindow";
import ListRoom from "./components/ListRoom/ListRoom";
import socketClient from 'socket.io-client';
//import '../styles/site.less';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/users" component={Image} />
                    <Route path="/chat" component={ChatWindow} />
                    <Route path="/poop" component={ListRoom} />
                </Switch>
            </div>
        );
    }
}

App.childContextTypes = {
    socket: PropTypes.object.isRequired
};

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));

