import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable no-console */
class Login extends React.Component {
    setUser() {
        const { socket } = this.context;
        console.log("trying to login with username '" + this.state.username + "'");
        socket.emit('adduser', this.state.username, function(available) {
            if (available) {
                console.log('name not taken!');

            }
            else{
                console.log('Name taken!');
            }
        }.bind(this));
    }
    constructor(props){
        super(props);
        this.state={
            username:''
        }
    }

    render(){
        return (
            <React.Fragment>

                <h2>Chatroom</h2>
                    <div className="container">
                        <label htmlFor="username"><b>Username</b></label>
                        <input type="text" placeholder="Choose Username" name="username"
                               onInput={(e) => this.setState({ username: e.target.value })} required/>
                        <button type="submit" onClick={() => this.setUser()} >Login</button>
                    </div>
            </React.Fragment>
        );
    }


}
Login.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default Login;