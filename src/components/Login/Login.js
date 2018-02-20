import React from 'react';
import PropTypes from 'prop-types';
import ChatWindow from "../ChatWindow/ChatWindow";


/* eslint-disable no-console */
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            logedin:false,
            username:''
        }
    }
    setUser() {
        const { socket } = this.context;
        socket.emit('adduser', this.state.username, (available) => {
            if (available) {
                console.log('Username Available');
                this.setState({logedin: true, username: this.state.username});
            }
            else {
                console.log('Name taken!');
            }
        });
    }


    render(){
            if(this.state.logedin){
                return (
                    <div className="container">
                    <ChatWindow username={this.state.username}/>
                </div>)

            }
        return (
                <React.Fragment>
                    <h2>Chatroom</h2>
                    <div className="container">
                        <label htmlFor="username"><b>Username</b></label>
                        <input type="text" placeholder="Choose Username" name="username"
                               onInput={(e) => this.setState({username: e.target.value})} required/>
                        <button type="submit" onClick={() => this.setUser()}>Login</button>
                    </div>
                </React.Fragment>
        )

    }


}
Login.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default Login;