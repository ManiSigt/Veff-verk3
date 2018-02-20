import React from 'react';
import { PropTypes } from 'prop-types';
/* eslint-disable no-console */
class ChatWindow extends React.Component {
    componentDidMount() {
        // Register emission handler
        const { socket } = this.context;
        socket.on('updatechat', (room, msg) => {
            // Update the message state
            console.log(msg);
            let messages = [];
            for(let i = 0; i < msg.length; i++){
                messages.push(`${msg[i].timestamp} - ${msg[i].nick} : ${msg[i].message}`);
            }

            this.setState({ messages });
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            msg: '',
            messages: [],
        };
    }
    sendMessage() {
        const { socket } = this.context;
        socket.emit('sendmsg', {msg:this.state.msg, roomName:this.props.roomName});
        console.log(this.props.roomName);
        this.setState({ msg: '' });
    }
    kickPerson() {
        var person = prompt("Please enter the name of the person you want to kick");
        var curr = 'lobby';
        var test = {user: person, room: curr};
        const { socket } = this.context;
        socket.emit('kick', test, (available) => {
            if (available) {
                console.log('Room joined');
            }
        });
        alert(person + " has been Kicked!");
    }
    banPerson() {
        var person = prompt("Please enter the name of the person you want to ban");
        var curr = 'lobby';
        var test = {user: person, room: curr};
        const { socket } = this.context;
        socket.emit('ban', test, (available) => {
            if(available) {
                console.log('Room joined');
            }
        })
        alert(person + " has been banned!");
    }
    privateMsg () {
        var person = prompt("Please enter the name of the person you want to message");
        var msg = prompt("Enter your message");
        var test = {nick:person, message:msg};
        const { socket } = this.context;
        socket.emit('privatemsg', test, (available) => {
            if (available) {
                console.log('Room joined');
            }
        });

    }
    render() {
        const { messages, msg, room } = this.state;
        return (
            <div className="chat-window">
                <p>Þú ert í {room}</p>
                {messages.map(m => ( <div key={m}>{m}</div> ))}
                <div className="input-box">
                    <input
                        type="text"
                        value={msg}
                        className="input input-big"
                        onInput={(e) => this.setState({ msg: e.target.value })} />
                    <button type="button" className="btn pull-right" onClick={() => this.sendMessage()}>Send</button>
                    <button type="button" className="kick" onClick={() => this.kickPerson()}>KICK</button>
                    <button type="button" className="ban" onClick={ () => this.banPerson()}> BAN </button>
                    <button type="button" className="privMsg" onClick={ () => this.privateMsg()}> Send Private Message </button>
                </div>


            </div>

        );
    }
}

ChatWindow.contextTypes = {
    socket: PropTypes.object.isRequired
};


export default ChatWindow;