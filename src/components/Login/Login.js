import React from 'react';
import PropTypes from 'prop-types';
import ChatWindow from "../ChatWindow/ChatWindow";
import ListRoom from "../ListRoom/ListRoom";


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
                this.setState( {room:'lobby'});
                socket.emit('joinroom', {room:'lobby'}, (joinedLobby, reason) => {
                    if (joinedLobby) {
                        console.log('successfully joined room');
                    } else {
                        console.log(reason);
                    }
                });
                this.setState({logedin: true, username: this.state.username});
            }
            else {
                console.log('Name taken!');
            }
        });
    }

    changeRoom(currentRoom) {
        console.log(currentRoom);
        this.setState({room: currentRoom});

 }
    render(){
            if(this.state.logedin){
                console.log('hérna room', this.state.room);
                return (
                    <div className="container">
                        <ListRoom username={this.state.username} changeRoom={(currentRoom) => this.changeRoom(currentRoom)}/>
                    <ChatWindow username={this.state.username} roomName={this.state.room}/>
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