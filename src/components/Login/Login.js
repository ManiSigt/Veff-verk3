import React from 'react';
//import ChatWindow from "../ChatWindow/ChatWindow";
import PropTypes from 'prop-types';

/* eslint-disable no-console */
class Login extends React.Component {
    setUser() {
        const { socket } = this.context;
        socket.emit('adduser', this.state.username, function(available) {
            if (available) {
                console.log('name not taken!');
            }
        }.bind(this));

        }

    render(){
        return (
            <React.Fragment>

                <h2>Chatroom</h2>
                <form>
                    <div className="container">
                        <label htmlFor="username"><b>Username</b></label>
                        <input type="text" placeholder="Choose Username" name="username" required/>

                        <button type="submit" onClick={() => this.setUser()} >Login</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }


}
Login.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default Login;